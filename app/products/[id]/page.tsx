'use client'
import {useState} from 'react'
import Link from 'next/link'
import {addToCart} from '@/lib/cart'

const data:any={
 morpankh:{name:'मोर मुकुट पोशाक',price:299,old:399,emoji:'🦚',desc:'सुंदर पारंपरिक कृष्ण जी पोशाक, दैनिक पूजा और विशेष श्रृंगार के लिए।'},
 pitambar:{name:'पीताम्बर सेट',price:249,old:329,emoji:'✨',desc:'प्रीमियम कपड़े से तैयार पीताम्बर सेट, हल्का और आरामदायक।'},
 laddu:{name:'लड्डू गोपाल पोशाक',price:349,old:449,emoji:'🪷',desc:'लड्डू गोपाल जी के लिए मनमोहक festive पोशाक।'},
 radha:{name:'राधा-कृष्ण श्रृंगार सेट',price:499,old:699,emoji:'🪔',desc:'राधा-कृष्ण श्रृंगार के लिए premium matching set।'},
 phool:{name:'फूलों वाली पोशाक',price:299,old:399,emoji:'🌸',desc:'फूलों से प्रेरित सुंदर रंगीन पोशाक।'},
 utsav:{name:'मखमली उत्सव पोशाक',price:599,old:799,emoji:'👑',desc:'उत्सव और विशेष अवसरों के लिए royal velvet finish।'},
 bansuri:{name:'बांसुरी थीम सेट',price:399,old:499,emoji:'🎵',desc:'कान्हा जी की बांसुरी theme से inspired आकर्षक सेट।'},
 festival:{name:'त्योहार विशेष पोशाक',price:449,old:599,emoji:'🌼',desc:'त्योहारों के लिए विशेष रूप से चुना गया सुंदर सेट।'}
}
export default function ProductDetail({params}:{params:{id:string}}){const p=data[params.id]||data.morpankh;const [qty,setQty]=useState(1);const [added,setAdded]=useState(false);function add(){for(let i=0;i<qty;i++)addToCart({id:params.id,name:p.name,price:p.price} as any);setAdded(true)}return <main className="container section"><Link href="/products" className="muted">← Back to collection</Link><div className="detail"><div className="detailpic">{p.emoji}</div><div className="detailinfo"><span className="pill">⭐ 4.8 • Best Seller</span><h1>{p.name}</h1><p className="detailprice">₹{p.price} <del>₹{p.old}</del> <span>25% OFF</span></p><p>{p.desc}</p><hr/><p>🚚 Free delivery on eligible orders<br/>💳 COD + Online Payment<br/>🔒 Secure checkout</p><div className="qty"><button onClick={()=>setQty(Math.max(1,qty-1))}>−</button><b>{qty}</b><button onClick={()=>setQty(qty+1)}>+</button></div><button className="btn" onClick={add}>{added?'✓ Added to Cart':'Add to Cart'}</button> <Link className="btn secondary" href="/cart">Go to Cart</Link></div></div></main>}
