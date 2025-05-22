<template>
  <div class="modal fade" :id="modalId" tabindex="-1" :aria-labelledby="`${modalId}Label`" aria-hidden="true" :inert="isInert" ref="modalEl">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="`${modalId}Label`">{{ food.foodName }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <img :src="food.image" class="img-fluid mb-3" :alt="food.foodName">
          <p>{{ food.foodDescription }}</p>
          <strong>价格: </strong><span>{{ food.foodPrice }}元</span><br>
          <strong>库存: </strong><span>{{ food.stock }}</span>
          <p id="info" :class="infoStyle">{{ infoMessage }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" @click="buyFood">购买</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import $ from 'jquery'
import { defineProps, defineEmits,defineExpose,toRefs,ref } from 'vue'

const props = defineProps({
  food: {
    type: Object,
    required: true
  },
  modalId: {
    type: String,
    default: 'foodDetailsModal'
  },
  isInert: {
    type: Boolean,
    default: true
  },
  infoMessage: {
    type: String,
    default: ''
  },
  infoStyle: {
    type: String,
    default: 'green'
  }
})

const { // 解构 props
  food,
  modalId,
  isInert,
  infoMessage,
  infoStyle
} = toRefs(props)

const emit = defineEmits(['buy','close']) // 监听 buy 事件

const buyFood = () => { // 触发 buy 事件
  emit('buy')
}
// 获取 DOM 引用
const modalEl = ref(null)

// 显示模态框方法
const showModal = () => {
  if (modalEl.value) {
    $(modalEl.value).modal('show')
  }
}

// 隐藏模态框方法
const hideModal = () => {
  if (modalEl.value) {
    $(modalEl.value).modal('hide')
  }
}
const close = () => {
  // const modalEl = document.getElementById(modalId)
  // const bsModal = bootstrap.Modal.getInstance(modalEl) //bs v5支持，v4不支持
  // if (bsModal) {
  //   bsModal.hide()
  // }
  hideModal()
  emit('close')
}

// 暴露方法给父组件调用
defineExpose({ showModal, hideModal })


</script>