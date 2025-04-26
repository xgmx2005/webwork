<template>
  <div class="panel panel-default student-manager">
    <div class="panel-heading">
      <h3 class="panel-title">学生信息管理系统</h3>
    </div>
    <div class="panel-body">
      <!-- 表单：姓名 / 年龄 / 性别 / 添加 -->
      <form class="form-inline" @submit.prevent="addStudent">
        <div class="form-group" style="margin-right:8px;">
          <input
            type="text"
            class="form-control"
            v-model="name"
            placeholder="姓名"
          />
        </div>
        <div class="form-group" style="margin-right:8px;">
          <input
            type="number"
            class="form-control"
            v-model.number="age"
            min="0"
            placeholder="年龄"
            style="width:80px;"
          />
        </div>
        <div class="form-group" style="margin-right:8px;">
          <label class="radio-inline">
            <input type="radio" value="male" v-model="gender" /> 男
          </label>
          <label class="radio-inline">
            <input type="radio" value="female" v-model="gender" /> 女
          </label>
        </div>
        <button type="submit" class="btn btn-primary">添加学生</button>
      </form>

      <!-- 列表 -->
      <ul class="list-group" style="margin-top:15px;">
        <li
          v-for="(s, i) in students"
          :key="i"
          class="list-group-item clearfix"
        >
          <span>{{ s.name }} - {{ s.age }} 岁 - {{ s.gender }}</span>
          <button
            type="button"
            class="btn btn-danger btn-xs pull-right"
            @click="removeStudent(i)"
          >
            删除
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentManager',
  data() {
    return {
      name: '',
      age: 18,
      gender: 'male',
      students: []
    }
  },
  methods: {
    addStudent() {
      if (!this.name.trim()) return
      this.students.push({
        name: this.name,
        age: this.age,
        gender: this.gender
      })
      this.name = ''
    },
    removeStudent(index) {
      this.students.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.student-manager {
  margin-bottom: 30px;
}
</style>
