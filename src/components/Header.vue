<script setup>
// A logo vem de /public/image, então basta trocar o arquivo "logo.webp"
// para atualizar a marca em toda a aplicação — sem precisar mexer no código.
defineProps({
  cartCount: {
    type: Number,
    default: 0
  }
})
defineEmits(['open-cart'])
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <img src="/image/logo.webp" alt="VueStore" class="header__logo" />

      <button class="header__cart" @click="$emit('open-cart')">
        <svg viewBox="0 0 24 24" class="header__cart-icon" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="9" cy="21" r="1.5" />
          <circle cx="18" cy="21" r="1.5" />
          <path d="M2.5 3h2l2.2 11.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 7H6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span v-if="cartCount > 0" class="header__cart-badge">{{ cartCount }}</span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.header__inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.header__logo {
  height: 40px;
  width: auto;
}

.header__cart {
  position: relative;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--color-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s ease;
}

.header__cart:hover {
  background: var(--color-primary-soft);
}

.header__cart-icon {
  width: 20px;
  height: 20px;
  color: var(--color-text);
}

.header__cart-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 999px;
  background: var(--color-primary);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
