'use client'
import { extractUserRetroIds } from '../utils/utils'
import { usePathname } from "next/navigation"
import CopyUrlButton from './ui/copy-url-button'
import DownloadCSVButton from './ui/downlode-csv-button'
let CURRENT_URL = ""
export default function ButtonSlot() {
    const pathname: string = usePathname()
    if (typeof window !== 'undefined' && window.location.origin) {
        CURRENT_URL = window.location.origin + pathname;
    }
    const { user_id, retro_id } = extractUserRetroIds(pathname)
    return (
        <>
            {pathname !== "/dashboard" ?
                <>
                    <CopyUrlButton url={CURRENT_URL}/>
                     <DownloadCSVButton user_id={user_id} retro_id={retro_id}/>
                  
                </>
                : null
            }
        </>
    )
}