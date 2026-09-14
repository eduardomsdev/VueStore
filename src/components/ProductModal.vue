<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})
defineEmits(['close'])

function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
</script>

<template>
  <!-- @click.self fecha o modal apenas quando o clique é no fundo, não no card -->
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <button class="modal__close" @click="$emit('close')">×</button>
      <img :src="product.image" :alt="product.name" class="modal__image" />
      <span class="modal__category">{{ product.category }}</span>
      <h2 class="modal__name">{{ product.name }}</h2>
      <p class="modal__price">{{ formatPrice(product.price) }}</p>
      <p class="modal__description">{{ product.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 50;
}

.modal {
  position: relative;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-modal);
  max-width: 420px;
  width: 100%;
  padding: 24px;
}

.modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-bg);
  color: var(--color-text-secondary);
  font-size: 18px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal__close:hover {
  background: var(--color-border);
}

.modal__image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: var(--radius-md);
  margin-bottom: 16px;
}

.modal__category {
  font-size: 12px;
  color: var(--color-primary);
  font-weight: 600;
}

.modal__name {
  font-size: 20px;
  font-weight: 700;
  margin-top: 6px;
}

.modal__price {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text);
  margin: 10px 0;
}

.modal__description {
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin: 0;
}
</style>
