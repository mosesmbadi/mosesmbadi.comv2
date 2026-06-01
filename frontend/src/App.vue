<script setup lang="ts">
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
</script>

<template>
  <Navbar />
  <RouterView />
  <Footer v-if="route.path !== '/admin'" />
</template>
