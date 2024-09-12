<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>

</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: #1e1e2f;
  margin: 0;
  padding: 0;
  color: white;
  text-align: center;
  width: 100%;
  /* Yatay olarak tam genişlik */
  height: 100%;
}

input{
  width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #2e2e3d;
    background-color: #2e2e3d;
    color: white;

    min-width: 100%;
    max-width: 100%;
}

.router-view {
  width: 100%;
  padding: 20px;
}

.edit-button,
.delete-button,
.cancel-button,
.save-button {
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    color: white;
}

.edit-button {
    background-image: linear-gradient(to bottom, #3b82f6, #0c66e0);
    margin-right: 8px;
}

.delete-button {
    background-image: linear-gradient(to bottom, #e57373, #d32f2f);
}

.save-button {
    background-image: linear-gradient(to bottom, #34d399, #059669);
}

.cancel-button {
    background-image: linear-gradient(to bottom, #9e9e9e, #616161);
    margin-left: 8px;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
