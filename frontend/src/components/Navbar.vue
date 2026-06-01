<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const menuOpen = ref(false)
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const links = [
  { label: 'Home', to: '/' },
  { label: 'Courses', to: '/courses' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]
</script>

<template>
  <header :class="['nav', { 'nav--scrolled': scrolled }]">
    <div class="nav__inner">
      <RouterLink to="/" class="nav__logo">
        Moses<span class="nav__logo-dot">.</span>
      </RouterLink>

      <nav class="nav__links" :class="{ 'nav__links--open': menuOpen }">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav__link"
          :class="{ 'nav__link--active': route.path === link.to }"
          @click="menuOpen = false"
        >
          {{ link.label }}
        </RouterLink>
        <RouterLink to="/courses" class="nav__cta" @click="menuOpen = false">
          Enroll Now
        </RouterLink>
      </nav>

      <button class="nav__burger" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">
        <span /><span /><span />
      </button>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background 0.25s ease, box-shadow 0.25s ease;
}

.nav--scrolled {
  background: rgba(15, 15, 15, 0.92);
  backdrop-filter: blur(12px);
  box-shadow: 0 1px 0 var(--color-border);
}

.nav__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav__logo {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-text);
  text-decoration: none;
  letter-spacing: -0.02em;
}

.nav__logo-dot {
  color: var(--color-accent);
}

.nav__links {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav__link {
  padding: 6px 14px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-muted);
  text-decoration: none;
  border-radius: 6px;
  transition: color 0.15s ease, background 0.15s ease;
}

.nav__link:hover,
.nav__link--active {
  color: var(--color-text);
  background: var(--color-surface);
}

.nav__cta {
  margin-left: 8px;
  padding: 8px 20px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-bg);
  background: var(--color-accent);
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.15s ease, transform 0.15s ease;
}

.nav__cta:hover {
  background: var(--color-accent-hover);
  transform: translateY(-1px);
}

.nav__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.nav__burger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--color-text);
  border-radius: 2px;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

@media (max-width: 700px) {
  .nav__burger {
    display: flex;
  }

  .nav__links {
    display: none;
    position: absolute;
    top: 68px;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    padding: 16px 24px 24px;
    gap: 4px;
  }

  .nav__links--open {
    display: flex;
  }

  .nav__cta {
    margin-left: 0;
    margin-top: 8px;
    text-align: center;
  }
}
</style>
