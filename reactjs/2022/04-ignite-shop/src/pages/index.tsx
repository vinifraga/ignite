import 'keen-slider/keen-slider.min.css'

import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import { GetStaticProps } from 'next'

import { stripe } from '../lib/stripe'

import { HomeContainer, Product } from '../styles/pages/home'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number | null | undefined
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => (
        <Product key={product.id} className="keen-slider__slide">
          <Image src={product.imageUrl} width={520} height={480} alt="" />

          <footer>
            <strong>{product.name}</strong>
            <span>{product.price}</span>
          </footer>
        </Product>
      ))}
    </HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    if (typeof product.default_price === 'string')
      throw new Error('Product price was not expanded.')

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: product.default_price?.unit_amount,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
