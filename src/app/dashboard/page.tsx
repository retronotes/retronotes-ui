import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { currentUser } from '@clerk/nextjs/server';

export default async function Dashboard() {
    const user = await currentUser();
    
   
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">{user?.id}</h1>
            </div>
            <div
                className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
            >
                <div className="flex flex-col w-full items-center gap-1 text-center">
                    <h3 className="text-7xl font-bold tracking-tight">
                        You have no retro notes
                    </h3>
                    <p className="text-2xl text-muted-foreground">
                        Creating your first retro note.
                    </p>
                    <div className="flex w-full max-w-lg mt-2 items-center space-x-2 gap-1.5">
                            <Input type="text" className="text-lg" placeholder="retro name" />
                            <Button type="submit" variant="outline">
                                <Plus className="mr-2 h-4 w-4" />
                                Create
                            </Button>
                    </div>
                </div>
            </div>
        </main>
    )
}
