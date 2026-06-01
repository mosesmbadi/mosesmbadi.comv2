<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'

interface Course {
  id: number
  title: string
  description: string
  duration: string
  thumbnail: string
  maxAttendees: number
  price: number
  location: string
  trailerYouTubeLink: string
  prerequisites: string
  requirements: string
}

type View = 'login' | 'list' | 'form'

const view = ref<View>('login')
const token = ref<string | null>(null)
const courses = ref<Course[]>([])
const loadingCourses = ref(false)
const formError = ref('')
const loginError = ref('')
const saving = ref(false)
const editingId = ref<number | null>(null)

const loginForm = reactive({ username: '', password: '' })

const blankCourse = (): Omit<Course, 'id'> => ({
  title: '',
  description: '',
  duration: '',
  thumbnail: '',
  maxAttendees: 20,
  price: 0,
  location: 'Online',
  trailerYouTubeLink: '',
  prerequisites: '',
  requirements: '',
})

const form = reactive<Omit<Course, 'id'>>(blankCourse())

onMounted(() => {
  const stored = localStorage.getItem('admin_token')
  if (stored) {
    token.value = stored
    view.value = 'list'
    loadCourses()
  }
})

async function login() {
  loginError.value = ''
  try {
    const res = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginForm),
    })
    if (!res.ok) { loginError.value = 'Invalid credentials'; return }
    const { token: t } = await res.json()
    token.value = t
    localStorage.setItem('admin_token', t)
    view.value = 'list'
    loadCourses()
  } catch {
    loginError.value = 'Connection error'
  }
}

function logout() {
  localStorage.removeItem('admin_token')
  token.value = null
  view.value = 'login'
  loginForm.username = ''
  loginForm.password = ''
}

async function loadCourses() {
  loadingCourses.value = true
  try {
    const res = await fetch('/courses')
    courses.value = await res.json()
  } finally {
    loadingCourses.value = false
  }
}

function authHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token.value}` }
}

function openCreate() {
  editingId.value = null
  Object.assign(form, blankCourse())
  formError.value = ''
  view.value = 'form'
}

function openEdit(course: Course) {
  editingId.value = course.id
  Object.assign(form, { ...course })
  formError.value = ''
  view.value = 'form'
}

async function saveCourse() {
  if (!form.title.trim()) { formError.value = 'Title is required'; return }
  saving.value = true
  formError.value = ''
  try {
    const url = editingId.value ? `/courses/${editingId.value}` : '/courses'
    const method = editingId.value ? 'PUT' : 'POST'
    const res = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(form) })
    if (res.status === 401) { logout(); return }
    if (!res.ok) { formError.value = 'Save failed'; return }
    view.value = 'list'
    loadCourses()
  } catch {
    formError.value = 'Connection error'
  } finally {
    saving.value = false
  }
}

async function deleteCourse(id: number) {
  if (!confirm('Delete this course? This cannot be undone.')) return
  const res = await fetch(`/courses/${id}`, { method: 'DELETE', headers: authHeaders() })
  if (res.status === 401) { logout(); return }
  courses.value = courses.value.filter(c => c.id !== id)
}
</script>

<template>
  <div class="admin-page">

    <!-- Login -->
    <div v-if="view === 'login'" class="login-wrap">
      <div class="login-card">
        <p class="login-card__eyebrow">Admin Access</p>
        <h1 class="login-card__title">Sign In</h1>
        <form @submit.prevent="login" class="login-form">
          <div class="field">
            <label class="field__label" for="username">Username</label>
            <input id="username" v-model="loginForm.username" type="text" class="field__input" autocomplete="username" required />
          </div>
          <div class="field">
            <label class="field__label" for="password">Password</label>
            <input id="password" v-model="loginForm.password" type="password" class="field__input" autocomplete="current-password" required />
          </div>
          <p v-if="loginError" class="form-error">{{ loginError }}</p>
          <button type="submit" class="btn btn--primary btn--full">Sign In</button>
        </form>
      </div>
    </div>

    <!-- Course list -->
    <div v-else-if="view === 'list'" class="admin-wrap">
      <div class="admin-header">
        <div>
          <p class="eyebrow">Admin Dashboard</p>
          <h1 class="admin-title">Manage Courses</h1>
        </div>
        <div class="admin-header__actions">
          <button class="btn btn--primary" @click="openCreate">+ New Course</button>
          <button class="btn btn--ghost" @click="logout">Sign Out</button>
        </div>
      </div>

      <div v-if="loadingCourses" class="state"><span class="spinner" /></div>

      <div v-else class="course-table">
        <div v-if="!courses.length" class="empty">No courses yet. Create your first one.</div>
        <div v-for="c in courses" :key="c.id" class="course-row">
          <div class="course-row__info">
            <p class="course-row__title">{{ c.title }}</p>
            <p class="course-row__meta">{{ c.duration }} · KES {{ c.price.toLocaleString() }} · {{ c.location }}</p>
          </div>
          <div class="course-row__actions">
            <button class="btn btn--sm btn--outline" @click="openEdit(c)">Edit</button>
            <button class="btn btn--sm btn--danger" @click="deleteCourse(c.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Course form -->
    <div v-else-if="view === 'form'" class="admin-wrap">
      <div class="admin-header">
        <div>
          <p class="eyebrow">{{ editingId ? 'Edit Course' : 'New Course' }}</p>
          <h1 class="admin-title">{{ editingId ? 'Update Course Details' : 'Create a Course' }}</h1>
        </div>
        <button class="btn btn--ghost" @click="view = 'list'">← Back</button>
      </div>

      <form @submit.prevent="saveCourse" class="course-form">
        <div class="form-grid form-grid--2">
          <div class="field">
            <label class="field__label" for="f-title">Title *</label>
            <input id="f-title" v-model="form.title" type="text" class="field__input" required />
          </div>
          <div class="field">
            <label class="field__label" for="f-duration">Duration</label>
            <input id="f-duration" v-model="form.duration" type="text" placeholder="e.g. 6 weeks" class="field__input" />
          </div>
        </div>

        <div class="field">
          <label class="field__label" for="f-description">Description</label>
          <textarea id="f-description" v-model="form.description" class="field__textarea" rows="4" />
        </div>

        <div class="form-grid form-grid--3">
          <div class="field">
            <label class="field__label" for="f-price">Price (KES)</label>
            <input id="f-price" v-model.number="form.price" type="number" min="0" class="field__input" />
          </div>
          <div class="field">
            <label class="field__label" for="f-max">Max Attendees</label>
            <input id="f-max" v-model.number="form.maxAttendees" type="number" min="1" class="field__input" />
          </div>
          <div class="field">
            <label class="field__label" for="f-location">Location</label>
            <input id="f-location" v-model="form.location" type="text" placeholder="Online" class="field__input" />
          </div>
        </div>

        <div class="field">
          <label class="field__label" for="f-thumbnail">Thumbnail URL</label>
          <input id="f-thumbnail" v-model="form.thumbnail" type="url" placeholder="https://..." class="field__input" />
        </div>

        <div class="field">
          <label class="field__label" for="f-trailer">Trailer YouTube Link</label>
          <input id="f-trailer" v-model="form.trailerYouTubeLink" type="url" placeholder="https://youtube.com/..." class="field__input" />
        </div>

        <div class="form-grid form-grid--2">
          <div class="field">
            <label class="field__label" for="f-prereq">Prerequisites</label>
            <textarea id="f-prereq" v-model="form.prerequisites" class="field__textarea" rows="3" />
          </div>
          <div class="field">
            <label class="field__label" for="f-req">Requirements</label>
            <textarea id="f-req" v-model="form.requirements" class="field__textarea" rows="3" />
          </div>
        </div>

        <p v-if="formError" class="form-error">{{ formError }}</p>

        <div class="form-actions">
          <button type="submit" class="btn btn--primary" :disabled="saving">
            {{ saving ? 'Saving…' : editingId ? 'Update Course' : 'Create Course' }}
          </button>
          <button type="button" class="btn btn--ghost" @click="view = 'list'">Cancel</button>
        </div>
      </form>
    </div>

  </div>
</template>

<style scoped>
.admin-page {
  min-height: 100vh;
  padding: 100px 24px 80px;
}

/* ── Login ── */
.login-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 100px);
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 40px;
}

.login-card__eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 8px;
}

.login-card__title {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 28px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ── Admin dashboard ── */
.admin-wrap {
  max-width: 900px;
  margin: 0 auto;
}

.eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 6px;
}

.admin-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.admin-title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  color: var(--color-text);
}

.admin-header__actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

/* ── Table ── */
.course-table {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty {
  text-align: center;
  padding: 60px;
  color: var(--color-text-muted);
  font-size: 0.95rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}

.course-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}

.course-row__title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 4px;
}

.course-row__meta {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.course-row__actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

/* ── Form ── */
.course-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-grid {
  display: grid;
  gap: 20px;
}

.form-grid--2 { grid-template-columns: 1fr 1fr; }
.form-grid--3 { grid-template-columns: 1fr 1fr 1fr; }

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field__label {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
}

.field__input,
.field__textarea {
  width: 100%;
  padding: 10px 14px;
  font-size: 0.9rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text);
  outline: none;
  transition: border-color 0.2s ease;
  font-family: inherit;
  resize: vertical;
}

.field__input:focus,
.field__textarea:focus { border-color: var(--color-accent); }

.form-actions {
  display: flex;
  gap: 12px;
  padding-top: 8px;
}

.form-error {
  color: #f87171;
  font-size: 0.875rem;
}

/* ── Buttons ── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 24px;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  text-decoration: none;
  transition: all 0.15s ease;
}

.btn--primary {
  background: var(--color-accent);
  color: var(--color-bg);
}

.btn--primary:hover:not(:disabled) { background: var(--color-accent-hover); }
.btn--primary:disabled { opacity: 0.6; cursor: not-allowed; }

.btn--ghost {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn--ghost:hover { background: var(--color-surface); }

.btn--outline {
  background: transparent;
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
}

.btn--outline:hover { background: var(--color-accent); color: var(--color-bg); }

.btn--danger {
  background: transparent;
  color: #f87171;
  border: 1px solid rgba(248, 113, 113, 0.3);
}

.btn--danger:hover { background: rgba(248, 113, 113, 0.1); }

.btn--sm { padding: 7px 14px; font-size: 0.8rem; }
.btn--full { width: 100%; }

/* ── State ── */
.state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
}

.spinner {
  display: inline-block;
  width: 32px;
  height: 32px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* ── Responsive ── */
@media (max-width: 640px) {
  .form-grid--2, .form-grid--3 { grid-template-columns: 1fr; }
  .course-row { flex-direction: column; align-items: flex-start; }
}
</style>
