import Link from "next/link"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"
export default function RetroNoteFound(){
    return (<>
   <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">No Retro Found</p>
      <Link href="/dashboard">
        <Button variant="outline">
            <Plus className="mr-2 h-4 w-4"/>
            Create New Retro
            </Button>
      </Link>
    </div>
    </>)
}