<template>
  <div class="home">
    <div class="topbar">
      <h2>TinTon</h2>
      <div class="top-actions">
        <span @click="goSearch">🔍 Tafuta</span>
      </div>
    </div>

    <div class="tabs">
      <span :class="{ active: tab === 'foryou' }" @click="tab = 'foryou'">Kwa Ajili Yako</span>
      <span :class="{ active: tab === 'live' }" @click="tab = 'live'">Live</span>
      <span :class="{ active: tab === 'music' }" @click="tab = 'music'">Muziki</span>
    </div>

    <div v-if="tab === 'foryou'" class="feed">
      <div v-for="video in videos" :key="video.id" class="video-card">
        <div class="video-thumb">
          <span class="play">▶</span>
          <span class="duration">{{ video.duration }}</span>
        </div>
        <div class="video-info">
          <div class="title">{{ video.title }}</div>
          <div class="author">@{{ video.author }} • {{ video.views }} views</div>
          <div class="actions">
            <span>❤️ {{ video.likes }}</span>
            <span>💬 {{ video.comments }}</span>
            <span @click="shareVideo(video)">↗ Shiriki</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="tab === 'live'" class="empty">
      <h3>Live Sasa</h3>
      <p>Hakuna live kwa sasa. Rudi baadaye.</p>
    </div>

    <div v-if="tab === 'music'" class="empty">
      <h3>Muziki</h3>
      <p>Nyimbo zinazotrend hivi karibuni zitakuja hapa.</p>
    </div>

    <div class="bottom-nav">
      <span class="active">🏠 Nyumbani</span>
      <span @click="goSearch">🔍 Tafuta</span>
      <span @click="goPublish">＋ Chapisha</span>
      <span>💬 Ujumbe</span>
      <span>👤 Mimi</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const tab = ref('foryou')

const videos = ref([
  { id: 1, title: 'Video kali ya leo - usikose kuangalia', author: 'nelson', views: '12.5K', likes: '1.2K', comments: 89, duration: '0:32' },
  { id: 2, title: 'Maisha ya Dar es Salaam', author: 'tanzania', views: '8.1K', likes: 940, comments: 45, duration: '0:48' },
  { id: 3, title: 'Muziki mpya wa Bongo Flava', author: 'bongo', views: '25K', likes: '3.1K', comments: 210, duration: '1:05' },
  { id: 4, title: 'Jinsi ya kupika Pilau', author: 'mama_ntilie', views: '5.2K', likes: 620, comments: 32, duration: '2:10' }
])

const goSearch = () => {
  router.push('/search')
}

const goPublish = () => {
  router.push('/publish')
}

const shareVideo = (video) => {
  alert('Unashiriki: ' + video.title)
}
</script>

<style scoped>
.home {
  background: #000;
  color: white;
  min-height: 100vh;
  padding-bottom: 70px;
}
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}
.topbar h2 {
  margin: 0;
  font-size: 24px;
}
.top-actions {
  font-size: 14px;
}
.tabs {
  display: flex;
  gap: 20px;
  padding: 0 16px 12px;
  border-bottom: 1px solid #222;
}
.tabs span {
  color: #888;
  cursor: pointer;
}
.tabs span.active {
  color: white;
  font-weight: bold;
  border-bottom: 2px solid white;
  padding-bottom: 4px;
}
.feed {
  padding: 12px;
}
.video-card {
  background: #111;
  border-radius: 12px;
  margin-bottom: 16px;
  overflow: hidden;
}
.video-thumb {
  height: 220px;
  background: linear-gradient(135deg, #ff0050, #00f2ea);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.play {
  font-size: 48px;
}
.duration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.6);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}
.video-info {
  padding: 12px;
}
.title {
  font-weight: bold;
  margin-bottom: 4px;
}
.author {
  color: #aaa;
  font-size: 13px;
  margin-bottom: 10px;
}
.actions {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #ccc;
}
.empty {
  text-align: center;
  padding: 40px 20px;
  color: #aaa;
}
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000;
  border-top: 1px solid #222;
  display: flex;
  justify-content: space-around;
  padding: 12px 0;
  font-size: 13px;
}
.bottom-nav span {
  color: #888;
}
.bottom-nav span.active {
  color: white;
  font-weight: bold;
}
</style
