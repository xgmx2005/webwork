<!-- src/App.vue -->
<template>
  <div id="app" class="container">
    <h1>ex10</h1>
    <!-- 直接使用子组件 -->
    <StudentManager />
    <br>
    <MenuOrder />
  </div>
</template>

<script setup>
import StudentManager from './components/StudentManager.vue'
import MenuOrder from './components/MenuOrder.vue';
</script>

<style>
.container {
  max-width: 600px;
  margin: 40px auto;
}
</style>
