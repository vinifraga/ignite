import { useMemo } from "react"
import { ProductItem } from "./ProductItem"

interface SearchResultsProps {
  totalPrice: number;
  results: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }>
  onAddToWishList: (id: number) => void;
} 

export function SearchResults({ results, totalPrice, onAddToWishList }: SearchResultsProps) {
  return (
    <div>
      <h2>{totalPrice}</h2>

      {results.map(product => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            onAddToWishList={onAddToWishList}
          />
        )
      })}
    </div>
  )
}