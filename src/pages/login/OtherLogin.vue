<template>
  <div class="login-page">
    <div class="login-box">
      <h2>Karibu TinTon</h2>
      <p>Ingia ili kuendelea</p>

      <div class="agree">
        <input type="checkbox" v-model="isAgree" />
        <span>I have read and agree to the </span>
        <span class="link" @click="$router.push('/service-protocol')">User Agreement</span>
        <span> and </span>
        <span class="link" @click="$router.push('/privacy-policy')">Privacy Policy</span>
        <span>, and log in to use TinTon</span>
      </div>

      <button class="login-btn" :disabled="!isAgree || loading" @click="handleLogin">
        {{ loading ? 'Inaingia...' : 'Ingia' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAgree = ref(false)
const loading = ref(false)

const handleLogin = () => {
  if (!isAgree.value) return
  loading.value = true
  setTimeout(() => {
    loading.value = false
    router.push('/')
  }, 800)
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}
.login-box {
  width: 100%;
  max-width: 380px;
  text-align: center;
}
.agree {
  font-size: 14px;
  margin: 20px 0;
  line-height: 1.6;
}
.link {
  color: #1989fa;
  cursor: pointer;
}
.login-btn {
  width: 100%;
  padding: 12px;
  background: #1989fa;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
}
.login-btn:disabled {
  opacity: 0.5;
}
</style>
