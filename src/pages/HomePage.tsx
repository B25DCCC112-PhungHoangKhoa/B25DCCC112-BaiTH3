import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import ProductCard from '../components/ProductCard'
import { fetchProducts } from '../features/products/productsSlice'

export default function HomePage() {
  const { items, status, error } = useAppSelector((state) => state.products)
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Tất cả')

  const categories = useMemo(
    () => ['Tất cả', ...new Set(items.map((product) => product.category))],
    [items],
  )
  const filteredProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase()
    return items.filter((product) => {
      const matchesSearch = product.title.toLocaleLowerCase().includes(query)
      const matchesCategory = category === 'Tất cả' || product.category === category
      return matchesSearch && matchesCategory
    })
  }, [items, search, category])

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="hero-kicker">Những món đồ đáng yêu, mỗi ngày</span>
          <h1>Món bạn thích, ở ngay đây.</h1>
          <p>Khám phá những lựa chọn thú vị cho phong cách và cuộc sống của bạn.</p>
          <a className="button button-primary hero-cta" href="#collection">
            Khám phá cửa hàng
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-art-circle" />
          <div className="hero-product hero-product-one">
            {items[0] && <img src={items[0].image} alt="" />}
          </div>
          <div className="hero-product hero-product-two">
            {items[4] && <img src={items[4].image} alt="" />}
          </div>
          <span className="hero-sparkle sparkle-one">✳</span>
          <span className="hero-sparkle sparkle-two">✳</span>
          <span className="hero-note">little finds<br />big joy</span>
        </div>
      </section>

      <section className="collection-section" id="collection">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Tuyển chọn cho bạn</span>
            <h2>Mua sắm theo cách của bạn</h2>
          </div>
          <span className="result-count">
            {status === 'succeeded' ? `${filteredProducts.length} sản phẩm` : 'Đang cập nhật'}
          </span>
        </div>

        <div className="collection-tools">
          <div className="category-list" aria-label="Lọc theo danh mục">
            {categories.map((item) => (
              <button
                className={`category-chip${category === item ? ' is-active' : ''}`}
                key={item}
                type="button"
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="search-field">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4 4" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm sản phẩm..."
              aria-label="Tìm sản phẩm theo tên"
            />
          </label>
        </div>

        {status === 'loading' || status === 'idle' ? (
          <div className="state-panel" role="status">
            <span className="loading-spinner" />
            <p>Đang tìm những món đồ hay ho...</p>
          </div>
        ) : status === 'failed' ? (
          <div className="state-panel state-error" role="alert">
            <h3>Chưa thể tải cửa hàng</h3>
            <p>{error}</p>
            <button
              className="button button-primary retry-button"
              type="button"
              onClick={() => dispatch(fetchProducts())}
            >
              Thử tải lại
            </button>
          </div>
        ) : filteredProducts.length ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="state-panel">
            <h3>Chưa tìm thấy sản phẩm phù hợp</h3>
            <p>Thử tìm với từ khóa khác hoặc chọn một danh mục khác nhé.</p>
          </div>
        )}
      </section>
      <section className="bottom-banner">
        <div>
          <span className="section-kicker">Mua sắm thật vui</span>
          <h2>Tìm thấy điều nhỏ bé khiến hôm nay đặc biệt hơn.</h2>
        </div>
        <Link className="button button-dark" to="/cart">
          Xem giỏ hàng <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </>
  )
}
