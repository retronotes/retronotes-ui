import DashboardWrapper from "@/components/ui/dashboardWrapper";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
export default function Board(){
    const {userId} = auth()
    if(userId){
        return(
        <div className="flex flex-col">
            <header className="sticky justify-between top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
                <h1 className="text-2xl tracking-wide font-light uppercase">Retro Notes</h1>
                <div className='flex gap-3' >
                    <UserButton />
                </div>

            </header>
                <div  className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                <DashboardWrapper userId={userId}/>
                </div>
        </div>
            
        )
    }
   
}