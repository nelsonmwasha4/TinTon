<template>
  <div class="search-page">
    <div class="search-bar">
      <input v-model="keyword" type="text" placeholder="Tafuta..." @input="onSearch" class="search-input" />
      <button class="back-btn" @click="$router.back()">Nyuma</button>
    </div>

    <div v-if="loading" class="empty">Inatafuta...</div>
    <div v-else-if="results.length === 0 && keyword" class="empty">Hakuna matokeo ya "{{ keyword }}"</div>
    <div v-else-if="results.length === 0" class="empty">Andika kitu kutafuta</div>

    <div v-else class="list">
      <div v-for="item in results" :key="item.id" class="item" @click="goDetail(item)">
        <div class="title">{{ item.title }}</div>
        <div class="desc">{{ item.desc }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const keyword = ref('')
const loading = ref(false)
const results = ref([])

const allData = [
  { id: 1, title: 'TinTon', desc: 'App ya kuangalia video' },
  { id: 2, title: 'Video Mpya', desc: 'Video za hivi karibuni' },
  { id: 3, title: 'Wasanii', desc: 'Orodha ya wasanii' }
]

const onSearch = () => {
  if (!keyword.value) {
    results.value = []
    return
  }
  loading.value = true
  setTimeout(() => {
    const k = keyword.value.toLowerCase()
    results.value = allData.filter((x) => x.title.toLowerCase().includes(k) || x.desc.toLowerCase().includes(k))
    loading.value = false
  }, 300)
}

const goDetail = (item) => {
  router.push('/detail/' + item.id)
}
</script>

<style scoped>
.search-page {
  padding: 16px;
}
.search-bar {
  display: flex;
  gap: 10px;
}
.search-input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}
.back-btn {
  padding: 12px 16px;
  border: none;
  background: #f0f0f0;
  border-radius: 8px;
}
.empty {
  text-align: center;
  margin-top: 40px;
  color: #999;
}
.list {
  margin-top: 16px;
}
.item {
  padding: 14px;
  border-bottom: 1px solid #eee;
}
.title {
  font-weight: bold;
}
.desc {
  color: #888;
  font-size: 14px;
}
</style>
