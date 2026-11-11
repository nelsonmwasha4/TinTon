<template>
  <div class="follow-page">
    <div class="topbar">
      <span @click="$router.back()">← Nyuma</span>
      <b>{{ userName }}</b>
      <span>⋯</span>
    </div>

    <div class="tabs">
      <span :class="{ active: tab === 'following' }" @click="tab = 'following'">Ninawafuata ({{ following.length }})</span>
      <span :class="{ active: tab === 'followers' }" @click="tab = 'followers'">Wanaonifuata ({{ followers.length }})</span>
    </div>

    <div class="search">
      <input v-model="keyword" placeholder="Tafuta mtu..." />
    </div>

    <div class="list">
      <div v-for="person in filtered" :key="person.id" class="person">
        <div class="avatar">{{ person.emoji }}</div>
        <div class="info">
          <div class="name">{{ person.name }}</div>
          <div class="handle">@{{ person.handle }} • {{ person.followers }} followers</div>
        </div>
        <button :class="{ following: person.isFollowing }" @click="toggleFollow(person)">
          {{ person.isFollowing ? 'Unafuata ✓' : 'Mfuate' }}
        </button>
      </div>
    </div>

    <div v-if="filtered.length === 0" class="empty">Hakuna mtu wa "{{ keyword }}"</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const tab = ref('following')
const keyword = ref('')
const userName = ref('Nelson')

const following = ref([
  { id: 1, name: 'Zawadi Mushi', handle: 'zawadi', followers: '12K', emoji: '👩🏾', isFollowing: true },
  { id: 2, name: 'Baraka Juma', handle: 'baraka', followers: '8.5K', emoji: '👨🏾', isFollowing: true },
  { id: 3, name: 'Neema Peter', handle: 'neema', followers: '25K', emoji: '👩🏾‍🦱', isFollowing: true },
  { id: 4, name: 'Bongo Music', handle: 'bongomusic', followers: '150K', emoji: '🎵', isFollowing: true }
])

const followers = ref([
  { id: 5, name: 'Asha Mwalimu', handle: 'asha', followers: '1.2K', emoji: '👩🏾', isFollowing: false },
  { id: 6, name: 'Kelvin Moshi', handle: 'kelvin', followers: '890', emoji: '👨🏾', isFollowing: true },
  { id: 7, name: 'Fatuma Said', handle: 'fatuma', followers: '3.4K', emoji: '🧕🏾', isFollowing: false },
  { id: 8, name: 'Dar Vibes', handle: 'darvibes', followers: '45K', emoji: '🌴', isFollowing: false }
])

const filtered = computed(() => {
  const list = tab.value === 'following' ? following.value : followers.value
  if (!keyword.value) return list
  return list.filter((p) => p.name.toLowerCase().includes(keyword.value.toLowerCase()))
})

const toggleFollow = (person) => {
  person.isFollowing = !person.isFollowing
}
</script>

<style scoped>
.follow-page {
  background: #fff;
  min-height: 100vh;
}
.topbar {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #eee;
}
.tabs {
  display: flex;
}
.tabs span {
  flex: 1;
  text-align: center;
  padding: 14px 0;
  color: #888;
  font-size: 14px;
}
.tabs span.active {
  color: #000;
  font-weight: bold;
  border-bottom: 2px solid #000;
}
.search {
  padding: 12px 16px;
}
.search input {
  width: 100%;
  padding: 11px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-sizing: border-box;
}
.list {
  padding: 0 16px;
}
.person {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
}
.avatar {
  width: 48px;
  height: 48px;
  background: #f0f0f0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}
.info {
  flex: 1;
}
.name {
  font-weight: bold;
}
.handle {
  color: #888;
  font-size: 13px;
}
.person button {
  padding: 8px 14px;
  border: none;
  border-radius: 20px;
  background: #ff0050;
  color: white;
  font-size: 13px;
}
.person button.following {
  background: #f0f0f0;
  color: #333;
}
.empty {
  text-align: center;
  color: #999;
  margin-top: 40px;
}
</style>
