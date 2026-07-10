import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

const products = [
  { id: 'remedy', image: '/assets/cutouts/remedy.png', name: 'Remedy Paw Cleaner', detail: 'Spearmint & Sea Salt' },
  { id: 'refresh', image: '/assets/cutouts/refresh.png', name: 'Refresh Mist', detail: 'Yuzu & White Musk' },
  { id: 'fig', image: '/assets/cutouts/fig.png', name: 'Fig & Neroli', detail: 'Gentle Daily Shampoo' },
  { id: 'violet', image: '/assets/cutouts/violet.png', name: 'Violet Leaf & Muslin', detail: 'Gentle Daily Shampoo' },
]

function Icon({ name }) {
  const paths = {
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    bag: <><path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>
}

function App() {
  const [expanded, setExpanded] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [bagCount, setBagCount] = useState(0)
  const [active, setActive] = useState(0)
  const leaveTimer = useRef()
  const heroRef = useRef()

  useEffect(() => () => clearTimeout(leaveTimer.current), [])

  const enter = () => {
    clearTimeout(leaveTimer.current)
    setExpanded(true)
  }
  const leave = () => {
    clearTimeout(leaveTimer.current)
    leaveTimer.current = setTimeout(() => setExpanded(false), 160)
  }
  const moveCursor = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    heroRef.current?.style.setProperty('--cursor-x', x.toFixed(3))
    heroRef.current?.style.setProperty('--cursor-y', y.toFixed(3))
  }

  return (
    <main className={`site ${expanded ? 'is-expanded' : ''}`}>
      <section
        className="hero"
        ref={heroRef}
        aria-label="Furrytail daily care collection"
        onPointerEnter={enter}
        onPointerLeave={leave}
        onPointerMove={moveCursor}
        onFocus={enter}
        onBlur={(event) => !event.currentTarget.contains(event.relatedTarget) && leave()}
      >
        <header className="nav">
          <a className="wordmark" href="#top" aria-label="Furrytail home">Furrytail.</a>
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#shop">Shop</a><a href="#rituals">Rituals</a><a href="#standards">Our standards</a><a href="#journal">Journal</a>
          </nav>
          <div className="nav-actions">
            <button className="text-button" onClick={() => setDrawerOpen(true)}>Account</button>
            <button className="bag-button" onClick={() => setDrawerOpen(true)} aria-label={`Open ritual bag, ${bagCount} items`}>
              <Icon name="bag" />{bagCount > 0 && <span>{bagCount}</span>}
            </button>
            <button className="menu-button" onClick={() => setDrawerOpen(true)} aria-label="Open menu"><Icon name="menu" /></button>
          </div>
        </header>

        <div className="copy-block">
          <p className="overline">They chose you.</p>
          <h1>Every single day.<br />Without conditions.</h1>
          <p className="lede">Care should feel like care — a considered ritual that brings you closer.</p>
          <button className="primary-button" onClick={() => setExpanded(true)}>Explore the ritual <Icon name="arrow" /></button>
        </div>

        <div className="cursor-orbit" aria-hidden="true" />
        <div className="halo" aria-hidden="true" />
        <div className="tableau" aria-label="Furrytail daily care products">
          {products.map((product, index) => (
            <button
              className={`product product-${product.id} ${active === index ? 'is-active' : ''}`}
              key={product.id}
              onClick={() => { setActive(index); setExpanded(true) }}
              aria-label={`View ${product.name}, ${product.detail}`}
            >
              <img src={product.image} alt="" />
              <span className="product-shadow" />
            </button>
          ))}
          <span className="pebble" aria-hidden="true" />
        </div>

        <div className="expanded-info" aria-live="polite">
          <div><strong>{products[active].name}</strong><span>{products[active].detail}</span></div>
          <div className="purchase"><span>$38</span><button onClick={() => setBagCount((count) => count + 1)}>Add to ritual bag</button></div>
        </div>

        <div className="ritual-rail" id="rituals">
          {['01 — Paw care', '02 — Between baths', '03 — Weekly ritual'].map((label, index) => (
            <button className={active === index ? 'active' : ''} key={label} onClick={() => { setActive(index); setExpanded(true) }}>
              <span>{label}</span><i />
            </button>
          ))}
        </div>
        <p className="hint">Hover the collection to reveal the ritual</p>
      </section>

      <aside className={`drawer ${drawerOpen ? 'open' : ''}`} aria-hidden={!drawerOpen}>
        <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close panel"><Icon name="close" /></button>
        <p className="overline">Your ritual bag</p>
        <h2>{bagCount ? `${bagCount} care ${bagCount === 1 ? 'essential' : 'essentials'}` : 'A thoughtful ritual starts here.'}</h2>
        <p>{bagCount ? 'Your selection is saved for this visit.' : 'Choose a daily care essential from the collection.'}</p>
        <button className="primary-button" onClick={() => setDrawerOpen(false)}>{bagCount ? 'Review selection' : 'Continue exploring'}</button>
      </aside>
      {drawerOpen && <button className="scrim" onClick={() => setDrawerOpen(false)} aria-label="Close panel" />}
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
