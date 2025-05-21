<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">食物列表</h2>
    <div class="row">
      <div v-for="food in foods" :key="food.foodName" class="col-md-3 mb-4">
        <div class="card h-100">
          <img :src="food.foodImage" class="card-img-top" alt="食物图片">
          <div class="card-body">
            <h5 class="card-title">{{ food.foodName }}</h5>
            <p class="card-text">{{ food.foodDescription }}</p>
            <p class="card-text text-danger">￥{{ food.foodPrice }}</p>
            <p class="card-text">库存：{{ food.stock }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const foods = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('http://127.0.0.1:5000/api/foods')
    foods.value = res.data.data
  } catch (error) {
    console.error('获取食物失败', error)
  }
})
</script>
