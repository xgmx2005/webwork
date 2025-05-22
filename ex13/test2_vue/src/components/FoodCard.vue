<template>
  <div class="col-md-3 mb-4">
    <div class="card h-100" @click="showDetails">
      <img :src="food.image" class="card-img-top" :alt="food.foodName">
      <div class="card-body d-flex flex-column justify-content-between">
        <h5 class="card-title">{{ food.foodName }}</h5>
        <div class="card-text">价格: {{ food.foodPrice }}元</div>
        <button 
          v-if="isLogined" 
          class="btn btn-primary btn-sm align-self-end" 
          @click="showDetails"
        >
          详情
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  food: {
    type: Object,
    required: true
  },
  isLogined: {
    type: Boolean,
    default: false
  }
})


const emit = defineEmits(['details']) //  定义事件
const showDetails = () => { // 触发 details 事件
  emit('details', props.food)
}
</script>