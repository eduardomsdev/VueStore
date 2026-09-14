<script setup>
import { ref, computed } from 'vue'
import Header from './components/Header.vue'
import SearchBar from './components/SearchBar.vue'
import CategoryFilter from './components/CategoryFilter.vue'
import ProductList from './components/ProductList.vue'
import ProductModal from './components/ProductModal.vue'
import CartDrawer from './components/CartDrawer.vue'
import CheckoutPage from './components/CheckoutPage.vue'
import { products } from './data/products.js'

const categories = ['Todos', 'Eletrônicos', 'Computadores', 'Acessórios', 'Smartphones']

// Estado reativo: busca, categoria, produto aberto no modal.
const searchQuery = ref('')
const selectedCategory = ref('Todos')
const selectedProduct = ref(null)

// Estado do carrinho e da navegação (loja ou checkout).
const cart = ref([])
const isCartOpen = ref(false)
const currentView = ref('store') // 'store' | 'checkout'

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
  currentView.value = 'checkout'
}

function finishOrder() {
  cart.value = []
  currentView.value = 'store'
}
</script>

<template>
  <div class="app">
    <Header :cart-count="cartCount" @open-cart="isCartOpen = true" />

    <!-- v-if alterna entre a loja e a página de checkout -->
    <main v-if="currentView === 'store'" class="app__main">
      <div class="app__controls">
        <SearchBar v-model="searchQuery" />
        <CategoryFilter
          :categories="categories"
          :selected="selectedCategory"
          @select="selectedCategory = $event"
        />
      </div>

      <ProductList
        :products="filteredProducts"
        @view-details="openDetails"
        @add-to-cart="addToCart"
      />
    </main>

    <CheckoutPage
      v-else
      :items="cart"
      :total="cartTotal"
      @back="currentView = 'store'"
      @finish="finishOrder"
    />

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
