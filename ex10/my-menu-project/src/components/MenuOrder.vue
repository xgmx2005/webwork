<!-- src/components/MenuOrder.vue -->
<template>
  <div class="menu-order panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">点餐系统</h3>
    </div>
    <div class="panel-body">
      <div
        v-for="(menu, idx) in menus"
        :key="idx"
        class="checkbox"
      >
        <label>
          <input
            type="checkbox"
            v-model="selectedItems[idx]"
          />
          {{ menu.name }} — {{ menu.price }} 元
        </label>
      </div>
      <p class="mt-2">总金额：<strong>{{ totalAmount }}</strong> 元</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const menus = ref([
  { name: '汉堡', price: 10 },
  { name: '薯条', price: 5 },
  { name: '可乐', price: 3 }
])

const selectedItems = ref({ 0: false, 1: false, 2: false })

const totalAmount = computed(() =>
  Object.entries(selectedItems.value).reduce((sum, [i, sel]) =>
    sel ? sum + menus.value[i].price : sum, 0
  )
)
</script>

<style scoped>
.menu-order {
  margin-bottom: 30px;
}
</style>
