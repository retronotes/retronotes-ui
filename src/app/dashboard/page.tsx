import DashboardWrapper from "@/components/ui/dashboardWrapper";
import { auth } from "@clerk/nextjs/server";
export default function Board(){
    const {userId} = auth()
    if(userId){
        return(
            <div  className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
              <DashboardWrapper userId={userId}/>
            </div>
        )
    }
   
}