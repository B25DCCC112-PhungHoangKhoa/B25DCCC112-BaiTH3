import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="not-found-page">
      <span className="not-found-code">404</span>
      <h1>Trang này đi lạc mất rồi.</h1>
      <p>Đường dẫn bạn tìm không tồn tại hoặc đã được chuyển đi.</p>
      <Link className="button button-primary" to="/">Về trang chủ</Link>
    </section>
  )
}
