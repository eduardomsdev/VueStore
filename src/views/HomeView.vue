<script setup>
import { ref, onMounted } from 'vue'
import SearchBar from '../components/SearchBar.vue'
import CategoryFilter from '../components/CategoryFilter.vue'
import ProductList from '../components/ProductList.vue'

defineProps({
  categories: {
    type: Array,
    required: true
  },
  selectedCategory: {
    type: String,
    required: true
  },
  searchQuery: {
    type: String,
    required: true
  },
  filteredProducts: {
    type: Array,
    required: true
  }
})

defineEmits(['update:searchQuery', 'select-category', 'view-details', 'add-to-cart'])

// Exemplo de comunicação com API (GET): busca sugestões de produtos
// em uma API pública ao montar o componente (ciclo de vida: onMounted).
const suggestions = ref([])
const isLoadingSuggestions = ref(true)
const suggestionsError = ref(null)

async function fetchSuggestions() {
  isLoadingSuggestions.value = true
  suggestionsError.value = null
  try {
    const response = await fetch('https://dummyjson.com/products?limit=4&select=title,price,thumbnail')
    if (!response.ok) throw new Error('Falha na requisição')
    const data = await response.json()
    suggestions.value = data.products
  } catch (error) {
    suggestionsError.value = 'Não foi possível carregar as sugestões agora.'
  } finally {
    isLoadingSuggestions.value = false
  }
}

onMounted(fetchSuggestions)
</script>

<template>
  <main class="home">
    <div class="home__controls">
      <SearchBar
        :model-value="searchQuery"
        @update:model-value="$emit('update:searchQuery', $event)"
      />
      <CategoryFilter
        :categories="categories"
        :selected="selectedCategory"
        @select="$emit('select-category', $event)"
      />
    </div>

    <!-- Sugestões carregadas via GET em uma API externa (dummyjson.com) -->
    <section class="home__suggestions">
      <h2 class="home__suggestions-title">Sugestões para você</h2>
      <p v-if="isLoadingSuggestions" class="home__suggestions-status">Carregando sugestões...</p>
      <p v-else-if="suggestionsError" class="home__suggestions-status">{{ suggestionsError }}</p>
      <div v-else class="home__suggestions-list">
        <div v-for="item in suggestions" :key="item.id" class="home__suggestion-card">
          <img :src="item.thumbnail" :alt="item.title" />
          <p class="home__suggestion-title">{{ item.title }}</p>
          <p class="home__suggestion-price">US$ {{ item.price }}</p>
        </div>
      </div>
    </section>

    <ProductList
      :products="filteredProducts"
      @view-details="$emit('view-details', $event)"
      @add-to-cart="$emit('add-to-cart', $event)"
    />
  </main>
</template>

<style scoped>
.home {
  max-width: 1120px;
  margin: 0 auto;
  padding: 24px 24px 64px;
}

.home__controls {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.home__suggestions {
  margin-bottom: 32px;
}

.home__suggestions-title {
  font-size: 16px;
  margin-bottom: 12px;
}

.home__suggestions-status {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.home__suggestions-list {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.home__suggestion-card {
  flex: 0 0 140px;
  background: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  padding: 10px;
}

.home__suggestion-card img {
  width: 100%;
  height: 90px;
  object-fit: contain;
  margin-bottom: 8px;
}

.home__suggestion-title {
  font-size: 12px;
  color: var(--color-text);
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.home__suggestion-price {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-primary);
}
</style>
