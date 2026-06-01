<script setup lang="ts">
const certs = [
  { name: 'Cloud DevOps Engineer Nanodegree', issuer: 'Udacity', year: '2022' },
  { name: 'Google Cybersecurity Certificate', issuer: 'Google', year: '2023' },
  { name: 'DevOps & Software Engineering Professional', issuer: 'IBM / Coursera', year: '2023' },
]

const stack = [
  { category: 'Languages', items: ['Python', 'JavaScript', 'Java', 'Dart', 'C#'] },
  { category: 'Frameworks', items: ['Django', 'Django REST Framework', 'React', 'Flutter', 'Spring Boot'] },
  { category: 'DevOps & Cloud', items: ['Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'GitHub Actions', 'AWS'] },
  { category: 'Systems', items: ['Linux', 'Nginx', 'PostgreSQL', 'Redis', 'SSL/TLS', 'CI/CD'] },
]

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/moses-mbadi-0b8500198/', color: '#0a66c2' },
  { label: 'GitHub', href: 'https://github.com/mosesmbadi', color: '#e8e8e8' },
  { label: 'YouTube', href: 'https://www.youtube.com/@mosesmbadi', color: '#ff0000' },
  { label: 'X / Twitter', href: 'https://x.com/mosesmbadi', color: '#e8e8e8' },
  { label: 'Instagram', href: 'https://www.instagram.com/mbadimoses/', color: '#e1306c' },
]
</script>

<template>
  <div class="about-page">
    <!-- Header -->
    <section class="about-hero">
      <div class="about-hero__inner">
        <div class="about-hero__avatar">
          <span>MM</span>
        </div>
        <div class="about-hero__content">
          <p class="eyebrow">About Me</p>
          <h1 class="page-title">Moses Mbadi</h1>
          <p class="about-hero__role">Head of IT · Backend Engineer · Cloud DevOps · Educator</p>
          <p class="about-hero__mission">
            "I help Africans break into tech — from zero to software engineer."
          </p>
          <div class="about-hero__socials">
            <a
              v-for="s in socials"
              :key="s.label"
              :href="s.href"
              target="_blank"
              rel="noopener"
              class="social-pill"
            >{{ s.label }}</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Bio -->
    <section class="bio">
      <div class="bio__inner">
        <div class="bio__col">
          <p class="eyebrow">My Story</p>
          <h2 class="section-title">Engineer First,<br />Educator by Passion</h2>
        </div>
        <div class="bio__col bio__col--text">
          <p>
            I'm a backend engineer, cloud DevOps practitioner, and systems administrator currently
            serving as <strong>Head of Information Technology at Chem-Labs Limited</strong> in Nairobi, Kenya.
            Over the past 4+ years I've built, deployed, and managed enterprise software in real
            production environments — on-premise and in the cloud.
          </p>
          <p>
            My technical roots are in backend systems: designing APIs that scale, debugging
            production issues at 2am, wiring together CI/CD pipelines that teams actually rely on.
            That hands-on experience shapes every course I create — because I've lived through the
            mistakes so you don't have to.
          </p>
          <p>
            The education side came naturally. I started writing on Medium, sharing the things I
            wished someone had explained clearly when I was learning. The response from the community
            — especially from aspiring engineers across Africa — pushed me to go deeper. Courses,
            mentorship, practical labs: all built around the same principle: <em>learn by doing</em>.
          </p>
          <p>
            My mission is simple: make the path into tech clear, practical, and achievable for
            anyone willing to put in the work — regardless of where they're starting from.
          </p>
        </div>
      </div>
    </section>

    <!-- Tech stack -->
    <section class="stack-section">
      <div class="stack-section__inner">
        <p class="eyebrow">Tech Stack</p>
        <h2 class="section-title">What I Work With</h2>
        <div class="stack-grid">
          <div v-for="group in stack" :key="group.category" class="stack-group">
            <h3 class="stack-group__title">{{ group.category }}</h3>
            <div class="stack-group__items">
              <span v-for="item in group.items" :key="item" class="skill-chip">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Certifications -->
    <section class="certs-section">
      <div class="certs-section__inner">
        <p class="eyebrow">Credentials</p>
        <h2 class="section-title">Certifications</h2>
        <div class="certs-list">
          <div v-for="c in certs" :key="c.name" class="cert-card">
            <div class="cert-card__icon">🏅</div>
            <div>
              <p class="cert-card__name">{{ c.name }}</p>
              <p class="cert-card__meta">{{ c.issuer }} · {{ c.year }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Africa -->
    <section class="mission-section">
      <div class="mission-section__inner">
        <div class="mission-card">
          <p class="eyebrow">Mission</p>
          <h2 class="section-title">Why I Teach</h2>
          <p class="mission-card__text">
            Africa has an enormous pool of talent — people who are curious, driven, and capable of
            building world-class software. What's often missing is access to <em>practical</em>,
            experience-backed education that bridges the gap between "I want to learn" and
            "I got the job."
          </p>
          <p class="mission-card__text">
            Every course I build, every article I write, every question I answer is a small step
            toward closing that gap. You don't need to move abroad or pay for an expensive
            bootcamp to become a great engineer. You need clear instruction, real projects,
            and someone who's actually done the work showing you the way.
          </p>
          <a href="/contact" class="btn btn--primary">Work With Me</a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page { min-height: 100vh; }

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
  margin-bottom: 8px;
}

.section-title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.25;
  margin-bottom: 24px;
}

