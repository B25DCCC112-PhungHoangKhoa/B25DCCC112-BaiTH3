import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { useAuth } from '../contexts/useAuth'
import { useTheme } from '../contexts/useTheme'
import { selectCartItemCount } from '../features/cart/cartSlice'

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 8h14l1 13H4L5 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  )
}

export default function Header() {
  const itemCount = useAppSelector(selectCartItemCount)
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="ShopMini - Trang chủ">
          <span className="brand-mark">s</span>
          <span>shopmini</span>
        </Link>

        <nav className="primary-nav" aria-label="Điều hướng chính">
          <NavLink to="/" end>
            Cửa hàng
          </NavLink>
          <Link to="/#collection">Bộ sưu tập</Link>
        </nav>

        <div className="header-actions">
          <button
            className="icon-button theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Chuyển sang giao diện ${theme === 'light' ? 'tối' : 'sáng'}`}
            title={`Giao diện ${theme === 'light' ? 'tối' : 'sáng'}`}
          >
            {theme === 'light' ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
              </svg>
            )}
          </button>
          {user ? (
            <div className="user-actions">
              <span className="user-greeting">Chào, {user.username}</span>
              <button className="text-button" type="button" onClick={handleLogout}>
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link className="login-link" to="/login">
              Đăng nhập
            </Link>
          )}
          <Link className="cart-link" to="/cart" aria-label={`Giỏ hàng, ${itemCount} sản phẩm`}>
            <BagIcon />
            <span className="cart-label">Giỏ hàng</span>
            <span className="cart-count">{itemCount}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
