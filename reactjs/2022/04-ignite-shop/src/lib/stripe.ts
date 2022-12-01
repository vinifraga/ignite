import Stripe from 'stripe'
import invariant from 'tiny-invariant'

invariant(
  process.env.STRIPE_SECRET_KEY,
  'A secret key do Stripe é obrigatória.',
)

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
  appInfo: {
    name: 'Ignite Shop',
  },
})
