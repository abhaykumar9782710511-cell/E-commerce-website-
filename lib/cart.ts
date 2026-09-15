export type CartItem={id:string;name:string;price:number;image?:string;qty:number;size?:string}
const KEY='krishna-cart'
export function getCart():CartItem[]{if(typeof window==='undefined')return[];try{const raw=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(raw)?raw.filter(x=>x&&x.id&&Number(x.qty)>0).map(x=>({...x,price:Number(x.price)||0,qty:Math.max(1,Math.floor(Number(x.qty)||1))})):[]}catch{return[]}}
export function saveCart(items:CartItem[]){if(typeof window!=='undefined')localStorage.setItem(KEY,JSON.stringify(items))}
export function addToCart(item:Omit<CartItem,'qty'>,quantity=1){const qty=Math.max(1,Math.floor(quantity));const cart=getCart();const i=cart.findIndex(x=>x.id===item.id&&x.size===item.size);if(i>=0)cart[i].qty+=qty;else cart.push({...item,qty});saveCart(cart);return cart}
export function cartTotal(cart:CartItem[]){return cart.reduce((s,x)=>s+Number(x.price)*Number(x.qty),0)}
