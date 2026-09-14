<script setup>
// Recebe o valor atual via prop "modelValue" e emite "update:modelValue"
// para funcionar com v-model no componente pai.
defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="search-bar">
    <span class="search-bar__icon">⌕</span>
    <input
      class="search-bar__input"
      type="text"
      placeholder="Buscar produtos..."
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<style scoped>
.search-bar {
  position: relative;
  flex: 1;
  min-width: 220px;
}

.search-bar__icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-secondary);
  font-size: 16px;
}

.search-bar__input {
  width: 100%;
  padding: 12px 16px 12px 38px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  font-size: 14px;
  color: var(--color-text);
}

.search-bar__input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-soft);
}
</style>
