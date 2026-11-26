import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/useAuth'

interface LoginLocationState {
  from?: {
    pathname?: string
  }
}

export default function LoginPage() {
  const { login, user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const redirectPath =
    (location.state as LoginLocationState | null)?.from?.pathname ?? '/'

  if (user) {
    return <Navigate to={redirectPath} replace />
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!login(username, password)) {
      setError('Mật khẩu chưa chính xác. Hãy thử lại nhé.')
      return
    }
    navigate(redirectPath, { replace: true })
  }

  return (
    <section className="login-page">
      <div className="login-aside">
        <span className="section-kicker">Chào mừng trở lại</span>
        <h1>Một góc nhỏ, dành riêng cho bạn.</h1>
        <p>Đăng nhập để tiếp tục hành trình mua sắm của mình.</p>
        <div className="login-decoration" aria-hidden="true">
          <span>✳</span>
          <span>shop<br />small</span>
        </div>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <span className="section-kicker">Tài khoản ShopMini</span>
          <h2>Đăng nhập</h2>
          <p className="form-intro">Nhập thông tin để tiếp tục.</p>
        </div>
        <label className="form-field">
          <span>Tên người dùng</span>
          <input
            type="text"
            autoComplete="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Ví dụ: linhnguyen"
          />
        </label>
        <label className="form-field">
          <span>Mật khẩu</span>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Nhập mật khẩu"
          />
        </label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button button-primary login-submit" type="submit">
          Đăng nhập <span aria-hidden="true">↗</span>
        </button>
        <p className="login-hint">Dùng mật khẩu <strong>123456</strong> để đăng nhập thử.</p>
        <Link className="login-back-link" to="/">← Quay lại cửa hàng</Link>
      </form>
    </section>
  )
}
