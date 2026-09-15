'use client'
import { useState } from 'react'
export default function Cart(){const [qty,setQty]=useState(1);const price=299;return <main className="container section"><a href="/products">← Continue shopping</a><h1>Your Cart 🛒</h1><div className="card"><div className="info"><h3>मोर मुकुट पोशाक</h3><p className="muted">Premium Krishna Ji vastra</p><button onClick={()=>setQty(Math.max(1,qty-1))}>−</button> <b>{qty}</b> <button onClick={()=>setQty(qty+1)}>+</button><p className="price">₹{price*qty}</p><a className="btn" href="/checkout">Proceed to Checkout</a></div></div></main>}
