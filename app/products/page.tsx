'use client'
import {useMemo,useState} from 'react'
import Link from 'next/link'
import {addToCart} from '@/lib/cart'

const products = [
 {id:'morpankh',name:'मोर मुकुट पोशाक',price:299,oldPrice:399,tag:'Best Seller',emoji:'🦚'},
 {id:'pitambar',name:'पीताम्बर सेट',price:249,oldPrice:329,tag:'New',emoji:'✨'},
 {id:'laddu',name:'लड्डू गोपाल पोशाक',price:349,oldPrice:449,tag:'Popular',emoji:'🪷'},
 {id:'radha',name:'राधा-कृष्ण श्रृंगार सेट',price:499,oldPrice:699,tag:'Premium',emoji:'🪔'},
 {id:'phool',name:'फूलों वाली पोशाक',price:299,oldPrice:399,tag:'Trending',emoji:'🌸'},
 {id:'utsav',name:'मखमली उत्सव पोशाक',price:599,oldPrice:799,tag:'Premium',emoji:'👑'},
 {id:'bansuri',name:'बांसुरी थीम सेट',price:399,oldPrice:499,tag:'New',emoji:'🎵'},
 {id:'festival',name:'त्योहार विशेष पोशाक',price:449,oldPrice:599,tag:'Festive',emoji:'🌼'},
]

export default function Products(){
 const [q,setQ]=useState(''); const [added,setAdded]=useState('')
 const filtered=useMemo(()=>products.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())),[q])
 function add(p:any){addToCart({id:p.id,name:p.name,price:p.price,emoji:p.emoji} as any);setAdded(p.id);setTimeout(()=>setAdded(''),1200)}
 return <main className="container section">
  <div className="sectionhead"><div><span className="pill">🦚 Collection</span><h1>सभी कृष्ण पोशाकें</h1><p className="muted">ठाकुर जी के लिए सुंदर और पारंपरिक वस्त्र</p></div><div><input className="search" value={q} onChange={e=>setQ(e.target.value)} placeholder="🔎 Search products..."/><Link className="btn" href="/cart" style={{marginLeft:8}}>🛒 Cart</Link></div></div>
  <div className="grid">{filtered.map(p=><article className="card" key={p.id}><Link href={'/products/'+p.id}><div className="pic">{p.emoji}</div></Link><div className="info"><span className="pill">{p.tag}</span><h3>{p.name}</h3><div><span className="price">₹{p.price}</span> <span className="muted" style={{textDecoration:'line-through'}}>₹{p.oldPrice}</span></div><p className="muted">⭐ 4.8 • Premium fabric • COD available</p><button className="btn" onClick={()=>add(p)}>{added===p.id?'✓ Added':'Add to Cart'}</button></div></article>)}</div>
  {!filtered.length&&<div className="card info"><h3>Product नहीं मिला</h3><p className="muted">दूसरा नाम search करके देखें।</p></div>}
 </main>
}