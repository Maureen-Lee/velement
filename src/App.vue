<template>
  <nav>
    <div class="nav-box">
      <img src="./assets/logo.svg" alt="logo"  width="200px" height="70px"/>
      <div class="nav-list">
         <div><router-link to="/">组件</router-link></div>
        <div><router-link to="/about">关于</router-link></div>
      </div>
    </div>
   
  </nav>
  <router-view/>
</template>


<script setup lang="ts">

import {inject } from 'vue'
console.log("inject('test')",inject('test'))
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}
.nav-box{
  display: flex;
  position: sticky;
  top: 0;
  justify-content: space-between;
  border-bottom: 1px solid #dcdfe6;
  height: 80px;
}

.nav-list{
  display: flex;
  gap: 20px;
  align-items: center;
}
.nav-list div{
  padding: 10px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
