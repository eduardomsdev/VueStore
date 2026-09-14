<script setup>
import { ref, computed } from 'vue'
import Header from './components/Header.vue'
import SearchBar from './components/SearchBar.vue'
import CategoryFilter from './components/CategoryFilter.vue'
import ProductList from './components/ProductList.vue'
import ProductModal from './components/ProductModal.vue'
import { products } from './data/products.js'

const categories = ['Todos', 'Eletrônicos', 'Computadores', 'Acessórios', 'Smartphones']

// Estado reativo: termo de busca, categoria selecionada e produto aberto no modal.
const searchQuery = ref('')
const selectedCategory = ref('Todos')
const selectedProduct = ref(null)

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

function openDetails(product) {
  selectedProduct.value = product
}

function closeDetails() {
  selectedProduct.value = null
}
</script>

<template>
  <div class="app">
    <Header />

    <main class="app__main">
      <div class="app__controls">
        <SearchBar v-model="searchQuery" />
        <CategoryFilter
          :categories="categories"
          :selected="selectedCategory"
          @select="selectedCategory = $event"
        />
      </div>

      <ProductList :products="filteredProducts" @view-details="openDetails" />
    </main>

    <ProductModal v-if="selectedProduct" :product="selectedProduct" @close="closeDetails" />
  </div>
</template>
