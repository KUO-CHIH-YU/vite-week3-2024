<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="container">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink> | <RouterLink to="/about">About</RouterLink> |
          <RouterLink to="/week1">第一週作業</RouterLink> |
          <RouterLink to="/week2">第二週作業</RouterLink> |
          <RouterLink to="/week3">第三週作業</RouterLink>
        </nav>
      </div>
    </header>
  </div>
  <RouterView />
</template>
