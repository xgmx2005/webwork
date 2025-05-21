<template>
  <header class="bg-success text-white text-center py-4">
    <h1>植物基底饮食屋</h1>
  </header>

  <FoodList />

  <footer class="bg-dark text-white text-center py-3">
    <p>&copy; 2025 植物基底饮食屋. 保留所有权利.</p>
  </footer>
</template>

<script setup>
import FoodList from './components/FoodList.vue'
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>
