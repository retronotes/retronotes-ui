'use client'

import { jsonToCsv, getOnlyRetroData, customHeaders, downloadCSVFile } from '../../utils/utils'
import {
    Download,
    Loader2
} from "lucide-react"
import { Button } from "./button"
import { useState } from "react"
export default function DownloadCSVButton({ user_id, retro_id }: { user_id: string, retro_id: string }) {
    const [isLoading, setIsLoading] = useState(false);


    const fetchRetroNotes = async (user_id: string, retro_id: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/retronote/${user_id}/${retro_id}`, {
                method: 'GET',
                cache: 'no-cache'
            });

            if (response.ok) {
                const data = await response.json();
                const retroNoteArray = getOnlyRetroData(data)
                const csvContent = jsonToCsv(retroNoteArray, customHeaders)
                downloadCSVFile(csvContent,data?.retro_name)
            } else {
                const errorData = await response.json();
                console.log("error", errorData)
            }
        } catch (error) {
            console.error('Error fetching retro notes:', error);
        } finally {
            setIsLoading(false);
        }
    };


    const DownlodeRetro = async () => {
        await fetchRetroNotes(user_id, retro_id);
    }
    return (
        <>
            {isLoading ? <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
            </Button>
                : <Button size="sm" variant="secondary" onClick={DownlodeRetro}>
                    <Download className="mr-2 h-4 w-4" /> Download
                </Button>
            }

        </>
    )
}