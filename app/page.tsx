'use client'

import {FormEvent, useEffect, useState} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {getCart} from '@/lib/cart'

type Product={id:string;name:string;price:number;compare_price:number|null;stock:number;image_url:string|null}

const heroImage='https://upload.wikimedia.org/wikipedia/commons/8/83/The_Hindu_deity_Krishna_playing_the_flute.jpg'

export default function Home(){
  const router=useRouter()
  const [products,setProducts]=useState<Product[]>([])
  const [loading,setLoading]=useState(true)
  const [search,setSearch]=useState('')
  const [cartCount,setCartCount]=useState(0)

  useEffect(()=>{
    fetch('/api/products').then(r=>r.json()).then(d=>setProducts(Array.isArray(d.products)?d.products:[])).catch(()=>setProducts([])).finally(()=>setLoading(false))
    const refresh=()=>setCartCount(getCart().reduce((n,item)=>n+item.qty,0))
    refresh()
    window.addEventListener('storage',refresh)
    window.addEventListener('cart-updated',refresh)
    return()=>{window.removeEventListener('storage',refresh);window.removeEventListener('cart-updated',refresh)}
  },[])

  const doSearch=(e:FormEvent)=>{e.preventDefault();const q=search.trim();router.push(q?`/products?search=${encodeURIComponent(q)}`:'/products')}

  return <>
    <div className="top">🚚 पूरे भारत में सुरक्षित डिलीवरी &nbsp;|&nbsp; COD उपलब्ध &nbsp;|&nbsp; प्रेम से पैक किया जाता है ❤️</div>

    <header className="nav">
      <div className="container navin">
        <button className="menuicon" aria-label="Menu">☰</button>
        <Link className="logo" href="/"><span>🪶</span><span>Shri Krishna Vastra<small>Parampara • Poshak • Prem</small></span></Link>
        <form className="navsearch" onSubmit={doSearch}><span>⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="आप क्या खोज रहे हैं?" aria-label="Search products"/><button type="submit">खोजें</button></form>
        <Link className="account" href="/login"><span>♙</span><small>Login</small></Link>
        <Link className="carticon" href="/cart" aria-label="Cart">🛒<b>{cartCount}</b></Link>
      </div>
    </header>

    <main className="storefront">
      <section className="hero hero-reference container">
        <div className="hero-copy">
          <span className="hero-badge">॥ राधे राधे ॥</span>
          <h1>श्री कृष्ण जी की<br/><em>सुंदर पोशाक</em></h1>
          <p>भक्ति, परंपरा और प्रेम का संगम — ठाकुर जी के लिए सुंदर वस्त्र एक ही जगह।</p>
          <Link className="btn hero-btn" href="/products">अब खरीदें&nbsp; →</Link>
        </div>
        <div className="hero-art">
          <img className="hero-krishna" src={heroImage} alt="Shri Krishna"/>
          <div className="hero-shade"/>
        </div>
      </section>

      <section className="trust-row container">
        <div><span>🚚</span><b>Pan India<br/>Delivery</b></div>
        <div><span>♢</span><b>Secure<br/>Payments</b></div>
        <div><span>🪶</span><b>Premium<br/>Quality</b></div>
        <div><span>♡</span><b>Trusted by<br/>Devotees</b></div>
      </section>

      <section className="category-section container">
        <div className="section-title-row"><div><span>OUR COLLECTION</span><h2>हमारी श्रेणियाँ</h2></div><Link href="/products">सभी देखें&nbsp; →</Link></div>
        <div className="category-grid">
          <Link href="/products?category=krishna-ji-vastra"><span>👗</span><b>कृष्ण जी पोशाक</b><small>सुंदर व पारंपरिक</small></Link>
          <Link href="/products?category=laddu-gopal"><span>👑</span><b>मुकुट</b><small>आकर्षक डिज़ाइन</small></Link>
          <Link href="/products?category=shringar-sets"><span>📿</span><b>आभूषण</b><small>विशेष संग्रह</small></Link>
          <Link href="/products"><span>🪶</span><b>अन्य सामग्री</b><small>भक्ति उपहार</small></Link>
        </div>
      </section>

      <section className="delivery-banner container"><span>🚚</span><div><small>₹499 से अधिक के ऑर्डर पर</small><strong>FREE DELIVERY</strong></div><Link href="/products">→</Link></section>

      <section className="products-section container" id="products">
        <div className="section-title-row"><div><span>SHOP</span><h2>हमारे उत्पाद</h2></div><Link href="/products">सभी देखें&nbsp; →</Link></div>
        {loading?<div className="empty-products"><span>⌛</span><h3>Products load हो रहे हैं…</h3></div>:products.length===0?<div className="empty-products"><span>🛍️</span><h3>अभी कोई उत्पाद उपलब्ध नहीं है</h3><p>Owner admin panel से products add करेगा। Add होते ही यहाँ दिखाई देंगे।</p><Link className="btn" href="/products">Shop देखें</Link></div>:<div className="grid">{products.map(p=><article className="card" key={p.id}><Link href={'/products/'+p.id}><div className="pic">{p.image_url&&<img src={p.image_url} alt={p.name}/>}</div></Link><div className="info"><h3>{p.name}</h3><div className="price">₹{p.price}</div><Link className="btn small-btn" href={'/products/'+p.id}>देखें</Link></div></article>)}</div>}
      </section>
    </main>

    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      <Link href="/"><span>⌂</span><small>होम</small></Link>
      <Link href="/products"><span>▦</span><small>श्रेणियाँ</small></Link>
      <Link href="/wishlist"><span>♡</span><small>विशलिस्ट</small></Link>
      <Link href="/cart" className="bottom-cart"><span>🛒<b>{cartCount}</b></span><small>कार्ट</small></Link>
      <Link href="/login"><span>♙</span><small>लॉगिन</small></Link>
    </nav>

    <footer className="footer"><div className="container"><h2>🪶 Shri Krishna Vastra</h2><p>Parampara • Poshak • Prem</p><p className="muted">© 2026 Shri Krishna Vastra. All rights reserved.</p></div></footer>
  </>
}
