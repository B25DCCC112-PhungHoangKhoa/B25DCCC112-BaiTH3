import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useToast } from '../contexts/useToast'
import { addToCart } from '../features/cart/cartSlice'
import { fetchProducts } from '../features/products/productsSlice'

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export default function ProductDetailPage() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { showToast } = useToast()
  const { items, status, error } = useAppSelector((state) => state.products)
  const product = items.find((item) => item.id === Number(id))
  const handleAddToCart = () => {
    if (!product) {
      return
    }
    dispatch(addToCart(product))
    showToast(`Đã thêm "${product.title}" vào giỏ hàng.`)
  }

  if (status === 'loading' || status === 'idle') {
    return (
      <div className="state-panel detail-loading" role="status">
        <span className="loading-spinner" />
        <p>Đang tải thông tin sản phẩm...</p>
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className="state-panel state-error" role="alert">
        <h2>Chưa thể tải sản phẩm</h2>
        <p>{error}</p>
        <button
          className="button button-primary retry-button"
          type="button"
          onClick={() => dispatch(fetchProducts())}
        >
          Thử tải lại
        </button>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="state-panel">
        <h2>Không tìm thấy sản phẩm</h2>
        <Link className="text-link" to="/">Quay lại cửa hàng</Link>
      </div>
    )
  }

  return (
    <section className="detail-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Cửa hàng</Link>
        <span aria-hidden="true">/</span>
        <span>{product.category}</span>
      </nav>
      <div className="detail-layout">
        <div className="detail-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="detail-copy">
          <span className="section-kicker">{product.category}</span>
          <h1>{product.title}</h1>
          <p className="detail-price">{priceFormatter.format(product.price)}</p>
          <div className="detail-divider" />
          <h2>Về sản phẩm</h2>
          <p className="detail-description">{product.description}</p>
          <button
            className="button button-primary detail-add"
            type="button"
            onClick={handleAddToCart}
          >
            Thêm vào giỏ hàng <span aria-hidden="true">↗</span>
          </button>
          <p className="detail-note">Một lựa chọn tuyệt vời dành riêng cho bạn.</p>
        </div>
      </div>
    </section>
  )
}
