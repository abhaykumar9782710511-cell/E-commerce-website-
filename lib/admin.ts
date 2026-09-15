import {createClient} from '@supabase/supabase-js'
import {cookies} from 'next/headers'
import {createServerClient} from '@supabase/ssr'

export async function requireAdmin(){
 const cookieStore=await cookies()
 const auth=createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,{cookies:{getAll:()=>cookieStore.getAll(),setAll:()=>{}}})
 const {data:{user}}=await auth.auth.getUser()
 if(!user)return {user:null,admin:false}
 const {data:profile}=await auth.from('profiles').select('role').eq('id',user.id).single()
 return {user,admin:profile?.role==='admin'}
}

export function adminDb(){return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE_KEY!)}
