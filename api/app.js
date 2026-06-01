const express = require('express');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3009;
const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme';
const DB_PATH = path.join(__dirname, 'data', 'courses.json');

app.use(express.json());

function readDB() {
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  } catch {
    return { courses: [], nextId: 1 };
  }
}

function writeDB(data) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

if (!fs.existsSync(DB_PATH)) {
  writeDB({
    nextId: 6,
    courses: [
      {
        id: 1,
        title: 'Kubernetes Local Lab',
        description: 'A hands-on Kubernetes course where you set up a real K8s cluster on your local machine. Learn pods, services, deployments, and ingress through curated practical exercises drawn from real enterprise environments.',
        duration: '6 weeks',
        thumbnail: '',
        maxAttendees: 20,
        price: 4500,
        location: 'Online',
        trailerYouTubeLink: '',
        prerequisites: 'Basic Linux command line, familiarity with Docker',
        requirements: 'A machine with at least 8GB RAM, Docker installed',
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: 'Networking for Software Engineers',
        description: 'Demystify the networking concepts every software engineer needs: DNS, HTTP/HTTPS, TCP/IP, SSL certificates, proxies, and more. Built around real-world scenarios you will actually encounter on the job.',
        duration: '4 weeks',
        thumbnail: '',
        maxAttendees: 30,
        price: 3000,
        location: 'Online',
        trailerYouTubeLink: '',
        prerequisites: 'Basic programming knowledge',
        requirements: 'A laptop with internet connection',
        createdAt: new Date().toISOString(),
      },
      {
        id: 3,
        title: 'Django REST API Masterclass',
        description: 'Build production-grade REST APIs with Django Rest Framework. Covers authentication, serialization, performance optimization with caching, and full deployment to a cloud server.',
        duration: '8 weeks',
        thumbnail: '',
        maxAttendees: 25,
        price: 5000,
        location: 'Online',
        trailerYouTubeLink: '',
        prerequisites: 'Basic Python knowledge',
        requirements: 'Python 3.x installed, any code editor',
        createdAt: new Date().toISOString(),
      },
      {
        id: 4,
        title: 'DevOps with Docker & CI/CD',
        description: 'Learn containerization with Docker, multi-service orchestration with Docker Compose, and automated CI/CD pipelines with GitHub Actions. Go from writing code to deploying it with every push.',
        duration: '6 weeks',
        thumbnail: '',
        maxAttendees: 20,
        price: 4500,
        location: 'Online',
        trailerYouTubeLink: '',
        prerequisites: 'Basic Linux, some programming experience',
        requirements: 'Docker installed, GitHub account',
        createdAt: new Date().toISOString(),
      },
      {
        id: 5,
        title: 'Cloud DevOps Engineering',
        description: 'End-to-end cloud infrastructure: deploy applications on AWS, manage infrastructure with Terraform, set up monitoring and alerting, and implement security best practices used in real enterprise environments.',
        duration: '10 weeks',
        thumbnail: '',
        maxAttendees: 15,
        price: 7000,
        location: 'Online',
        trailerYouTubeLink: '',
        prerequisites: 'Linux basics, Docker experience, some DevOps exposure',
        requirements: 'AWS free tier account, laptop with at least 8GB RAM',
        createdAt: new Date().toISOString(),
      },
    ],
  });
}

function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.admin = jwt.verify(auth.slice(7), JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

app.post('/auth/login', (req, res) => {
  const { username, password } = req.body ?? {};
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

app.get('/courses', (req, res) => {
  const { courses } = readDB();
  res.json(courses);
});

app.get('/courses/:id', (req, res) => {
  const { courses } = readDB();
  const course = courses.find(c => c.id === Number(req.params.id));
  if (!course) return res.status(404).json({ error: 'Not found' });
  res.json(course);
});

app.post('/courses', requireAuth, (req, res) => {
  const db = readDB();
  const course = {
    id: db.nextId++,
    title: req.body.title ?? '',
    description: req.body.description ?? '',
    duration: req.body.duration ?? '',
    thumbnail: req.body.thumbnail ?? '',
    maxAttendees: Number(req.body.maxAttendees) || 20,
    price: Number(req.body.price) || 0,
    location: req.body.location ?? 'Online',
    trailerYouTubeLink: req.body.trailerYouTubeLink ?? '',
    prerequisites: req.body.prerequisites ?? '',
    requirements: req.body.requirements ?? '',
    createdAt: new Date().toISOString(),
  };
  db.courses.unshift(course);
  writeDB(db);
  res.status(201).json(course);
});

app.put('/courses/:id', requireAuth, (req, res) => {
  const db = readDB();
  const idx = db.courses.findIndex(c => c.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.courses[idx] = { ...db.courses[idx], ...req.body, id: db.courses[idx].id, createdAt: db.courses[idx].createdAt };
  writeDB(db);
  res.json(db.courses[idx]);
});

app.delete('/courses/:id', requireAuth, (req, res) => {
  const db = readDB();
  const idx = db.courses.findIndex(c => c.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.courses.splice(idx, 1);
  writeDB(db);
  res.status(204).end();
});

app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
