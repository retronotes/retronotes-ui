'use client'
import {
    Copy,
    Check,
    Download
} from "lucide-react"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"
import { useState } from "react"

let CURRENT_URL = ""
export default function ButtonSlot() {
    const pathname = usePathname()
    const [isCopied, setIsCopied] = useState(false)

    if (typeof window !== 'undefined' && window.location.origin) {
        CURRENT_URL = window.location.origin + pathname
        setTimeout(() => setIsCopied(false), 5000);
    }
    const copylink = () => {
        setIsCopied(true)
        navigator.clipboard.writeText(CURRENT_URL)
    }
    return (
        <>
            {pathname !== "/dashboard" ?
                <div className="flex gap-3">
                    <Button size="sm" variant="secondary" onClick={copylink} >
                        {isCopied ? <><Check color="#00ff33" className="mr-2 h-4 w-4" /> Copied</>
                            : <> <Copy className="mr-2 h-4 w-4" /> Copy</>}
                    </Button>

                    <Button size="sm" variant="secondary" disabled>
                        <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                </div>
                : null
            }
        </>
    )
}