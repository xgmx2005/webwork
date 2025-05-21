<!-- src/components/FoodList.vue -->
<template>
  <div class="container my-5">
    <div class="row" v-if="foods.length">
      <div class="col-md-3 mb-4" v-for="food in foods" :key="food.foodName">
        <div class="card h-100">
          <img :src="`/` + food.foodImage" class="card-img-top" :alt="food.foodName">
          <div class="card-body d-flex flex-column justify-content-between">
            <div>
              <h5 class="card-title">{{ food.foodName }}</h5>
              <p class="card-text">价格: {{ food.foodPrice }} 元</p>
            </div>
            <button class="btn btn-primary align-self-end" @click="openModal(food)">详情</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 模态框 -->
    <div class="modal fade" id="foodDetailsModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content" v-if="currentFood">
          <div class="modal-header">
            <h5 class="modal-title">食物详情</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <img :src="`/` + currentFood.foodImage" class="img-fluid mb-3" alt="食物图片" />
            <p>{{ currentFood.foodDescription }}</p>
            <strong>价格:</strong> {{ currentFood.foodPrice }} 元<br>
            <strong>库存:</strong> {{ currentFood.stock }}
            <p :style="{color: infoColor}">{{ infoText }}</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-success" @click="buy">购买</button>
            <button class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import 'bootstrap/dist/js/bootstrap.bundle'

const foods = ref([])
const currentFood = ref(null)
const infoText = ref('')
const infoColor = ref('black')
let count = 1

onMounted(async () => {
  const res = await fetch('/data/foods.json')
  const data = await res.json()
  foods.value = data
})

function openModal(food) {
  currentFood.value = { ...food }
  infoText.value = ''
  const modal = new bootstrap.Modal(document.getElementById('foodDetailsModal'))
  modal.show()
}

function buy() {
  if (!currentFood.value) return

  if (currentFood.value.stock <= 0) {
    infoText.value = '该商品已售罄！'
    infoColor.value = 'red'
    return
  }

  const purchase = [{
    name: currentFood.value.foodName,
    quantity: 1,
    price: currentFood.value.foodPrice,
    timestamp: new Date().toLocaleString()
  }]
  localStorage.setItem(`order${count++}`, JSON.stringify(purchase))
  currentFood.value.stock -= 1
  infoText.value = '购买成功！'
  infoColor.value = 'green'
}
</script>

<style scoped>
.card-title {
  font-weight: bold;
}
</style>
