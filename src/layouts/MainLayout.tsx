import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="page-shell">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="footer-inner">
          <span className="brand footer-brand">
            <span className="brand-mark">s</span>
            <span>shopmini</span>
          </span>
          <span>Mua sắm những điều bạn yêu thích.</span>
          <span>©B25DCCC112</span>
        </div>
      </footer>
    </>
  )
}
