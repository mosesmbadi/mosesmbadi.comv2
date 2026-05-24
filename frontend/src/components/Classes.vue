<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface ClassItem {
  id: number
  name: string
  teacher: string
}

const classes = ref<ClassItem[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const res = await fetch('/classes')
    if (!res.ok) throw new Error(`Server responded with ${res.status}`)
    classes.value = await res.json()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load classes'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="classes">
    <div class="classes__header">
      <p class="classes__eyebrow">What I Teach</p>
      <h2 class="classes__title">Lessons I Offer</h2>
      <p class="classes__subtitle">
        Tailored one-on-one sessions designed to meet you exactly where you are and take you further.
      </p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="classes__state">
      <span class="spinner" aria-label="Loading classes…" />
    </div>

    <!-- Error -->
    <div v-else-if="error" class="classes__state classes__state--error">
      <p>⚠️ {{ error }}</p>
    </div>

    <!-- Data -->
    <div v-else class="classes__grid">
      <article v-for="cls in classes" :key="cls.id" class="class-card">
        <div class="class-card__body">
          <h3 class="class-card__title">{{ cls.name }}</h3>
          <p class="class-card__teacher">
            <span class="class-card__teacher-label">Instructor</span>
            {{ cls.teacher }}
          </p>
        </div>

        <a href="#contact" class="class-card__cta">Book a Session →</a>
      </article>
    </div>
  </section>
</template>

<style scoped>
.classes {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 24px;
}

/* Header */
.classes__header {
  text-align: center;
  margin-bottom: 64px;
}

.classes__eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 12px;
}

.classes__title {
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.15;
  margin-bottom: 16px;
}

.classes__subtitle {
  font-size: 1.05rem;
  color: var(--color-text-muted);
  max-width: 520px;
  margin: 0 auto;
  line-height: 1.7;
}

/* State (loading / error) */
.classes__state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.classes__state--error {
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

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Grid */
.classes__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

/* Card */
.class-card {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.class-card:hover {
  transform: translateY(-4px);
  background: var(--color-surface-hover);
  border-color: rgba(240, 165, 0, 0.3);
}

.class-card__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.class-card__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.3;
}

.class-card__teacher {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  gap: 8px;
}

.class-card__teacher-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
  border-radius: 100px;
  padding: 2px 8px;
}

.class-card__cta {
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-accent);
  text-decoration: none;
  margin-top: auto;
  transition: color 0.15s ease;
}

.class-card__cta:hover {
  color: var(--color-accent-hover);
}

@media (max-width: 600px) {
  .classes {
    padding: 64px 20px;
  }

  .classes__header {
    margin-bottom: 40px;
  }
}
</style>
