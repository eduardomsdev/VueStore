<script setup>
// "categories" e "selected" chegam do componente pai via props.
// Ao clicar em um botão, o evento "select" avisa o pai qual categoria escolher.
defineProps({
  categories: {
    type: Array,
    required: true
  },
  selected: {
    type: String,
    required: true
  }
})
defineEmits(['select'])
</script>

<template>
  <div class="category-filter">
    <button
      v-for="category in categories"
      :key="category"
      class="category-filter__btn"
      :class="{ 'category-filter__btn--active': selected === category }"
      @click="$emit('select', category)"
    >
      {{ category }}
    </button>
  </div>
</template>

<style scoped>
.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.category-filter__btn {
  padding: 9px 16px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-secondary);
  font-size: 13px;
  font-weight: 500;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.category-filter__btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.category-filter__btn--active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}
</style>
