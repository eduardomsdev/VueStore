<script setup>
import { formatPrice } from '../utils/format.js'

// "items" é o array do carrinho, cada item é { ...product, quantity }.
// "total" é uma computed property calculada no componente pai.
defineProps({
  items: {
    type: Array,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
})
defineEmits(['close', 'increase', 'decrease', 'remove', 'checkout'])
</script>

<template>
  <div class="cart-overlay" @click.self="$emit('close')">
    <aside class="cart-drawer">
      <div class="cart-drawer__header">
        <h2 class="cart-drawer__title">Meu carrinho</h2>
        <button class="cart-drawer__close" @click="$emit('close')">×</button>
      </div>

      <!-- v-if: mensagem quando o carrinho está vazio -->
      <p v-if="items.length === 0" class="cart-drawer__empty">
        Seu carrinho está vazio.
      </p>

      <!-- v-for: percorre os itens do carrinho -->
      <div v-else class="cart-drawer__list">
        <div v-for="item in items" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.name" class="cart-item__image" />
          <div class="cart-item__info">
            <p class="cart-item__name">{{ item.name }}</p>
            <p class="cart-item__price">{{ formatPrice(item.price) }}</p>

            <div class="cart-item__qty">
              <button @click="$emit('decrease', item)">−</button>
              <span>{{ item.quantity }}</span>
              <button @click="$emit('increase', item)">+</button>
            </div>
          </div>
          <button class="cart-item__remove" title="Remover" @click="$emit('remove', item)">×</button>
        </div>
      </div>

      <div v-if="items.length > 0" class="cart-drawer__footer">
        <div class="cart-drawer__total">
          <span>Total</span>
          <strong>{{ formatPrice(total) }}</strong>
        </div>
        <button class="cart-drawer__checkout-btn" @click="$emit('checkout')">
          Finalizar compra
        </button>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.cart-overlay {
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.5);
  display: flex;
  justify-content: flex-end;
  z-index: 60;
}

.cart-drawer {
  width: 100%;
  max-width: 380px;
  height: 100%;
  background: var(--color-surface);
  box-shadow: var(--shadow-modal);
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.cart-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.cart-drawer__title {
  font-size: 18px;
  font-weight: 700;
}

.cart-drawer__close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-bg);
  font-size: 18px;
  color: var(--color-text-secondary);
}

.cart-drawer__close:hover {
  background: var(--color-border);
}

.cart-drawer__empty {
  color: var(--color-text-secondary);
  font-size: 14px;
  margin-top: 40px;
  text-align: center;
}

.cart-drawer__list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.cart-item__image {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-sm);
  object-fit: cover;
  flex-shrink: 0;
}

.cart-item__info {
  flex: 1;
}

.cart-item__name {
  font-size: 13px;
  font-weight: 600;
  margin: 0 0 2px;
}

.cart-item__price {
  font-size: 13px;
  color: var(--color-text-secondary);
  margin: 0 0 8px;
}

.cart-item__qty {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 2px 10px;
}

.cart-item__qty button {
  background: none;
  font-size: 15px;
  color: var(--color-primary);
  font-weight: 700;
}

.cart-item__qty span {
  font-size: 13px;
  font-weight: 600;
  min-width: 14px;
  text-align: center;
}

.cart-item__remove {
  background: none;
  color: var(--color-text-secondary);
  font-size: 16px;
}

.cart-item__remove:hover {
  color: #d92d20;
}

.cart-drawer__footer {
  border-top: 1px solid var(--color-border);
  padding-top: 16px;
  margin-top: 16px;
}

.cart-drawer__total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  margin-bottom: 14px;
}

.cart-drawer__total strong {
  font-size: 18px;
}

.cart-drawer__checkout-btn {
  width: 100%;
  padding: 13px;
  border-radius: var(--radius-sm);
  background: var(--color-primary);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
}

.cart-drawer__checkout-btn:hover {
  background: var(--color-primary-dark);
}
</style>
