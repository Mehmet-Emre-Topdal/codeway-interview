<template>
  <div class="not-found-container">
    <img src="@/assets/codeway.png" alt="Codeway Logo" class="logo" />
    <h1 class="not-found-title">404 - Page Not Found</h1>
    <p class="not-found-message">Sorry, the page you are looking for does not exist.</p>
    <button class="go-back-button" @click="handleGoBack">Go Back</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

/**
 * Geri gitme işlemi, BURAYI TEST ETMELİYİM
 */

const handleGoBack = () => {
  router.push('/');
};
</script>

<style scoped>
.not-found-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1e1e2f;
  color: white;
  text-align: center;
}

.logo {
  width: 120px;
  margin-bottom: 30px;
}

.not-found-title {
  font-size: 36px;
  margin-bottom: 20px;
}

.not-found-message {
  font-size: 18px;
  margin-bottom: 30px;
}

.go-back-button {
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  background-image: linear-gradient(to bottom, #3b82f6, #0c66e0);
  color: white;
  transition: background-color 0.3s;
}

.go-back-button:hover {
  background-image: linear-gradient(to bottom, #0c66e0, #3b82f6);
}
</style>