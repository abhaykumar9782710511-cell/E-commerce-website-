import {NextResponse} from 'next/server'
import {createClient} from '@supabase/supabase-js'
export async function GET(){try{const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);const {data,error}=await db.from('categories').select('id,name,slug').order('name');if(error)throw error;return NextResponse.json({categories:data||[]})}catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Unable to load categories.'},{status:500})}}
