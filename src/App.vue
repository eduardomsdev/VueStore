<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from './components/Header.vue'
import ProductModal from './components/ProductModal.vue'
import CartDrawer from './components/CartDrawer.vue'
import { products } from './data/products.js'

const route = useRoute()
const router = useRouter()

const categories = ['Todos', 'Eletrônicos', 'Computadores', 'Acessórios', 'Smartphones']

// Estado reativo: busca, categoria, produto aberto no modal.
const searchQuery = ref('')
const selectedCategory = ref('Todos')
const selectedProduct = ref(null)

// Estado do carrinho. A navegação entre loja e checkout agora é feita pelo vue-router.
const cart = ref([])
const isCartOpen = ref(false)

// Computed property: recalcula a lista exibida sempre que a busca
// ou a categoria selecionada mudam.
const filteredProducts = computed(() => {
  return products.filter((product) => {
    const matchesCategory =
      selectedCategory.value === 'Todos' || product.category === selectedCategory.value
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})

// Computed properties do carrinho: quantidade total e valor total.
const cartCount = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0))
const cartTotal = computed(() => cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0))

// Props repassadas para a view atual (Home ou Checkout) via <router-view>.
const viewProps = computed(() => {
  if (route.name === 'checkout') {
    return { items: cart.value, total: cartTotal.value }
  }
  return {
    categories,
    selectedCategory: selectedCategory.value,
    searchQuery: searchQuery.value,
    filteredProducts: filteredProducts.value
  }
})

function openDetails(product) {
  selectedProduct.value = product
}

function closeDetails() {
  selectedProduct.value = null
}

// Adiciona um produto ao carrinho, ou aumenta a quantidade se já existir.
function addToCart(product) {
  const existingItem = cart.value.find((item) => item.id === product.id)
  if (existingItem) {
    existingItem.quantity++
  } else {
    cart.value.push({ ...product, quantity: 1 })
  }
  selectedProduct.value = null
  isCartOpen.value = true
}

function increaseQuantity(item) {
  item.quantity++
}

function decreaseQuantity(item) {
  if (item.quantity > 1) {
    item.quantity--
  } else {
    removeFromCart(item)
  }
}

function removeFromCart(item) {
  cart.value = cart.value.filter((cartItem) => cartItem.id !== item.id)
}

function goToCheckout() {
  isCartOpen.value = false
  router.push({ name: 'checkout' })
}

function finishOrder() {
  cart.value = []
}
</script>

<template>
  <div class="app">
    <Header :cart-count="cartCount" @open-cart="isCartOpen = true" />

    <!-- router-view alterna entre a loja (/) e o checkout (/checkout) -->
    <RouterView v-slot="{ Component }">
      <component
        :is="Component"
        v-bind="viewProps"
        @update:search-query="searchQuery = $event"
        @select-category="selectedCategory = $event"
        @view-details="openDetails"
        @add-to-cart="addToCart"
        @finish="finishOrder"
      />
    </RouterView>

    <ProductModal
      v-if="selectedProduct"
      :product="selectedProduct"
      @close="closeDetails"
      @add-to-cart="addToCart"
    />

    <CartDrawer
      v-if="isCartOpen"
      :items="cart"
      :total="cartTotal"
      @close="isCartOpen = false"
      @increase="increaseQuantity"
      @decrease="decreaseQuantity"
      @remove="removeFromCart"
      @checkout="goToCheckout"
    />
  </div>
</template>
