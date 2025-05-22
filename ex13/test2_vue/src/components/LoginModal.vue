<template>
  <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="loginModalLabel">用户登录</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="username" class="form-label">用户名</label>
              <input type="text" class="form-control" id="username" v-model="username" required />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">密码</label>
              <input type="password" class="form-control" id="password" v-model="password" required />
            </div>
            <div  class="mb-3">{{ errorMessage }}</div>
            <div class="modal-footer d-flex justify-content-center">
                <button type="submit" class="btn btn-success me-2">登录</button>
                <button type="button" class="btn btn-secondary " data-dismiss="modal" @click="close">关闭</button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import $ from 'jquery'
import { ref,  defineEmits } from 'vue'


const emit = defineEmits(['login'])

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const handleSubmit = async () => {
  // 清空上一次错误信息
  errorMessage.value = ''

  // 检查输入是否为空
  if (!username.value || !password.value) {
    errorMessage.value='请输入用户名和密码'
    return
  }

  try {
    const response = await fetch('http://127.0.0.1:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: username.value,
        userPwd: password.value
      })
    })

    const data = await response.json()

    if (response.ok) {
      // 登录成功
      console.log(data);
      if(data.code === 200 && data.message=="登录成功"){
        const user = { name: username.value ,token: data.data.token }
        localStorage.setItem('user', JSON.stringify(user))
        errorMessage.value = data.message
        init()
        close()
        emit('login', user)
       }
       else{
         errorMessage.value = data.message
       }
    } else {
      // 登录失败
      errorMessage.value = data.message || '用户名或密码错误'
    }
  } catch (error) {
    console.error('请求失败:', error)
    errorMessage.value = '网络错误，请稍后再试'
  }
}
const init= () => { 
    errorMessage.value = ''
    username.value = ''
    password.value  = ''
}

const close = () => {
  init();
  $('#loginModal').modal('hide')
}
// const handleSubmit = () => {
//   // 登录验证逻辑（可根据实际后端接口替换）

//   if (username.value && password.value) {
//     const user = { name: username.value }
//     localStorage.setItem('user', JSON.stringify(user))
//     $('#loginModal').modal('hide');
//     emit('login', user)
//   } else {
//     alert('请输入用户名和密码')
//   }
// }

</script>