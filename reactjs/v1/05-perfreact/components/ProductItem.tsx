import { memo, useState } from "react"
import dynamic from 'next/dynamic';

import { AddProductToWishListProps } from "./AddProductToWishlist"

const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
  return import ('./AddProductToWishlist').then(mod => mod.AddProductToWishList)
}, {
  loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  },
  onAddToWishList: (id: number) => void;
}

export function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>Adicionar aos favoritos</button>

      { isAddingToWishList && (
        <AddProductToWishList 
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product)
})