/* ── Hero ── */
.about-hero {
  padding: 120px 24px 80px;
  border-bottom: 1px solid var(--color-border);
}

.about-hero__inner {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  gap: 56px;
  align-items: center;
}

.about-hero__avatar {
  width: 160px;
  height: 160px;
  flex-shrink: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-surface), #2a2a2a);
  border: 2px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 800;
  color: var(--color-accent);
}

.about-hero__role {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  margin-bottom: 16px;
}

.about-hero__mission {
  font-size: 1.2rem;
  font-style: italic;
  color: var(--color-text);
  border-left: 3px solid var(--color-accent);
  padding-left: 16px;
  margin-bottom: 28px;
  line-height: 1.5;
}

.about-hero__socials {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.social-pill {
  padding: 6px 16px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-text-muted);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 100px;
  text-decoration: none;
  transition: color 0.15s, border-color 0.15s;
}

.social-pill:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

/* ── Bio ── */
.bio {
  padding: 100px 24px;
}

.bio__inner {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 80px;
}

.bio__col--text p {
  font-size: 1rem;
  color: var(--color-text-muted);
  line-height: 1.8;
  margin-bottom: 20px;
}

.bio__col--text strong { color: var(--color-text); font-weight: 600; }
.bio__col--text em { color: var(--color-accent); font-style: normal; }

/* ── Stack ── */
.stack-section {
  padding: 80px 24px;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.stack-section__inner {
  max-width: 1000px;
  margin: 0 auto;
}

.stack-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.stack-group__title {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  margin-bottom: 14px;
}

.stack-group__items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-chip {
  padding: 6px 14px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

/* ── Certs ── */
.certs-section {
  padding: 80px 24px;
}

.certs-section__inner {
  max-width: 1000px;
  margin: 0 auto;
}

.certs-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cert-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}

.cert-card__icon { font-size: 1.75rem; }

.cert-card__name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 4px;
}

.cert-card__meta {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

/* ── Mission ── */
.mission-section {
  padding: 80px 24px 100px;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
}

.mission-section__inner {
  max-width: 800px;
  margin: 0 auto;
}

.mission-card__text {
  font-size: 1.05rem;
  color: var(--color-text-muted);
  line-height: 1.8;
  margin-bottom: 20px;
}

.mission-card__text em { color: var(--color-text); font-style: normal; font-weight: 500; }

.btn {
  display: inline-flex;
  align-items: center;
  padding: 13px 30px;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.18s ease;
  margin-top: 12px;
}

.btn--primary {
  background: var(--color-accent);
  color: var(--color-bg);
}

.btn--primary:hover { background: var(--color-accent-hover); transform: translateY(-2px); }

/* ── Responsive ── */
@media (max-width: 760px) {
  .about-hero__inner { flex-direction: column; gap: 32px; text-align: center; }
  .about-hero__mission { text-align: left; }
  .about-hero__socials { justify-content: center; }
  .bio__inner { grid-template-columns: 1fr; gap: 40px; }
  .stack-grid { grid-template-columns: 1fr; }
}
</style>
