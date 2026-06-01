<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

interface Course {
  id: number
  title: string
  description: string
  duration: string
  thumbnail: string
  price: number
  location: string
  trailerYouTubeLink: string
}

const featured = ref<Course[]>([])

onMounted(async () => {
  try {
    const res = await fetch('/courses')
    const all: Course[] = await res.json()
    featured.value = all.slice(0, 3)
  } catch {
    // featured stays empty
  }
})

const stats = [
  { value: '4+', label: 'Years in Enterprise' },
  { value: '5+', label: 'Courses Offered' },
  { value: '100+', label: 'Students Helped' },
  { value: '3', label: 'Certifications' },
]

const topics = ['Kubernetes', 'Docker', 'CI/CD', 'Django', 'Networking', 'Cloud DevOps', 'Linux', 'Terraform']
</script>

<template>
  <!-- Hero -->
  <section class="hero">
    <div class="hero__inner">
      <div class="hero__content">
        <span class="hero__eyebrow">Software Engineer & Educator</span>
        <h1 class="hero__title">
          From Zero to<br />
          <span class="hero__title-accent">Software Engineer</span>
        </h1>
        <p class="hero__sub">
          Practical, hands-on tech education from an engineer with real enterprise experience —
          built for Africans ready to break into the industry.
        </p>
        <div class="hero__actions">
          <RouterLink to="/courses" class="btn btn--primary">Explore Courses</RouterLink>
          <RouterLink to="/contact" class="btn btn--ghost">Book a Session</RouterLink>
        </div>
        <div class="hero__topics">
          <span v-for="t in topics" :key="t" class="hero__tag">{{ t }}</span>
        </div>
      </div>
      <div class="hero__visual">
        <div class="hero__avatar">
          <span class="hero__avatar-initials">MM</span>
        </div>
        <div class="hero__badge hero__badge--1">Head of IT @ Chem-Labs</div>
        <div class="hero__badge hero__badge--2">Udacity Cloud DevOps</div>
      </div>
    </div>
  </section>

  <!-- Stats -->
  <section class="stats">
    <div class="stats__inner">
      <div v-for="s in stats" :key="s.label" class="stats__item">
        <span class="stats__value">{{ s.value }}</span>
        <span class="stats__label">{{ s.label }}</span>
      </div>
    </div>
  </section>

  <!-- About snippet -->
  <section class="about-snippet">
    <div class="about-snippet__inner">
      <div class="about-snippet__text">
        <p class="section-eyebrow">Who I Am</p>
        <h2 class="section-title">Engineer First,<br />Educator by Passion</h2>
        <p class="about-snippet__body">
          I'm Moses Mbadi — Head of IT at Chem-Labs, backend engineer, cloud DevOps practitioner,
          and systems thinker. I've spent 4+ years building, deploying, and managing enterprise
          software in real production environments.
        </p>
        <p class="about-snippet__body">
          Everything I teach comes from the trenches — not just tutorials. My mission is simple:
          make the path into tech clear, affordable, and achievable for anyone in Africa willing
          to put in the work.
        </p>
        <RouterLink to="/about" class="btn btn--outline">Read My Story</RouterLink>
      </div>
      <div class="about-snippet__stack">
        <p class="about-snippet__stack-title">Tech I Work With</p>
        <div class="about-snippet__skills">
          <span v-for="skill in ['Python', 'Django', 'Docker', 'Kubernetes', 'Terraform', 'AWS', 'Linux', 'CI/CD', 'Git', 'Postgres']"
            :key="skill" class="skill-tag">{{ skill }}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Featured courses -->
  <section class="featured">
    <div class="featured__inner">
      <div class="featured__header">
        <p class="section-eyebrow">Learn With Me</p>
        <h2 class="section-title">Featured Courses</h2>
      </div>

      <div v-if="featured.length" class="featured__grid">
        <RouterLink
          v-for="course in featured"
          :key="course.id"
          to="/courses"
          class="course-card"
        >
          <div class="course-card__thumb">
            <img v-if="course.thumbnail" :src="course.thumbnail" :alt="course.title" />
            <div v-else class="course-card__thumb-placeholder">
              {{ course.title.charAt(0) }}
            </div>
          </div>
          <div class="course-card__body">
            <h3 class="course-card__title">{{ course.title }}</h3>
            <p class="course-card__desc">{{ course.description.slice(0, 110) }}…</p>
            <div class="course-card__meta">
              <span class="course-card__badge">{{ course.duration }}</span>
              <span class="course-card__badge course-card__badge--loc">{{ course.location }}</span>
            </div>
            <p class="course-card__price">
              KES {{ course.price.toLocaleString() }}
            </p>
          </div>
        </RouterLink>
      </div>

      <div class="featured__footer">
        <RouterLink to="/courses" class="btn btn--outline">View All Courses</RouterLink>
      </div>
    </div>
  </section>

  <!-- CTA banner -->
  <section class="cta-banner">
    <div class="cta-banner__inner">
      <h2 class="cta-banner__title">Ready to Break Into Tech?</h2>
      <p class="cta-banner__sub">
        Join engineers across Africa learning the skills that actually get you hired.
      </p>
      <div class="cta-banner__actions">
        <RouterLink to="/courses" class="btn btn--primary">Start Learning</RouterLink>
        <RouterLink to="/contact" class="btn btn--ghost">Talk to Moses</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Shared ─────────────────────────────────── */
