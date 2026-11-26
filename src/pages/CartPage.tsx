import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  clearCart,
  removeFromCart,
  selectCartTotal,
  updateQuantity,
} from '../features/cart/cartSlice'

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export default function CartPage() {
  const items = useAppSelector((state) => state.cart.items)
  const subtotal = useAppSelector(selectCartTotal)
  const dispatch = useAppDispatch()

  return (
    <section className="cart-page">
      <div className="page-heading">
        <div>
          <span className="section-kicker">Giỏ hàng của bạn</span>
          <h1>Những món bạn đã chọn.</h1>
        </div>
        {items.length > 0 && (
          <button
            className="text-button clear-cart"
            type="button"
            onClick={() => dispatch(clearCart())}
          >
            Xóa tất cả
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M5 8h14l1 13H4L5 8Z" />
              <path d="M9 9V6a3 3 0 0 1 6 0v3" />
            </svg>
          </div>
          <h2>Giỏ hàng đang trống</h2>
          <p>Ghé cửa hàng và tìm một món thật hợp với bạn nhé.</p>
          <Link className="button button-primary" to="/">Tiếp tục mua sắm</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <Link className="cart-item-image" to={`/products/${item.id}`}>
                  <img src={item.image} alt={item.title} />
                </Link>
                <div className="cart-item-info">
                  <span className="product-category">{item.category}</span>
                  <Link className="cart-item-title" to={`/products/${item.id}`}>
                    {item.title}
                  </Link>
                  <span className="cart-item-price">{priceFormatter.format(item.price)}</span>
                  <div className="quantity-control" aria-label={`Số lượng ${item.title}`}>
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                      }
                      aria-label="Giảm số lượng"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                      }
                      aria-label="Tăng số lượng"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-end">
                  <strong>{priceFormatter.format(item.price * item.quantity)}</strong>
                  <button
                    className="remove-button"
                    type="button"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Xóa
                  </button>
                </div>
              </article>
            ))}
            <Link className="continue-link" to="/">← Tiếp tục mua sắm</Link>
          </div>
          <aside className="order-summary">
            <h2>Tóm tắt đơn hàng</h2>
            <div className="summary-row">
              <span>Tạm tính</span>
              <span>{priceFormatter.format(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Phí vận chuyển</span>
              <span className="shipping-note">Tính khi thanh toán</span>
            </div>
            <div className="summary-total">
              <span>Tổng cộng</span>
              <strong>{priceFormatter.format(subtotal)}</strong>
            </div>
            <Link className="button button-primary checkout-link" to="/checkout">
              Tiến hành thanh toán <span aria-hidden="true">↗</span>
            </Link>
            <p className="secure-note">Đơn hàng sẽ được xác nhận ở bước tiếp theo.</p>
          </aside>
        </div>
      )}
    </section>
  )
}
