<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})
defineEmits(['view-details'])

// Formata o preço no padrão monetário brasileiro.
function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
</script>

<template>
  <article class="product-card">
    <img :src="product.image" :alt="product.name" class="product-card__image" />
    <div class="product-card__body">
      <span class="product-card__category">{{ product.category }}</span>
      <h3 class="product-card__name">{{ product.name }}</h3>
      <p class="product-card__price">{{ formatPrice(product.price) }}</p>
      <button class="product-card__btn" @click="$emit('view-details', product)">
        Ver detalhes
      </button>
    </div>
  </article>
</template>

<style scoped>
.product-card {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
}

.product-card__image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.product-card__body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.product-card__category {
  font-size: 12px;
  color: var(--color-primary);
  font-weight: 600;
}

.product-card__name {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.3;
  margin-top: 2px;
}

.product-card__price {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  margin: 6px 0 12px;
}

.product-card__btn {
  padding: 10px;
  border-radius: var(--radius-sm);
  background: var(--color-primary);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  transition: background 0.15s ease;
}

.product-card__btn:hover {
  background: var(--color-primary-dark);
}
</style>
