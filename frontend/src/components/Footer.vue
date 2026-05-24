<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')

function subscribe() {
  if (!email.value.trim()) return
  // TODO: wire up to newsletter endpoint
  alert(`Subscribed with ${email.value}`)
  email.value = ''
}

const socials = [
  {
    label: 'Facebook',
    href: '#',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>`,
  },
  {
    label: 'Instagram',
    href: '#',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>`,
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>`,
  },
  {
    label: 'X',
    href: '#',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>`,
  },
]

const links = ['About', 'Services', 'Projects', 'Meet the Team', 'Contact Us']
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">

      <!-- About -->
      <div class="footer__col">
        <h3 class="footer__heading">About</h3>
        <p class="footer__text">
          Moses Mbadi is a passionate educator and developer dedicated to helping students
          grow through hands-on, real-world learning experiences.
        </p>
        <div class="footer__socials">
          <a
            v-for="s in socials"
            :key="s.label"
            :href="s.href"
            :aria-label="s.label"
            class="footer__social"
            v-html="s.icon"
          />
        </div>
      </div>

      <!-- Useful Links -->
      <div class="footer__col">
        <h3 class="footer__heading">Useful Links</h3>
        <ul class="footer__links">
          <li v-for="link in links" :key="link">
            <a href="#" class="footer__link">{{ link }}</a>
          </li>
        </ul>
      </div>

      <!-- Contact -->
      <div class="footer__col">
        <h3 class="footer__heading">Contact</h3>
        <address class="footer__contact">
          <p class="footer__address">
            75 Road Street, 600<br />Nairobi, Kenya
          </p>
          <a href="mailto:mosesmbadi@gmail.com" class="footer__contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            mosesmbadi@gmail.com
          </a>
          <a href="tel:+254700000000" class="footer__contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 11.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            +254 700 000 000
          </a>
        </address>
      </div>

      <!-- Newsletter -->
      <div class="footer__col">
        <h3 class="footer__heading">Newsletter</h3>
        <p class="footer__text">Be the first to get the latest from us</p>
        <form class="footer__form" @submit.prevent="subscribe">
          <input
            v-model="email"
            type="email"
            placeholder="enter email"
            class="footer__input"
            required
          />
          <button type="submit" class="footer__submit">Submit</button>
        </form>
      </div>

    </div>

    <div class="footer__bottom">
      <p>© {{ new Date().getFullYear() }} Moses Mbadi. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
}

.footer__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 72px 24px 48px;
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1.5fr;
  gap: 48px;
}

/* Heading */
.footer__heading {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 20px;
}

/* About col */
.footer__text {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.7;
  margin-bottom: 24px;
}

.footer__socials {
  display: flex;
  gap: 10px;
}

.footer__social {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--color-text);
  color: var(--color-bg);
  text-decoration: none;
  transition: background 0.2s ease, transform 0.2s ease;
}

.footer__social:hover {
  background: var(--color-accent);
  transform: translateY(-2px);
}

/* Links col */
.footer__links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer__link {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color 0.15s ease;
}

.footer__link:hover {
  color: var(--color-accent);
}

/* Contact col */
.footer__contact {
  font-style: normal;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.footer__address {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.footer__contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color 0.15s ease;
}

.footer__contact-item:hover {
  color: var(--color-accent);
}

.footer__contact-item svg {
  flex-shrink: 0;
  color: var(--color-accent);
}

/* Newsletter col */
.footer__form {
  display: flex;
  margin-top: 4px;
}

.footer__input {
  flex: 1;
  padding: 10px 14px;
  font-size: 0.875rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-right: none;
  border-radius: var(--radius) 0 0 var(--radius);
  color: var(--color-text);
  outline: none;
  transition: border-color 0.2s ease;
}

.footer__input::placeholder {
  color: var(--color-text-muted);
}

.footer__input:focus {
  border-color: var(--color-accent);
}

.footer__submit {
  padding: 10px 18px;
  font-size: 0.875rem;
  font-weight: 600;
  background: var(--color-text);
  color: var(--color-bg);
  border: none;
  border-radius: 0 var(--radius) var(--radius) 0;
  cursor: pointer;
  transition: background 0.2s ease;
}

.footer__submit:hover {
  background: var(--color-accent);
}

/* Bottom bar */
.footer__bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 24px;
  border-top: 1px solid var(--color-border);
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

/* Responsive */
@media (max-width: 900px) {
  .footer__inner {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
}

@media (max-width: 540px) {
  .footer__inner {
    grid-template-columns: 1fr;
    padding: 48px 20px 32px;
  }
}
</style>
