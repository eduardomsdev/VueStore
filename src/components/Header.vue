<script setup>
// Componente simples, sem props: exibe a marca fictícia da loja.
</script>

<template>
  <header class="header">
    <div class="header__brand">
      <span class="header__logo">V</span>
      <div>
        <h1 class="header__name">VueStore</h1>
        <p class="header__tag">tecnologia para o seu dia a dia</p>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.header__brand {
  max-width: 1120px;
  margin: 0 auto;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.header__logo {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 20px;
  flex-shrink: 0;
}

.header__name {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text);
}

.header__tag {
  margin: 2px 0 0;
  font-size: 13px;
  color: var(--color-text-secondary);
}
</style>
