<template>
  <div class="login-container">
    <img src="@/assets/codeway.png" alt="Codeway Logo" class="logo" />
    <form class="login-form" @submit.prevent="handleSubmit" novalidate>
      <h2 class="login-title">Please sign in</h2>
      <div class="input-group">
        <input
          type="email"
          v-model="email"
          placeholder="E-mail address"

        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
        />
        <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
        <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
        <p v-if="errors.general" class="error-message">{{ errors.general }}</p>
      </div>
      <button type="submit" class="login-button" :disabled="loading">
        <span v-if="loading" class="spinner"></span>
        <span v-else>Sign in</span>
      </button>
      
    </form>
    <footer class="login-footer">Codeway © 2021</footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signIn } from '@/api/authService';

const email = ref('testuser@example.com');
const password = ref('testpassword');
const loading = ref(false);
const errors = ref({
  email: '',
  password: '',
  general: '',
});
const router = useRouter(); // Vue Router'ı kullanmak için

const validateEmail = () => {
  if (!email.value) {
    errors.value.email = 'E-mail is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = 'Please enter a valid e-mail address.';
  } else {
    errors.value.email = '';
  }
};

const validatePassword = () => {
  if (!password.value) {
    errors.value.password = 'Password is required.';
  } else {
    errors.value.password = '';
  }
};

const handleSubmit = async () => {
  validateEmail();
  validatePassword();

  if (!errors.value.email && !errors.value.password) {
    try {
      loading.value = true;
      errors.value.general = '';

      const token = await signIn(email.value, password.value); 

      localStorage.setItem('authToken', token);

      const redirectPath = router.currentRoute.value.query.redirect || '/admin';
      router.push(redirectPath); 

    } catch (error) {
      
        errors.value.general = error.response.data.message || 'An unexpected error occurred.';

    } finally {
      loading.value = false;
    }
  }
};

</script>
<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px; /* Kenarlarda biraz boşluk bırakmak için */
}

.logo {
  width: 120px;
  margin-bottom: 30px;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1e1e2f;
  padding: 40px;
  border-radius: 10px;
  width: 100%; /* Mobilde tam genişlik kaplasın */
  max-width: 320px; /* Daha büyük ekranlarda maksimum genişlik */
}

.login-title {
  margin-bottom: 20px;
  color: #8e8ea1;
  font-size: 20px;
  font-weight: 500;
}

.input-group {
  width: 100%;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #2e2e3d;
  border-radius: 0;
  background-color: #2e2e3d;
  color: white;
  outline: none;
  box-sizing: border-box;
}

.input-group input:first-child {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.input-group input:last-child {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.input-group input:focus {
  border-color: #f72585;
}

.input-error {
  border-color: #e57373;
}

.error-message {
  color: #e57373;
  font-size: 12px;
}

.login-button {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  background-image: linear-gradient(to bottom, #3b82f6, #0c66e0);
  color: white;
  transition: background-color 0.3s;
  box-sizing: border-box;
  margin-top: 10px;
  position: relative;
}

.login-button:disabled {
  background-color: #6b7280;
  cursor: not-allowed;
}

.spinner {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 1s linear infinite;
  display: inline-block;
  vertical-align: middle;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.login-footer {
  margin-top: 20px;
  color: #9aa0ac;
  font-size: 14px;
}

/* Mobil ekranlar için özel stil */
@media (max-width: 600px) {
  .login-container {
    padding: 10px; /* Mobil cihazlar için padding azaltıldı */
  }

  .login-form {
    padding: 20px; /* Mobil cihazlar için padding azaltıldı */
  }

  .logo {
    width: 100px; /* Mobil cihazlar için logo boyutu küçültüldü */
  }
}
</style>