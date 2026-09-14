<script setup>
import { formatPrice } from '../utils/format.js'

defineProps({
  product: {
    type: Object,
    required: true
  }
})
defineEmits(['view-details', 'add-to-cart'])
</script>

<template>
  <article class="product-card">
    <img :src="product.image" :alt="product.name" class="product-card__image" />
    <div class="product-card__body">
      <span class="product-card__category">{{ product.category }}</span>
      <h3 class="product-card__name">{{ product.name }}</h3>
      <p class="product-card__price">{{ formatPrice(product.price) }}</p>

      <div class="product-card__actions">
        <button class="product-card__btn" @click="$emit('view-details', product)">
          Ver detalhes
        </button>
        <button
          class="product-card__btn product-card__btn--icon"
          title="Adicionar ao carrinho"
          @click="$emit('add-to-cart', product)"
        >
          +
        </button>
      </div>
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

.product-card__actions {
  display: flex;
  gap: 8px;
}

.product-card__btn {
  padding: 10px;
  border-radius: var(--radius-sm);
  background: var(--color-primary);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  transition: background 0.15s ease;
  flex: 1;
}

.product-card__btn:hover {
  background: var(--color-primary-dark);
}

.product-card__btn--icon {
  flex: 0 0 40px;
  font-size: 18px;
  line-height: 1;
}
</style>
