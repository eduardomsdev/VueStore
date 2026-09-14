<script setup>
import ProductCard from './ProductCard.vue'

defineProps({
  products: {
    type: Array,
    required: true
  }
})
defineEmits(['view-details', 'add-to-cart'])
</script>

<template>
  <div>
    <!-- v-if exibe uma mensagem quando a busca/filtro não retorna resultados -->
    <p v-if="products.length === 0" class="product-list__empty">
      Nenhum produto encontrado.
    </p>

    <!-- v-for percorre a lista já filtrada (computed property no componente pai) -->
    <div v-else class="product-list__grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @view-details="$emit('view-details', $event)"
        @add-to-cart="$emit('add-to-cart', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.product-list__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.product-list__empty {
  text-align: center;
  padding: 48px 0;
  color: var(--color-text-secondary);
  font-size: 15px;
}
</style>
