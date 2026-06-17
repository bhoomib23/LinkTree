"use client"
import Image from "next/image";
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function Home() {
  const router=useRouter()
  const createtree=()=>{
    router.push(`/generate?handle=${text}`)
  }
  const [text, settext] = useState("")
  return (
    <main>
      <section className="bg-[#254f1a] min-h-[100vh] grid grid-cols-2">
       <div className="flex flex-col gap-4 justify-center ml-[10vw]">
       <p className="text-yellow-300 font-bold text-7xl">Everything you </p>
      <p className="text-yellow-300 font-bold text-7xl">are. In one,</p>
      <p className="text-yellow-300 font-bold text-7xl">simple link in bio.</p>      
      <p className="text-yellow-300 font-2xl"> Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
      <div className="input flex gap-5">
        <input value={text} onChange={()=>settext()} className="bg-white px-2 py-2 focus:outline-emerald-950 rounded-md" type="text" placeholder="Enter yor handle" />
        <button onClick={()=>createtree()} className="bg-pink-200 rounded-full font-semibold px-4 py-4"> Claim Now </button>
      </div>
        
       </div>
       <div className="flex flex-col justify-center item-center mr-[10vw]">
        <img src="/home.png" alt="home-image1"/>
       </div>
      </section>
      <section className="bg-red-500 min-h-[100vh]">
       <div className="bg-purple-500">
        
       </div>
       <div className=" ">

       </div>
      </section>
    </main>
  );
}
