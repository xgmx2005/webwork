<!-- src/components/StudentManager.vue -->
<template>
  <div class="student-manager">
    <h2>学生信息管理系统</h2>
    <div class="form">
      <input v-model="name" placeholder="姓名" />
      <input v-model.number="age" type="number" min="0" />
      <label><input type="radio" value="male" v-model="gender" /> 男</label>
      <label><input type="radio" value="female" v-model="gender" /> 女</label>
      <button @click="addStudent">添加学生</button>
    </div>
    <ul class="student-list">
      <li v-for="(s, i) in students" :key="i">
        {{ s.name }} - {{ s.age }} 岁 - {{ s.gender }}
        <button @click="removeStudent(i)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const age = ref(18)
const gender = ref('male')
const students = ref([])

function addStudent() {
  if (!name.value.trim()) return
  students.value.push({
    name: name.value,
    age: age.value,
    gender: gender.value
  })
  name.value = ''    // 添加完清空姓名
}

function removeStudent(index) {
  students.value.splice(index, 1)
}
</script>

<style scoped>
.student-manager {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 4px;
}
.form {
  display: flex;
  align-items: center;
  gap: 8px;
}
.student-list {
  margin-top: 16px;
}
.student-list li {
  margin-bottom: 6px;
}
button {
  margin-left: 8px;
}
</style>
