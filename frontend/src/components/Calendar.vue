<script setup lang="ts">
import { onMounted, ref } from 'vue'
import getCalApi from '@calcom/embed-snippet'

// In local dev this is set via docker-compose environment → VITE_CAL_ORIGIN=http://localhost:3000
// In production set it as a build arg / env var in your CI pipeline.
// Falls back to the cloud version so the page never breaks during development.
const CAL_ORIGIN = import.meta.env.VITE_CAL_ORIGIN ?? 'https://app.cal.com'

const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const cal = await getCalApi(`${CAL_ORIGIN}/embed/embed.js`)

    cal('inline', {
      elementOrSelector: '#moses-cal-frame',
      calLink: 'moses/secret',
      config: {
        layout: 'month_view',
        theme: 'dark',
      },
    })

    cal('ui', {
      hideEventTypeDetails: false,
      layout: 'month_view',
    })
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load calendar'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="booking">
    <div class="booking__header">
      <p class="booking__eyebrow">Book a Session</p>
      <h2 class="booking__title">Schedule a Time With Me</h2>
    </div>

    <div class="booking__frame-wrap">
      <div v-if="loading" class="booking__state">
        <span class="spinner" aria-label="Loading calendar…" />
      </div>

      <div v-else-if="error" class="booking__state booking__state--error">
        <p>⚠️ {{ error }}</p>
      </div>

      <!-- Always in DOM so Cal can find the selector -->
      <div
        id="moses-cal-frame"
        :class="['booking__frame', { 'booking__frame--hidden': loading || !!error }]"
      />
    </div>
  </section>
</template>

<style scoped>
.booking {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 24px 40px;
}

.booking__header {
  text-align: center;
  margin-bottom: 48px;
}

.booking__eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 12px;
}

.booking__title {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.2;
}

.booking__frame-wrap {
  position: relative;
  min-height: 650px;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.booking__state {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface);
}

.booking__state--error {
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

.booking__frame {
  width: 100%;
  min-height: 650px;
}

.booking__frame--hidden {
  visibility: hidden;
}

@media (max-width: 600px) {
  .booking {
    padding: 64px 16px 24px;
  }
}
</style>
