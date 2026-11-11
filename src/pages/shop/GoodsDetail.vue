<template>
  <div class="detail">
    <div class="topbar">
      <span @click="$router.back()">← Nyuma</span>
      <span>Maelezo ya Bidhaa</span>
      <span>⋯</span>
    </div>

    <div class="big-img">{{ product.emoji }}</div>

    <div class="info">
      <h2>{{ product.name }}</h2>
      <div class="price-row">
        <span class="price">TSh {{ product.price.toLocaleString() }}</span>
        <span class="old">TSh {{ (product.price * 1.3).toFixed(0) }}</span>
        <span class="off">-30%</span>
      </div>
      <div class="meta">⭐ {{ product.rating }} • {{ product.sold }} zimeuzwa • {{ product.stock }} zipo dukani</div>

      <div class="section">
        <h3>Maelezo</h3>
        <p>{{ product.desc }}</p>
      </div>

      <div class="section">
        <h3>Chagua Idadi</h3>
        <div class="qty">
          <button @click="qty > 1 && qty--">-</button>
          <span>{{ qty }}</span>
          <button @click="qty++">+</button>
        </div>
      </div>

      <div class="section">
        <h3>Utoaji (Delivery)</h3>
        <p>📦 Dar es Salaam - TSh 5,000 (Siku 1-2)</p>
        <p>📦 Mikoani - TSh 10,000 (Siku 2-4)</p>
        <p>✅ Malipo baada ya kupokea - Cash on Delivery</p>
      </div>
    </div>

    <div class="bottom">
      <button class="cart-btn" @click="addToCart">Weka Kikapuni</button>
      <button class="buy-btn" @click="buyNow">Nunua Sasa</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const qty = ref(1)

const all = [
  { id: 1, name: 'T-Shirt ya TinTon', emoji: '👕', price: 15000, rating: 4.8, sold: 120, stock: 45, desc: 'T-Shirt nzuri sana, kitambaa laini, inafaa kwa kila siku. In
