'use client'
import {
    Copy,
    Check,
} from "lucide-react"
import { Button } from "./button"
import { useState } from "react"
export default function CopyUrlButton({url}:{url:string}){
    const [isCopied, setIsCopied] = useState(false)
    const copylink = () => {
        setIsCopied(true)
        navigator.clipboard.writeText(url)
        setTimeout(()=>{
            setIsCopied(false)
        },3000)
    }
    return(
        <Button size="sm" variant="secondary" onClick={copylink} >
        {isCopied ? <><Check color="#00ff33" className="mr-2 h-4 w-4" /> Copied</>
            : <> <Copy className="mr-2 h-4 w-4" /> Share</>}
         </Button>
    )
}