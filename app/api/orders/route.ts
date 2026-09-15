import {NextResponse} from 'next/server'
import {createClient} from '@supabase/supabase-js'
import {createServerClient} from '@supabase/ssr'
import {cookies} from 'next/headers'

async function getUserId(){try{const store=await cookies();const client=createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,{cookies:{getAll(){return store.getAll()},setAll(){}}});const {data:{user}}=await client.auth.getUser();return user?.id||null}catch{return null}}
export async function POST(req:Request){
 try{
  const body=await req.json(); const {items,address,payment_method}=body
  if(!Array.isArray(items)||items.length===0||!address?.name||!address?.phone||!address?.line1||!address?.city||!address?.pincode)return NextResponse.json({error:'Please complete all required fields.'},{status:400})
  if(!['cod','online'].includes(payment_method))return NextResponse.json({error:'Invalid payment method.'},{status:400})
  for(const item of items){if(!item?.id||!Number.isInteger(Number(item.qty))||Number(item.qty)<1||Number(item.qty)>99)return NextResponse.json({error:'Invalid product quantity.'},{status:400})}
  const supabase=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE_KEY!); const ids=[...new Set(items.map((x:{id:string})=>x.id))]
  const {data:products,error}=await supabase.from('products').select('id,name,price,stock').in('id',ids); if(error)throw error
  let subtotal=0; const orderItems:{product_id:string;product_name:string;quantity:number;price:number;variant:string|null}[]=[]
  for(const item of items){const p=products?.find(x=>x.id===item.id);const qty=Number(item.qty);if(!p||p.stock<qty)return NextResponse.json({error:`${p?.name||'Product'} is out of stock.`},{status:409});subtotal+=Number(p.price)*qty;orderItems.push({product_id:p.id,product_name:p.name,quantity:qty,price:Number(p.price),variant:item.size||null})}
  const shipping=subtotal>=499?0:49; const total=subtotal+shipping; const orderNumber=`SKV-${Date.now().toString().slice(-8)}`; const user_id=await getUserId()
  const {data:order,error:orderError}=await supabase.from('orders').insert({user_id,order_number:orderNumber,status:'pending',payment_status:payment_method==='cod'?'cod':'pending',subtotal,shipping,total,address}).select('id,order_number,total').single(); if(orderError)throw orderError
  const {error:itemError}=await supabase.from('order_items').insert(orderItems.map(x=>({...x,order_id:order.id}))); if(itemError){await supabase.from('orders').delete().eq('id',order.id);throw itemError}
  return NextResponse.json({order_id:order.id,order_number:order.order_number,total,payment_required:payment_method==='online',customer_id:user_id})
 }catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Unable to place order.'},{status:500})}
}