.section-eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 12px;
}

.section-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-text);
  margin-bottom: 24px;
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
.btn--primary:hover { background: var(--color-accent-hover); transform: translateY(-2px); }

.btn--ghost {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
.btn--ghost:hover { border-color: var(--color-text-muted); background: var(--color-surface); }

.btn--outline {
  background: transparent;
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
}
.btn--outline:hover { background: var(--color-accent); color: var(--color-bg); }

/* ── Hero ─────────────────────────────────── */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 100px 24px 80px;
}

.hero__inner {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 80px;
  align-items: center;
}

.hero__eyebrow {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent);
  background: rgba(240, 165, 0, 0.1);
  border: 1px solid rgba(240, 165, 0, 0.25);
  padding: 6px 14px;
  border-radius: 100px;
  margin-bottom: 24px;
}

.hero__title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin-bottom: 24px;
}

.hero__title-accent {
  color: var(--color-accent);
}

.hero__sub {
  font-size: 1.1rem;
  color: var(--color-text-muted);
  line-height: 1.7;
  max-width: 520px;
  margin-bottom: 36px;
}

.hero__actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.hero__topics {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.hero__tag {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 4px 12px;
  border-radius: 100px;
}

/* Visual */
.hero__visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero__avatar {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-surface) 0%, #2a2a2a 100%);
  border: 2px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero__avatar-initials {
  font-size: 5rem;
  font-weight: 800;
  color: var(--color-accent);
}

.hero__badge {
  position: absolute;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 10px 16px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text);
  white-space: nowrap;
}

.hero__badge--1 { top: 20px; right: -10px; }
.hero__badge--2 { bottom: 20px; left: -10px; }

/* ── Stats ─────────────────────────────────── */
.stats {
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
}

.stats__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.stats__item {
  text-align: center;
}

.stats__value {
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-accent);
  line-height: 1;
  margin-bottom: 8px;
}

.stats__label {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

/* ── About snippet ─────────────────────────────────── */
.about-snippet {
  padding: 100px 24px;
}

.about-snippet__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
}

.about-snippet__body {
  font-size: 1rem;
  color: var(--color-text-muted);
  line-height: 1.8;
  margin-bottom: 20px;
}

.about-snippet__stack {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 32px;
  margin-top: 40px;
}

.about-snippet__stack-title {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 20px;
}

.about-snippet__skills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skill-tag {
  padding: 6px 14px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

/* ── Featured courses ─────────────────────────────────── */
.featured {
  padding: 0 24px 100px;
}

.featured__inner {
  max-width: 1200px;
  margin: 0 auto;
}

.featured__header {
  margin-bottom: 48px;
}

.featured__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 48px;
}

.featured__footer {
  text-align: center;
}

.course-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
  text-decoration: none;
  transition: border-color 0.2s ease, transform 0.2s ease;
  display: block;
}

.course-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-4px);
}

.course-card__thumb {
  height: 180px;
  overflow: hidden;
  background: #1e1e1e;
}

.course-card__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.course-card__thumb-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 800;
  color: var(--color-accent);
  background: linear-gradient(135deg, #1a1a1a 0%, #242424 100%);
}

.course-card__body {
  padding: 20px;
}

.course-card__title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 10px;
  line-height: 1.4;
}

.course-card__desc {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 16px;
}

.course-card__meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}

.course-card__badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 100px;
  background: rgba(240, 165, 0, 0.12);
  color: var(--color-accent);
  border: 1px solid rgba(240, 165, 0, 0.25);
}

.course-card__badge--loc {
  background: var(--color-bg);
  color: var(--color-text-muted);
  border-color: var(--color-border);
}

.course-card__price {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
}

/* ── CTA banner ─────────────────────────────────── */
.cta-banner {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
}

.cta-banner__inner {
  max-width: 700px;
  margin: 0 auto;
  padding: 80px 24px;
  text-align: center;
}

.cta-banner__title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 16px;
}

.cta-banner__sub {
  font-size: 1.05rem;
  color: var(--color-text-muted);
  line-height: 1.7;
  margin-bottom: 36px;
}

.cta-banner__actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

/* ── Responsive ─────────────────────────────────── */
@media (max-width: 960px) {
  .hero__inner {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .hero__sub { max-width: 100%; }
  .hero__actions { justify-content: center; }
  .hero__topics { justify-content: center; }
  .hero__visual { display: none; }
  .stats__inner { grid-template-columns: repeat(2, 1fr); }
  .about-snippet__inner { grid-template-columns: 1fr; gap: 40px; }
  .featured__grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 600px) {
  .hero { padding: 80px 20px 60px; }
  .featured__grid { grid-template-columns: 1fr; }
  .stats__inner { grid-template-columns: repeat(2, 1fr); }
}
</style>
