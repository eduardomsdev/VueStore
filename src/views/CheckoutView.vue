<script setup>
import { useRouter } from 'vue-router'
import CheckoutPage from '../components/CheckoutPage.vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['finish'])

const router = useRouter()

function goBack() {
  router.push({ name: 'home' })
}

function finish() {
  emit('finish')
  router.push({ name: 'home' })
}
</script>

<template>
  <CheckoutPage :items="items" :total="total" @back="goBack" @finish="finish" />
</template>
