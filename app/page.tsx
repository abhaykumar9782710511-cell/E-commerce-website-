const products = [
  { name:'मोर मुकुट पोशाक', price:'₹299', tag:'Best Seller', emoji:'🦚' },
  { name:'पीताम्बर सेट', price:'₹249', tag:'New', emoji:'✨' },
  { name:'लड्डू गोपाल पोशाक', price:'₹349', tag:'Popular', emoji:'🪷' },
  { name:'राधा-कृष्ण श्रृंगार सेट', price:'₹499', tag:'Premium', emoji:'🪔' },
]

export default function Home() {
  return <>
    <div className="top">🚚 पूरे भारत में सुरक्षित डिलीवरी • शुभ एवं सुंदर कृष्ण श्रृंगार वस्त्र</div>
    <header className="nav"><div className="container navin"><a className="logo" href="/">🦚 Shri Krishna Vastra</a><nav className="links"><a href="#products">Products</a><a href="#why">Why Us</a><a href="/admin">Admin</a></nav><input className="search" placeholder="Search products..." /></div></header>
    <main>
      <section className="hero"><div><span className="pill">श्री कृष्ण जी के लिए विशेष वस्त्र</span><h1>भक्ति में रंग,<br/>कृष्ण के संग।</h1><p>सुंदर, पारंपरिक और मनमोहक पोशाकें एवं श्रृंगार वस्त्र — आपके ठाकुर जी के लिए प्रेम से चुने हुए।</p><a className="btn" href="#products">अभी खरीदें →</a></div></section>
      <section className="section container" id="products"><div className="sectionhead"><h2>लोकप्रिय पोशाकें</h2><span className="muted">नई collection हर सप्ताह</span></div><div className="grid">{products.map(p=><article className="card" key={p.name}><div className="pic">{p.emoji}</div><div className="info"><span className="pill">{p.tag}</span><h3>{p.name}</h3><div className="price">{p.price}</div><p className="muted">Premium fabric • Multiple sizes</p><a className="btn" href="/products">View Product</a></div></article>)}</div></section>
      <section className="section container" id="why"><div className="features"><div className="feature"><h3>🙏 भक्तिभाव से चयन</h3><p className="muted">हर design को ठाकुर जी के श्रृंगार को ध्यान में रखकर चुना गया है।</p></div><div className="feature"><h3>📦 सुरक्षित पैकिंग</h3><p className="muted">आपके order की साफ-सुथरी और सुरक्षित packing।</p></div><div className="feature"><h3>💳 आसान checkout</h3><p className="muted">COD और online payment के लिए तैयार checkout flow।</p></div></div></section>
    </main>
    <footer className="footer"><div className="container"><h2>🦚 Shri Krishna Vastra</h2><p>श्री कृष्ण जी के सुंदर वस्त्र और श्रृंगार का आपका अपना store.</p><p className="muted">© 2026 Shri Krishna Vastra. All rights reserved.</p></div></footer>
  </>
}
