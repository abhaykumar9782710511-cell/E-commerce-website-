export type CartItem={id:string;name:string;price:number;image?:string;qty:number;size?:string}
const KEY='krishna-cart'
export function getCart():CartItem[]{if(typeof window==='undefined')return[];try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}}
export function saveCart(items:CartItem[]){if(typeof window!=='undefined')localStorage.setItem(KEY,JSON.stringify(items))}
export function addToCart(item:Omit<CartItem,'qty'>){const cart=getCart();const i=cart.findIndex(x=>x.id===item.id&&x.size===item.size);if(i>=0)cart[i].qty+=1;else cart.push({...item,qty:1});saveCart(cart);return cart}
export function cartTotal(cart:CartItem[]){return cart.reduce((s,x)=>s+x.price*x.qty,0)}
