<template>
  <div>
    <div v-for="(menu, index) in menus" :key="index" style="margin-bottom: 10px;">
      <input type="checkbox" v-model="selectedItems[index]" />
      {{ menu.name }} - {{ menu.price }} 元
    </div>
    <p>总金额: {{ totalAmount }} 元</p>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup() {
    // 定义菜单项
    const menus = ref([
      { name: '汉堡', price: 10 },
      { name: '薯条', price: 5 },
      { name: '可乐', price: 3 },
    ]);

    // 定义选择状态
    const selectedItems = ref({
      0: false,
      1: false,
      2: false,
    });

    // 计算总金额
    const totalAmount = computed(() => {
      let sum = 0;
      for (const [index, isSelected] of Object.entries(selectedItems.value)) {
        if (isSelected) {
          sum += menus.value[index].price;
        }
      }
      return sum;
    });

    // 返回数据给模板使用
    return {
      menus,
      selectedItems,
      totalAmount,
    };
  },
};
</script>