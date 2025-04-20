<template>
  <div class="hello">
    <!-- Interactive Input Area -->
    <div class="interactive">
      <input
        v-model="inputText"
        placeholder="请输入内容"
      />
      <button @click="clearInput">清空</button>
    </div>
    <!-- Real-time Display Area -->
    <div class="display">
    
      <p>{{ inputText }}</p>
    </div>

   
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      inputText: ''
    }
  },
  methods: {
    clearInput() {
      this.inputText = '';
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
/* Styles for the interactive area */
.interactive {
  margin-bottom: 20px;
}
.interactive input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
}
.interactive button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
}
.interactive button:hover {
  background-color: #369f6f;
}
.display h2 {
  margin-bottom: 8px;
}
</style>
