<template>
  <div class="shop">
    <div class="topbar">
      <h2>TinTon Shop</h2>
      <span @click="goCart">🛒 {{ cart.length }}</span>
    </div>

    <div class="search-box">
      <input v-model="keyword" placeholder="Tafuta bidhaa..." class="search-input" />
    </div>

    <div class="cats">
      <span :class="{ active: cat === 'zote' }" @click="cat = 'zote'">Zote</span>
      <span :class="{ active: cat === 'nguo' }" @click="cat = 'nguo'">Nguo</span>
      <span :class="{ active: cat === 'simu' }" @click="cat = 'simu'">Simu</span>
      <span :class="{ active: cat === 'chakula' }" @click="cat = 'chakula'">Chakula</span>
      <span :class="{ active: cat === 'urembo' }" @click="cat = 'urembo'">Urembo</span>
    </div>

    <div class="grid">
      <div v-for="item in filtered" :key="item.id" class="card" @click="goDetail(item)">
        <div class="img">{{ item.emoji }}</div>
        <div class="name">{{ item.name }}</div>
        <div class="price">TSh {{ item.price.toLocaleString() }}</div>
        <div class="meta">⭐ {{ item.rating }} • {{ item.sold }} zimeuzwa</div>
        <button class="add-btn" @click.stop="addToCart(item)">Weka Kikapuni</button>
      </div>
    </div>

    <div v-if="filtered.length === 0" class="empty">Hakuna bidhaa ya "{{ keyword }}"</div>

    <div v-if="cart.length > 0" class="cart-bar">
      <span>{{ cart.length }} bidhaa • TSh {{ total.toLocaleString() }}</span>
      <button @click="checkout">Nunua Sasa</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const keyword = ref('')
const cat = ref('zote')
const cart = ref([])

const products = ref([
  { id: 1, name: 'T-Shirt ya TinTon', emoji: '👕', price: 15000, rating: 4.8, sold: 120, cat: 'nguo' },
  { id: 2, name: 'Kofia Kali', emoji: '🧢', price: 12000, rating: 4.6, sold: 85, cat: 'nguo' },
  { id: 3, name: 'Earbuds - Sauti Kali', emoji: '🎧', price: 45000, rating: 4.9, sold: 210, cat: 'simu' },
  { id: 4, name: 'Kava ya Simu', emoji: '📱', price: 8000, rating: 4.5, sold: 340, cat: 'simu' },
  { id: 5, name: 'Pilau Mix - 1kg', emoji: '🍚', price: 9000, rating: 4.7, sold: 150, cat: 'chakula' },
  { id: 6, name: 'Lipstick - Rangi Kali', emoji: '💄', price: 18000, rating: 4.8, sold: 95, cat: 'urembo' }
])

const filtered = computed(() => {
  return products.value.filter((p) => {
    const matchCat = cat.value === 'zote' || p.cat === cat.value
    const matchKey = p.name.toLowerCase().includes(keyword.value.toLowerCase())
    return matchCat && matchKey
  })
})

const total = computed(() => cart.value.reduce((s, x) => s + x.price, 0))

const addToCart = (item) => {
  cart.value.push(item)
  alert(item.name + ' imeongezwa kikapuni!')
}

const goDetail = (item) => {
  router.push('/shop/detail/' + item.id)
}

const goCart = () => {
  if (cart.value.length === 0) alert('Kikapu kiko tupu')
  else alert('Una bidhaa ' + cart.value.length + ' - Jumla TSh ' + total.value.toLocaleString())
}

const checkout = () => {
  alert('Asante! Oda yako ya TSh ' + total.value.toLocaleString() + ' imepokelewa. Tutakupigia simu.')
  cart.value = []
}
</script>

<style scoped>
.shop {
  padding: 16px;
  padding-bottom: 80px;
  background: #f8f8f8;
  min-height: 100vh;
}
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.topbar h2 {
  margin: 0;
}
.search-box {
  margin: 14px 0;
}
.search-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 15px;
  box-sizing: border-box;
}
.cats {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  margin-bottom: 14px;
}
.cats span {
  background: white;
  padding: 8px 14px;
  border-radius: 20px;
  white-space: nowrap;
  font-size: 13px;
  border: 1px solid #eee;
}
.cats span.active {
  background: #ff0050;
  color: white;
  border: none;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.card {
  background: white;
  border-radius: 12px;
  padding: 12px;
  text-align: center;
}
.img {
  font-size: 48px;
  margin: 10px 0;
}
.name {
  font-weight: bold;
  font-size: 14px;
}
.price {
  color: #ff0050;
  font-weight: bold;
  margin: 6px 0;
}
.meta {
  color: #888;
  font-size: 12px;
  margin-bottom: 10px;
}
.add-btn {
  width: 100%;
  padding: 9px;
  background: #000;
  color: white;
  border: none;
  border-radius: 8px;
}
.empty {
  text-align: center;
  color: #999;
  margin-top: 40px;
}
.cart-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000;
  color: white;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cart-bar button {
  background: #ff0050;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
}
</style>
<template>
