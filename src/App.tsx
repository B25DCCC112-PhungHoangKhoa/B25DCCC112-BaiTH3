import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAppDispatch } from './app/hooks'
import './App.css'
import { fetchProducts } from './features/products/productsSlice'
import MainLayout from './layouts/MainLayout'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const request = dispatch(fetchProducts())
    return () => request.abort()
  }, [dispatch])

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="checkout" element={<CheckoutPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
