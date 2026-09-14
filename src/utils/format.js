// Formata um número no padrão monetário brasileiro (usado em vários componentes).
export function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
