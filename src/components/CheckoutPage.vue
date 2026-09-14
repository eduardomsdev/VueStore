<script setup>
import { ref, computed } from 'vue'
import { formatPrice } from '../utils/format.js'

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
defineEmits(['back', 'finish'])

// Estado reativo do formulário (dados de entrega + pagamento).
const fullName = ref('')
const address = ref('')
const city = ref('')
const paymentMethod = ref('cartao') // 'cartao' ou 'pix'
const cardNumber = ref('')
const cardName = ref('')
const cardExpiry = ref('')
const cardCvv = ref('')

const orderConfirmed = ref(false)

// Formulário só é considerado válido com os campos essenciais preenchidos.
const isFormValid = computed(() => {
  const hasDeliveryInfo = fullName.value.trim() && address.value.trim() && city.value.trim()
  const hasPaymentInfo =
    paymentMethod.value === 'pix' ||
    (cardNumber.value.trim() && cardName.value.trim() && cardExpiry.value.trim() && cardCvv.value.trim())
  return hasDeliveryInfo && hasPaymentInfo
})

function confirmOrder() {
  if (!isFormValid.value) return
  // Não há backend: apenas simula a confirmação do pedido na tela.
  orderConfirmed.value = true
}
</script>

<template>
  <div class="checkout">
    <!-- Tela de sucesso, exibida após a "confirmação" do pedido -->
    <div v-if="orderConfirmed" class="checkout__success">
      <div class="checkout__success-icon">✓</div>
      <h2>Pedido confirmado!</h2>
      <p>Obrigado, {{ fullName }}. Seu pedido de {{ formatPrice(total) }} foi recebido.</p>
      <button class="checkout__btn" @click="$emit('finish')">Voltar à loja</button>
    </div>

    <!-- Formulário de checkout -->
    <template v-else>
      <button class="checkout__back" @click="$emit('back')">‹ Voltar à loja</button>
      <h1 class="checkout__title">Finalizar compra</h1>

      <div class="checkout__grid">
        <div class="checkout__form">
          <section class="checkout__section">
            <h3>Dados de entrega</h3>
            <label class="checkout__field">
              <span>Nome completo</span>
              <input v-model="fullName" type="text" placeholder="Seu nome" />
            </label>
            <label class="checkout__field">
              <span>Endereço</span>
              <input v-model="address" type="text" placeholder="Rua, número" />
            </label>
            <label class="checkout__field">
              <span>Cidade</span>
              <input v-model="city" type="text" placeholder="Sua cidade" />
            </label>
          </section>

          <section class="checkout__section">
            <h3>Forma de pagamento</h3>
            <div class="checkout__payment-options">
              <label class="checkout__radio">
                <input v-model="paymentMethod" type="radio" value="cartao" />
                Cartão de crédito
              </label>
              <label class="checkout__radio">
                <input v-model="paymentMethod" type="radio" value="pix" />
                Pix
              </label>
            </div>

            <!-- v-if: campos do cartão só aparecem se essa for a forma escolhida -->
            <div v-if="paymentMethod === 'cartao'" class="checkout__card-fields">
              <label class="checkout__field">
                <span>Número do cartão</span>
                <input v-model="cardNumber" type="text" placeholder="0000 0000 0000 0000" />
              </label>
              <label class="checkout__field">
                <span>Nome no cartão</span>
                <input v-model="cardName" type="text" placeholder="Como está no cartão" />
              </label>
              <div class="checkout__field-row">
                <label class="checkout__field">
                  <span>Validade</span>
                  <input v-model="cardExpiry" type="text" placeholder="MM/AA" />
                </label>
                <label class="checkout__field">
                  <span>CVV</span>
                  <input v-model="cardCvv" type="text" placeholder="123" />
                </label>
              </div>
            </div>

            <!-- v-else: instrução simples para pagamento via Pix -->
            <p v-else class="checkout__pix-note">
              O código Pix será gerado após a confirmação do pedido.
            </p>
          </section>
        </div>

        <aside class="checkout__summary">
          <h3>Resumo do pedido</h3>
          <div v-for="item in items" :key="item.id" class="checkout__summary-item">
            <span>{{ item.quantity }}× {{ item.name }}</span>
            <span>{{ formatPrice(item.price * item.quantity) }}</span>
          </div>
          <div class="checkout__summary-total">
            <span>Total</span>
            <strong>{{ formatPrice(total) }}</strong>
          </div>
          <button class="checkout__btn" :disabled="!isFormValid" @click="confirmOrder">
            Confirmar pedido
          </button>
        </aside>
      </div>
    </template>
  </div>
</template>

<style scoped>
.checkout {
  max-width: 1120px;
  margin: 0 auto;
  padding: 32px 24px 64px;
}

.checkout__back {
  background: none;
  color: var(--color-text-secondary);
  font-size: 14px;
  padding: 0;
  margin-bottom: 16px;
}

.checkout__back:hover {
  color: var(--color-primary);
}

.checkout__title {
  font-size: 24px;
  margin-bottom: 24px;
}

.checkout__grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 24px;
  align-items: start;
}

.checkout__section {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  padding: 20px;
  margin-bottom: 20px;
}

.checkout__section h3 {
  font-size: 15px;
  margin-bottom: 14px;
}

.checkout__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  color: var(--color-text-secondary);
  margin-bottom: 14px;
}

.checkout__field input {
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  font-size: 14px;
  font-family: var(--font-body);
  color: var(--color-text);
}

.checkout__field input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.checkout__field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.checkout__payment-options {
  display: flex;
  gap: 20px;
  margin-bottom: 14px;
}

.checkout__radio {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}

.checkout__pix-note {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.checkout__summary {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  padding: 20px;
  position: sticky;
  top: 20px;
}

.checkout__summary h3 {
  font-size: 15px;
  margin-bottom: 14px;
}

.checkout__summary-item {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--color-text-secondary);
  margin-bottom: 8px;
}

.checkout__summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--color-border);
  padding-top: 12px;
  margin: 12px 0 16px;
  font-size: 14px;
}

.checkout__summary-total strong {
  font-size: 18px;
}

.checkout__btn {
  width: 100%;
  padding: 13px;
  border-radius: var(--radius-sm);
  background: var(--color-primary);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
}

.checkout__btn:hover:not(:disabled) {
  background: var(--color-primary-dark);
}

.checkout__btn:disabled {
  background: var(--color-border);
  color: var(--color-text-secondary);
  cursor: not-allowed;
}

.checkout__success {
  max-width: 420px;
  margin: 60px auto 0;
  text-align: center;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  padding: 40px 32px;
}

.checkout__success-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-size: 28px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

.checkout__success h2 {
  font-size: 20px;
  margin-bottom: 8px;
}

.checkout__success p {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: 24px;
}

@media (max-width: 720px) {
  .checkout__grid {
    grid-template-columns: 1fr;
  }
}
</style>
