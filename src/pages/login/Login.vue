<template>
  <div class="login-page">
    <div class="login-box">
      <h2>Karibu TinTon</h2>
      <p>Ingia na namba yako ya simu</p>

      <input v-model="phone" type="tel" placeholder="Namba ya simu" class="input" />
      <input v-model="password" type="password" placeholder="Neno la siri" class="input" />

      <button class="login-btn" :disabled="loading" @click="handleLogin">
        {{ loading ? 'Inaingia...' : 'Ingia' }}
      </button>

      <p class="link" @click="$router.push('/login/other')">Njia nyingine ya kuingia</p>

      <div class="agree">
        <input type="checkbox" v-model="isAgree" />
        <span> Nimesoma na nakubali </span>
        <span class="link" @click="$router.push('/service-protocol')">User Agreement</span>
        <span> na </span>
        <span class="link" @click="$router.push('/privacy-policy')">Privacy Policy</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const phone = ref('')
const password = ref('')
const isAgree = ref(true)
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
.input {
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
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
.link {
  color: #1989fa;
  cursor: pointer;
  margin-top: 15px;
}
.agree {
  font-size: 13px;
  margin-top: 20px;
  line-height: 1.6;
}
</style
