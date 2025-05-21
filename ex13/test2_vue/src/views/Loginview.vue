<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">用户登录</h2>
    <div class="form-group">
      <label>用户名：</label>
      <input v-model="userName" class="form-control" placeholder="请输入用户名" />
    </div>
    <div class="form-group mt-3">
      <label>密码：</label>
      <input v-model="userPwd" type="password" class="form-control" placeholder="请输入密码" />
    </div>
    <button @click="login" class="btn btn-primary mt-4 w-100">登录</button>
    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const userName = ref('')
const userPwd = ref('')
const error = ref('')
const router = useRouter()

const login = async () => {
  try {
    const res = await axios.post('http://127.0.0.1:5000/api/login', {
      userName: userName.value,
      userPwd: userPwd.value
    })
    const token = res.data.data.token
    localStorage.setItem('token', token)
    router.push('/foods')
  } catch (err) {
    error.value = err.response?.data?.message || '登录失败'
  }
}
</script>
