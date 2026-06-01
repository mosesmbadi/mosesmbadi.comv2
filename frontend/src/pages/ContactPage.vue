<script setup lang="ts">
import Calendar from '@/components/Calendar.vue'
</script>

<template>
  <div class="contact-page">
    <section class="contact-header">
      <div class="contact-header__inner">
        <p class="eyebrow">Book a Session</p>
        <h1 class="page-title">Schedule a Time With Me</h1>
        <p class="page-sub">
          Whether you want to enroll in a course, get mentorship, or just ask a question —
          pick a time that works for you and let's talk.
        </p>
      </div>
    </section>

    <section class="contact-cal">
      <div class="contact-cal__inner">
        <Calendar />
      </div>
    </section>

    <section class="contact-info">
      <div class="contact-info__inner">
        <div class="info-card">
          <span class="info-card__icon">✉️</span>
          <p class="info-card__label">Email</p>
          <a href="mailto:mosesmbadi@gmail.com" class="info-card__value">mosesmbadi@gmail.com</a>
        </div>
        <div class="info-card">
          <span class="info-card__icon">📍</span>
          <p class="info-card__label">Location</p>
          <p class="info-card__value">Nairobi, Kenya</p>
        </div>
        <div class="info-card">
          <span class="info-card__icon">⏱️</span>
          <p class="info-card__label">Response Time</p>
          <p class="info-card__value">Within 24 hours</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-page { min-height: 100vh; }

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
  max-width: 560px;
}

.contact-header {
  padding: 120px 24px 60px;
  border-bottom: 1px solid var(--color-border);
}

.contact-header__inner {
  max-width: 900px;
  margin: 0 auto;
}

.contact-cal {
  padding: 60px 24px;
}

.contact-cal__inner {
  max-width: 1100px;
  margin: 0 auto;
}

.contact-info {
  padding: 0 24px 80px;
  border-top: 1px solid var(--color-border);
}

.contact-info__inner {
  max-width: 900px;
  margin: 0 auto;
  padding-top: 60px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.info-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 28px;
  text-align: center;
}

.info-card__icon { font-size: 1.75rem; display: block; margin-bottom: 12px; }

.info-card__label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  margin-bottom: 6px;
}

.info-card__value {
  font-size: 0.95rem;
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.15s;
}

a.info-card__value:hover { color: var(--color-accent); }

@media (max-width: 600px) {
  .contact-info__inner { grid-template-columns: 1fr; }
}
</style>
