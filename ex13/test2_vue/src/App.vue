<template>
  <div id="app">
    <!-- 顶部标题 -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4 fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">植物基底饮食屋</a>
    <div class="collapse navbar-collapse justify-content-end">
      <ul class="navbar-nav">
        <!-- <li class="nav-item">
          <a class="nav-link" href="/">首页</a>
        </li> -->
        <li class="nav-item">
           <!-- 用户信息显示 -->
          <a class="nav-link text-white" v-if="user"  @click="logout">
           欢迎你，{{ user.name }}
          </a>
          <a v-else class="nav-link" data-toggle="modal" :data-target="`#${loginModalId}`">登录</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

    <!-- 卡片区域 -->
    <section class="container my-5 pt-5">
      <div class="row">
        <FoodCard v-for="food in foods" :key="food.id" :food="food"  :isLogined="isLogined" @details="showDetails" />
      </div>
    </section>

    <!-- 食物模态框 -->
    <FoodDetailsModal 
      ref="modalInstance"
      :food="selectedFood" 
      modal-id="foodDetailsModal" 
      :is-inert="!isModalVisible"
      :info-message="infoMessage" 
      :info-style="infoStyle"

       @buy="buyFood" 
       @close="onModalClose" 
    />

   <!-- 登录模态框 -->
    <LoginModal @login="handleLogin" :loginModalId="loginModalId" />
    <!-- 版权信息 -->
    <footer class="bg-dark text-white text-center py-3 mt-5">
      <p>&copy; 2025 植物基底饮食屋. 保留所有权利.</p>
    </footer>
  </div>
</template>

<script setup>
 
import { ref, onMounted } from 'vue'
import FoodCard from './components/FoodCard.vue' //引入食物卡片
import FoodDetailsModal from './components/FoodDetailsModal.vue' //引入食物详情模态框
import LoginModal from './components/LoginModal.vue'//引入登录模态框

import 'bootstrap/dist/css/bootstrap.min.css' // 引入 Bootstrap CSS
import * as bootstrap from 'bootstrap' // 引入 Bootstrap

// 挂载到全局方便访问（可选）
window.bootstrap = bootstrap; 

// 获取或初始化 localStorage 中的购买记录
let count = ref(1); // 购买次数
let infoStyle = ref('green');   // 购买信息样式
// localStorage.clear();  //每次刷新页面清空localStorage

// 响应式数据定义
const foods = ref([]); // 食物列表
const selectedFood = ref({}); // 选中的食物
const infoMessage = ref(''); // 购买信息
const isModalVisible = ref(false); // 模态框可见性
const modalInstance = ref(null); // 模态框实例
// 登录相关
const loginModalId = ref('loginModal') // 登录模态框ID
const isLogined = ref(false) // 是否已登录
const user = ref(null) // 用户信息  
// 打开模态框显示详情
const showDetails = (food) => {
  // console.log(food);
  selectedFood.value = { ...food }
  isModalVisible.value = true
  infoMessage.value = ""

  // 手动获取模态框元素并显示
  modalInstance.value.showModal();
  
}

// 模态框关闭时更新状态
const onModalClose = () => {
  isModalVisible.value = false;

}


// 从服务器获取食物数据
async function fetchFoods() {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/foods'); //json地址可换
    const data = await response.json();
    // 为每个食物对象添加 id 属性
    foods.value = data.data.map((food, index) => ({
      ...food,
      id: index + 1, // 假设 id 从 1 开始递增
      image: require('@/assets/' + food.foodImage)
    }));
  } catch (error) {
    console.error('请求失败:', error);
  }
}

// 页面加载时获取数据
onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
    isLogined.value = true
  }
  fetchFoods();
})

// 登录成功回调
const handleLogin = () => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
    isLogined.value = true
  }
}

// 登出逻辑
const logout = () => {
  localStorage.removeItem('user');
  user.value = null;
  isLogined.value = false;
}

// 购买逻辑
const buyFood = () => {
  if (selectedFood.value.stock > 0) {
    selectedFood.value.stock--;
    // 添加新购买项
    let purchases = [];
    purchases.push({
      name: selectedFood.value.foodName,
      quantity: 1,
      price: selectedFood.value.price,
      timestamp: new Date().toLocaleString()
    });

    // 更新 localStorage
    localStorage.setItem(`order${count.value}`, JSON.stringify(purchases));
    count.value++;
    infoStyle.value = 'green';
    infoMessage.value = '购买成功！';
  } else {
    infoStyle.value = 'red';
    infoMessage.value = '该商品已售磬！';
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}

.red {
  color: red;
}

.green {
  color: green;
}
</style>
