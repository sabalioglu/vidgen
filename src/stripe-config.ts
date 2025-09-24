export interface StripeProduct {
  id: string
  priceId: string
  name: string
  description: string
  price: number
  mode: 'payment' | 'subscription'
  popular?: boolean
}

export const STRIPE_PRODUCTS: StripeProduct[] = [
  {
    id: 'prod_T75O4hPiRNBlMM',
    priceId: 'price_1SArE7Emd2R9npIsFqTWkgtL',
    name: 'VideoGen',
    description: 'Ai Video Generation',
    price: 9.99,
    mode: 'payment',
    popular: true
  }
]

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return STRIPE_PRODUCTS.find(product => product.priceId === priceId)
}

export const getProductById = (id: string): StripeProduct | undefined => {
  return STRIPE_PRODUCTS.find(product => product.id === id)
}