<template>
  <header class="header">
    <img src="@/assets/codeway.png" alt="Logo" class="logo" />
    <div class="menu-container">
      <div class="user-icon" @click="toggleMenu">
        <font-awesome-icon :icon="['fas', 'user']" style="color: #ffffff;" />
        <span class="arrow-down">&#9662;</span>
      </div>
      
      <div v-if="isMenuOpen" class="dropdown-menu">
        <button @click="logout">Logout</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { signOut } from '@/api/authService';



const isMenuOpen = ref(false);
const router = useRouter();

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const logout = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No token found');

    await signOut(token); 

    localStorage.removeItem('authToken'); 
    router.push('/login'); 
  } catch (error) {
    console.error(error);
  }
};
</script>




<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #1e1e2f;
  color: white;
}

.logo {
  width: 50px;
}

.menu-container {
  position: relative;
}

.user-icon {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.user-icon-img {
  width: 24px;
  height: 24px;
}

.arrow-down {
  margin-left: 8px;
  font-size: 20px;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  background-color: #2e2e3d;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  margin-top: 8px;
}

.dropdown-menu button {
  padding: 10px 20px;
  width: 100%;
  background-color: transparent;
  color: white;
  border: none;
  text-align: left;
  cursor: pointer;
  border-radius: 8px;
}

.dropdown-menu button:hover {
  background-color: #3b3b4d;
}
</style>
