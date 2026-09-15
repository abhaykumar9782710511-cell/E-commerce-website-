'use client'
import {useEffect,useState} from 'react'
import Link from 'next/link'

type Product={id:string;name:string;price:number;compare_price:number|null;stock:number;image_url:string|null}

const krishnaHero='https://upload.wikimedia.org/wikipedia/commons/8/83/The_Hindu_deity_Krishna_playing_the_flute.jpg'

export default function Home(){
 const [products,setProducts]=useState<Product[]>([]); const [loading,setLoading]=useState(true)
 useEffect(()=>{fetch('/api/products').then(r=>r.json()).then(d=>setProducts(d.products||[])).catch(()=>setProducts([])).finally(()=>setLoading(false))},[])
 return <>
  <div className="top">🦚 श्री कृष्ण जी के सुंदर वस्त्र • पूरे भारत में सुरक्षित डिलीवरी</div>
  <header className="nav"><div className="container navin"><Link className="logo" href="/"><span>🪶</span><span>Shri Krishna Vastra<small>Parampara • Poshak • Prem</small></span></Link><nav className="links"><Link href="/">Home</Link><Link href="/products">Shop</Link><Link href="/login">Account</Link></nav><Link className="navicon" href="/products">⌕</Link><Link className="carticon" href="/cart">🛒<b>0</b></Link><span className="menuicon">☰</span></div></header>
  <main>
   <section className="hero hero-new"><div className="hero-copy"><span className="hero-badge">🪷 अपनी संस्कृति, अपनी पहचान</span><h1>श्री कृष्ण जी की<br/><em>पोशाक, आपके लिए</em></h1><p>सुंदर, पारंपरिक और मनमोहक वस्त्र — अब आपके ठाकुर जी के लिए एक जगह पर।</p><Link className="btn hero-btn" href="/products">Shop Now&nbsp; →</Link><div className="hero-trust"><span>🚚 Pan India Delivery</span><span>🛡️ Secure Payments</span><span>♡ Trusted by Devotees</span></div></div><div className="hero-art"><img className="hero-krishna" src={krishnaHero} alt="Shri Krishna playing flute"/><div className="hero-shade"/><div className="art-text">वस्त्र<br/><small>सेवा • भक्ति</small></div></div></section>
   <section className="categories container"><Link href="/products"><span>🦚</span><b>Krishna Poshak</b><small>Laddu Gopal</small></Link><Link href="/products"><span>👑</span><b>Festival Collection</b><small>Janmashtami Special</small></Link><Link href="/products"><span>🪷</span><b>Shringar Sets</b><small>Traditional</small></Link><Link href="/products"><span>🌸</span><b>Special Collection</b><small>Elegant & Beautiful</small></Link><Link href="/products"><span>🪶</span><b>Accessories</b><small>Mukut, Mala, etc.</small></Link><Link href="/products"><span>🎁</span><b>Gift Sets</b><small>For Your Loved Ones</small></Link></section>
   <section className="section container" id="products"><div className="collection-title"><span>— &nbsp; OUR COLLECTION &nbsp; —</span><h2>Explore Our Products</h2><p>ठाकुर जी के लिए प्रेम से चुनी गई पोशाकें</p></div>{loading?<div className="empty-products"><span>🛍️</span><h3>Products load हो रहे हैं…</h3></div>:products.length===0?<div className="empty-products"><span>🛍️</span><h3>No products yet</h3><p>Products will appear here after the admin adds them.</p><Link className="btn" href="/products">Check Back Soon</Link></div>:<div className="grid">{products.slice(0,8).map(p=><article className="card" key={p.id}><Link href={'/products/'+p.id}><div className="pic">{p.image_url?<img src={p.image_url} alt={p.name}/>:<span>🦚</span>}</div></Link><div className="info"><span className="pill">Available</span><h3>{p.name}</h3><div className="price">₹{p.price}</div><Link className="btn" href={'/products/'+p.id}>View Product</Link></div></article>)}</div>}</section>
   <section className="values container"><p className="quote">“भारतीय संस्कृति की खूबसूरती, अब आपके wardrobe में”</p><div><span>🍃<b>Traditional Wear</b><small>Timeless elegance</small></span><span>☆<b>Premium Quality</b><small>Comfort & style</small></span><span>♡<b>Made with Care</b><small>For our culture</small></span><span>🪶<b>Wear Your Roots</b><small>Be proud, Be Indian</small></span></div></section>
  </main>
  <footer className="footer"><div className="container"><h2>🪶 Shri Krishna Vastra</h2><p>Parampara • Poshak • Prem</p><p className="muted">© 2026 Shri Krishna Vastra. All rights reserved.</p></div></footer>
 </>
}
