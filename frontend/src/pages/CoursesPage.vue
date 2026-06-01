<script setup lang="ts">
import { ref, onMounted } from 'vue'

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

const courses = ref<Course[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const expanded = ref<number | null>(null)

onMounted(async () => {
  try {
    const res = await fetch('/courses')
    if (!res.ok) throw new Error('Failed to load courses')
    courses.value = await res.json()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Something went wrong'
  } finally {
    loading.value = false
  }
})

function toggle(id: number) {
  expanded.value = expanded.value === id ? null : id
}

function youtubeId(url: string): string | null {
  const m = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  return m ? m[1] : null
}
</script>

<template>
  <div class="courses-page">
    <!-- Header -->
    <section class="page-header">
      <div class="page-header__inner">
        <p class="eyebrow">Learn With Me</p>
        <h1 class="page-title">All Courses</h1>
        <p class="page-sub">
          Hands-on, practical courses built around real enterprise experience.
          No fluff — just the skills that get you hired.
        </p>
      </div>
    </section>

    <!-- Course list -->
    <section class="course-list">
      <div class="course-list__inner">

        <div v-if="loading" class="state">
          <span class="spinner" />
        </div>

        <p v-else-if="error" class="state state--error">⚠️ {{ error }}</p>

        <template v-else>
          <article
            v-for="course in courses"
            :key="course.id"
            class="course-row"
            :class="{ 'course-row--open': expanded === course.id }"
          >
            <div class="course-row__main" @click="toggle(course.id)">
              <div class="course-row__thumb">
                <img v-if="course.thumbnail" :src="course.thumbnail" :alt="course.title" />
                <div v-else class="course-row__thumb-placeholder">{{ course.title.charAt(0) }}</div>
              </div>

              <div class="course-row__info">
                <h2 class="course-row__title">{{ course.title }}</h2>
                <p class="course-row__desc">{{ course.description }}</p>
                <div class="course-row__tags">
                  <span class="tag tag--accent">{{ course.duration }}</span>
                  <span class="tag">{{ course.location }}</span>
                  <span class="tag">Up to {{ course.maxAttendees }} students</span>
                </div>
              </div>

              <div class="course-row__aside">
                <p class="course-row__price">KES {{ course.price.toLocaleString() }}</p>
                <a
                  v-if="course.trailerYouTubeLink"
                  :href="course.trailerYouTubeLink"
                  target="_blank"
                  rel="noopener"
                  class="btn-trailer"
                  @click.stop
                >
                  ▶ Trailer
                </a>
                <button class="btn-enroll" @click.stop="toggle(course.id)">
                  {{ expanded === course.id ? 'Hide details' : 'Details & Enroll' }}
                </button>
              </div>
            </div>

            <!-- Expanded details -->
            <div v-if="expanded === course.id" class="course-row__details">
              <div class="detail-grid">
                <div v-if="course.prerequisites" class="detail-block">
                  <h3 class="detail-block__heading">Prerequisites</h3>
                  <p class="detail-block__text">{{ course.prerequisites }}</p>
                </div>
                <div v-if="course.requirements" class="detail-block">
                  <h3 class="detail-block__heading">What You'll Need</h3>
                  <p class="detail-block__text">{{ course.requirements }}</p>
                </div>
              </div>

              <div v-if="course.trailerYouTubeLink && youtubeId(course.trailerYouTubeLink)" class="trailer-embed">
                <iframe
                  :src="`https://www.youtube.com/embed/${youtubeId(course.trailerYouTubeLink)}`"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  title="Course trailer"
                />
              </div>

              <div class="enroll-cta">
                <a href="/contact" class="btn btn--primary">Book a Session to Enroll</a>
              </div>
            </div>
          </article>
        </template>
      </div>
    </section>
  </div>
</template>

<style scoped>
.courses-page {
  min-height: 100vh;
}

/* ── Page header ── */
.page-header {
  padding: 120px 24px 60px;
  border-bottom: 1px solid var(--color-border);
}

.page-header__inner {
  max-width: 900px;
  margin: 0 auto;
}

.eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 12px;
}

.page-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 16px;
}

.page-sub {
  font-size: 1.05rem;
  color: var(--color-text-muted);
  line-height: 1.7;
  max-width: 600px;
}

/* ── Course list ── */
.course-list {
  padding: 60px 24px 100px;
}

.course-list__inner {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ── Course row ── */
.course-row {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
  transition: border-color 0.2s ease;
}

.course-row--open,
.course-row:hover {
  border-color: rgba(240, 165, 0, 0.4);
}

.course-row__main {
  display: grid;
  grid-template-columns: 140px 1fr auto;
  gap: 24px;
  padding: 24px;
  cursor: pointer;
  align-items: center;
}

.course-row__thumb {
  width: 140px;
  height: 90px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--color-bg);
}

.course-row__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.course-row__thumb-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-accent);
  background: linear-gradient(135deg, #1a1a1a, #242424);
}

.course-row__title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 8px;
}

.course-row__desc {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.course-row__tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 3px 10px;
  border-radius: 100px;
  background: var(--color-bg);
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
}

.tag--accent {
  background: rgba(240, 165, 0, 0.1);
  color: var(--color-accent);
  border-color: rgba(240, 165, 0, 0.25);
}

.course-row__aside {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  min-width: 140px;
}

.course-row__price {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--color-text);
}

.btn-enroll {
  padding: 9px 18px;
  font-size: 0.875rem;
  font-weight: 600;
  background: var(--color-accent);
  color: var(--color-bg);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease;
}

.btn-enroll:hover { background: var(--color-accent-hover); }

.btn-trailer {
  padding: 7px 14px;
  font-size: 0.8rem;
  font-weight: 600;
  background: transparent;
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.btn-trailer:hover { color: var(--color-text); border-color: var(--color-text-muted); }

/* ── Expanded details ── */
.course-row__details {
  border-top: 1px solid var(--color-border);
  padding: 28px 24px;
  background: rgba(255, 255, 255, 0.015);
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.detail-block__heading {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  margin-bottom: 8px;
}

.detail-block__text {
  font-size: 0.9rem;
  color: var(--color-text);
  line-height: 1.7;
}

.trailer-embed {
  margin-bottom: 24px;
  border-radius: 10px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  max-width: 640px;
}

.trailer-embed iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.enroll-cta {
  display: flex;
  gap: 12px;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 12px 28px;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.18s ease;
  cursor: pointer;
  border: none;
}

.btn--primary {
  background: var(--color-accent);
  color: var(--color-bg);
}

.btn--primary:hover { background: var(--color-accent-hover); }

/* ── States ── */
.state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px;
}

.state--error {
  color: #f87171;
  font-size: 0.95rem;
}

.spinner {
  display: inline-block;
  width: 36px;
  height: 36px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* ── Responsive ── */
@media (max-width: 720px) {
  .course-row__main {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .course-row__thumb { width: 100%; height: 180px; }
  .course-row__aside { flex-direction: row; align-items: center; }
  .detail-grid { grid-template-columns: 1fr; }
}
</style>
