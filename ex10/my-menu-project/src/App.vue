<template>
  <div id="app">
    <!-- ====== Header：Bootstrap Navbar ====== -->
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <!-- 折叠菜单和品牌 -->
        <div class="navbar-header">
          <button
            type="button"
            class="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar-collapse-target"
            aria-expanded="false"
          >
            <span class="sr-only">切换导航</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">学生管理系统</a>
        </div>
        <!-- 导航菜单项 -->
        <div class="collapse navbar-collapse" id="navbar-collapse-target">
          <ul class="nav navbar-nav navbar-right">
            <li>
              <a href="#" @click.prevent="toggleLogin">
                {{ isLogged ? '个人中心' : '登录' }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- ====== 主体：登录后才显示学生管理 ====== -->
    <div class="container" v-if="isLogged" style="margin-top:20px;">
      <StudentManager />
    </div>
  </div>
</template>

<script>
import StudentManager from './components/StudentManager.vue'

export default {
  name: 'App',
  components: { StudentManager },
  data() {
    return {
      isLogged: false
    }
  },
  methods: {
    toggleLogin() {
      this.isLogged = !this.isLogged
    }
  }
}
</script>

<style>
/* 你也可以按需加全局样式 */
</style>
