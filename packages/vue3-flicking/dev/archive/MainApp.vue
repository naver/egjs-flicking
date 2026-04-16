<template>
  <div class="main-app">
    <header class="header">
      <h1>Vue3 Flicking Demo</h1>
      <nav class="navigation">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/basic" class="nav-link">BasicDemo</router-link>
        <router-link to="/reactive" class="nav-link">ReactiveDemo</router-link>
      </nav>
    </header>
    
    <main class="content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
// Composition API setup
</script>

<style scoped>
.main-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #eee;
}

.header h1 {
  margin-bottom: 20px;
  color: #333;
}

.navigation {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.nav-link {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
  font-weight: bold;
}

.nav-link:hover {
  background-color: #0056b3;
}

.nav-link.router-link-active {
  background-color: #28a745;
}

.content {
  min-height: 500px;
}
</style> 