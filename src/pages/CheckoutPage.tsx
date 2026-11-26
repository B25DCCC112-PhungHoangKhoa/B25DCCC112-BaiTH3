import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { clearCart, selectCartTotal } from '../features/cart/cartSlice'

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export default function CheckoutPage() {
  const items = useAppSelector((state) => state.cart.items)
  const total = useAppSelector(selectCartTotal)
  const dispatch = useAppDispatch()
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(clearCart())
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <section className="success-panel" role="status">
        <span className="success-mark" aria-hidden="true">✓</span>
        <span className="section-kicker">ShopMini đã ghi nhận đơn hàng</span>
        <h1>Đặt hàng thành công!</h1>
        <p>Cảm ơn bạn đã mua sắm. Chúc bạn một ngày thật vui.</p>
        <Link className="button button-primary" to="/">Về cửa hàng</Link>
      </section>
    )
  }

  if (!items.length) {
    return (
      <section className="empty-cart">
        <h1>Chưa có sản phẩm để thanh toán</h1>
        <p>Hãy thêm sản phẩm vào giỏ trước khi đặt hàng.</p>
        <Link className="button button-primary" to="/">Đi đến cửa hàng</Link>
      </section>
    )
  }

  return (
    <section className="checkout-page">
      <div className="page-heading">
        <div>
          <span className="section-kicker">Chỉ còn một bước nữa</span>
          <h1>Hoàn tất đơn hàng.</h1>
        </div>
      </div>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Thông tin nhận hàng</h2>
          <div className="form-row">
            <label className="form-field">
              <span>Họ và tên</span>
              <input autoComplete="name" required placeholder="Tên của bạn" />
            </label>
            <label className="form-field">
              <span>Số điện thoại</span>
              <input autoComplete="tel" type="tel" required placeholder="09xx xxx xxx" />
            </label>
          </div>
          <label className="form-field">
            <span>Email</span>
            <input autoComplete="email" type="email" required placeholder="ban@email.com" />
          </label>
          <label className="form-field">
            <span>Địa chỉ giao hàng</span>
            <textarea autoComplete="street-address" required rows={3} placeholder="Số nhà, đường, phường/xã, quận/huyện..." />
          </label>
          <button className="button button-primary place-order" type="submit">
            Đặt hàng <span aria-hidden="true">↗</span>
          </button>
        </form>
        <aside className="order-summary checkout-summary">
          <h2>Đơn hàng của bạn</h2>
          {items.map((item) => (
            <div className="checkout-item" key={item.id}>
              <img src={item.image} alt="" />
              <span>{item.title}<small>Số lượng: {item.quantity}</small></span>
              <strong>{priceFormatter.format(item.price * item.quantity)}</strong>
            </div>
          ))}
          <div className="summary-total">
            <span>Tổng cộng</span>
            <strong>{priceFormatter.format(total)}</strong>
          </div>
          <Link className="continue-link" to="/cart">← Quay lại giỏ hàng</Link>
        </aside>
      </div>
    </section>
  )
}
