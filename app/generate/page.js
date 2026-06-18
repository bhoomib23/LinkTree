'use client'

import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSearchParams } from 'next/navigation'

const page = () => {
    const searchparams=useSearchParams()
    // const [link, setlink] = useState("")
    // const [linktext, setlinktext] = useState("")
    const [links, setlinks] = useState([{ link: "", linktext: "" }])
    const [handle, sethandle] = useState(searchparams.get('handle'))
    const [pic, setpic] = useState("")
    const [desc, setdesc] = useState("")
    const handlechange = (index, link, linktext) => {
        setlinks((initiallink) => {
            return initiallink.map((item, i) => {
                if (i == index) {
                    return { link, linktext }
                }

                else {
                    return item
                }

            })
        })
    }

    const addlink = () => {
            setlinks(links.concat([{ link: "", linktext: "" }]))
        }
    const submitlinks = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "links": links,
            "handle": handle,
            "pic": pic,
            "desc": desc
        });
        console.log(raw);

        

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const r = await fetch("http://localhost:3000/api/add", requestOptions)
        const result = await r.json()
        // toast(result.message)
        if(result.success){
                 toast.success(result.message)
        }
        else{
            toast.error(result.message)
        }
        // setlink("")
        // setlinktext("")


    }
    return (
        <div className="bg-[#E9C0E9] min-h-screen grid grid-cols-2 pt-15">

            <div className="col1 flex flex-col text-gray-900 justify-center items-center">
                <div className="flex flex-col gap-5 my-8">
                    <h1 className='font-bold text-5xl'> Create your BitTree</h1>
                    <div className="item">
                        <h2 className='font-semibold text-2xl'>Step 1: Claim your Handle</h2>
                        <div className="mx-4">
                            <input value={handle || ''} onChange={e => { sethandle(e.target.value) }} className="bg-white my-2 px-4 py-2 focus:outline-pink-400 rounded-4xl" type="text" name=" " id="" placeholder='Choose a Handle' />
                        </div>
                    </div>
                    <div className="item">
                        <h2 className='font-semibold text-2xl'>Step 2: Add Links</h2>

                        {links && links.map((item, index) => {
                            return <div key={index} className="mx-4">
                                <input value={item.linktext || ''} onChange={e => { handlechange(index, item.link, e.target.value) }} className="bg-white my-2 mx-2 px-4 py-2 focus:outline-pink-400 rounded-4xl" type="text" name=" " id="" placeholder='Enter link text' />
                                <input value={item.link || ''} onChange={e => { handlechange(index, e.target.value, item.linktext) }} className="bg-white my-2 mx-2 px-4 py-2 focus:outline-pink-400 rounded-4xl" type="text" name=" " id="" placeholder='Enter link ' />
                            </div>
                        })}
                        <button onClick={() => addlink()} className="mx-2 bg-sky-900 text-white p-5 py-2 rounded-4xl font-bold"> + Add Link</button>
                    </div>
                    <div className="item">
                        <h2 className='font-semibold text-2xl'>Step 3: Add a picture and Description</h2>
                        <div className="mx-4 flex flex-col">
                            <input value={pic || ''} onChange={e => { setpic(e.target.value) }} className="bg-white my-2 mx-2 px-4 py-2 focus:outline-pink-400 rounded-4xl" type="text" name=" " id="" placeholder='Enter link to your Picture' />
                            <input value={desc || ''} onChange={e => { setdesc(e.target.value) }} className="bg-white my-2 mx-2 px-4 py-2 focus:outline-pink-400 rounded-4xl" type="text" name=" " id="" placeholder='Enter Description' />
                            <button disabled={pic=="" || handle=="" || links[0].linktext==""} onClick={() => { submitlinks() }} className="disabled:bg-slate-500 mx-2 bg-sky-900 text-white p-5 py-2 my-5 rounded-4xl w-fit font-bold">Create your BitLink</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col2 w-full h-screen bg-[#E9C0E9]">
                <img alt="Promotional Banner" className="h-full object-contain" src="/generate.png"></img> </div>

            <ToastContainer />
        </div>
    )
}

export default page
