import { Link } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { useToast } from '../contexts/useToast'
import { addToCart } from '../features/cart/cartSlice'
import type { Product } from '../types'

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch()
  const { showToast } = useToast()

  const handleAddToCart = () => {
    dispatch(addToCart(product))
    showToast(`Đã thêm "${product.title}" vào giỏ hàng.`)
  }

  return (
    <article className="product-card">
      <Link className="product-image-link" to={`/products/${product.id}`}>
        <div className="product-image-wrap">
          <img src={product.image} alt={product.title} loading="lazy" />
        </div>
      </Link>
      <div className="product-card-copy">
        <span className="product-category">{product.category}</span>
        <Link className="product-title" to={`/products/${product.id}`}>
          {product.title}
        </Link>
        <div className="product-card-bottom">
          <span className="product-price">{priceFormatter.format(product.price)}</span>
          <button
            className="add-button"
            type="button"
            onClick={handleAddToCart}
            aria-label={`Thêm ${product.title} vào giỏ hàng`}
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </article>
  )
}
