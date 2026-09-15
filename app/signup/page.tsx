'use client'
import {useState} from 'react'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import {supabase} from '@/lib/supabase'

export default function Signup(){
 const router=useRouter(); const [name,setName]=useState(''); const [phone,setPhone]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [error,setError]=useState(''); const [loading,setLoading]=useState(false)
 async function submit(e:React.FormEvent){e.preventDefault();setError('');setLoading(true);if(!supabase){setError('Supabase अभी configure नहीं हुआ है।');setLoading(false);return}
  const {data,error}=await supabase.auth.signUp({email,password,options:{data:{full_name:name,phone}}});
  if(error){setError(error.message);setLoading(false);return}
  if(data.session) router.replace('/'); else setError('Account created. Please verify your email, then login.'); setLoading(false)
 }
 return <main className="container section" style={{maxWidth:560}}><Link href="/">← Store</Link><div className="card info" style={{marginTop:18}}><span className="pill">CREATE ACCOUNT</span><h1>Join Shri Krishna Vastra 🙏</h1><p className="muted">Create an account to checkout faster and track your orders.</p>{error&&<p><b>{error}</b></p>}<form className="form" onSubmit={submit}><div className="field"><label>Full name</label><input required value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"/></div><div className="field"><label>Phone</label><input required pattern="[0-9]{10}" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="10 digit mobile number"/></div><div className="field"><label>Email</label><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></div><div className="field"><label>Password</label><input required minLength={6} type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 6 characters"/></div><button className="btn" disabled={loading}>{loading?'Creating…':'Create Account'}</button></form><p className="muted">Already have an account? <Link href="/login">Login</Link></p></div></main>
}