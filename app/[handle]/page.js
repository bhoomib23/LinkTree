import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation";

export default async function Page({ params }) {
    const handle = (await params).handle
    const client = await clientPromise;
    const db = client.db("bittree")
    const collection = db.collection("links")
    const item = await collection.findOne({ handle: handle })
    if(!item){
        return notFound
    }

    const item2 = {
        "_id": {
            "$oid": "6a3302c25e6722f7f678d5db"
        },
        "links": [
            {
                "link": "linkedin",
                "linktext": "https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile"
            }
        ],
        "handle": "bhoomi2",
        "pic": "https://avatars.githubusercontent.com/u/227202482?v=4"
    }
    return <div className="flex min-h-screen bg-purple-300 justify-center gap-4 items-start py-10">
        {item && <div className="photo flex flex-col items-center justify-center">
            <img src={item.pic} />
            <span className="font-bold text-xl">@{item.handle}</span>
            <span className="desc w-80 text-center ">{item.desc}</span>
            <div className="links">
                {item.links.map((item, index) => {
                    return <Link href={item.link} key={index} ><div className="bg-purple-100 py-4 px-2 min-w-96 flex justify-center shadow-lg rounded-md my-3">
                        {item.linktext}


                    </div>
                    </Link>
                })}
            </div>
        </div>
        }

    </div >
} 