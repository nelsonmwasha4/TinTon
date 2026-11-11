<template>
  <div class="share-overlay" v-if="visible" @click="close">
    <div class="share-box" @click.stop>
      <h3>Shiriki</h3>
      <p class="share-text">{{ shareText }}</p>

      <div class="share-actions">
        <button class="share-btn" @click="copyLink">Nakili Link</button>
        <button class="share-btn primary" @click="shareWhatsApp">WhatsApp</button>
      </div>

      <p v-if="copied" class="copied">Link imenakiliwa!</p>
      <button class="close-btn" @click="close">Funga</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  shareText: {
    type: String,
    default: 'Angalia hii kwenye TinTon!'
  }
})

const emit = defineEmits(['update:visible', 'close'])
const copied = ref(false)

const close = () => {
  emit('update:visible', false)
  emit('close')
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (e) {
    copied.value = true
  }
}

const shareWhatsApp = () => {
  const text = encodeURIComponent(props.shareText + ' ' + window.location.href)
  window.open('https://wa.me/?text=' + text, '_blank')
}
</script>

<style scoped>
.share-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 999;
}
.share-box {
  width: 100%;
  background: white;
  border-radius: 16px 16px 0 0;
  padding: 20px;
  text-align: center;
}
.share-text {
  color: #666;
  margin: 10px 0 20px;
}
.share-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}
.share-btn {
  padding: 12px 20px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 8px;
}
.share-btn.primary {
  background: #25d366;
  color: white;
  border: none;
}
.copied {
  color: green;
  margin-top: 10px;
}
.close-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background: #f0f0f0;
  border: none;
  border-radius: 8px;
}
</style>
