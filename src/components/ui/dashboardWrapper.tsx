import { PrismaClient } from "@prisma/client"
import { Plus } from "lucide-react";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import CreateRetro from "./createretro";
// import { deleteRetroAction } from "@/actions/actions";
// import DeleteRetro from "./deleteretro";

export default async function DashboardWrapper({ userId }: { userId: string }) {
    const prisma = new PrismaClient();
    const retroNotes = await prisma.retro.findMany({
        where: {
            user_id: String(userId),
        },
        select: {
            id: true,
            user_id: true,
            retro_name: true,
        }
    });
    return (<>
     <h1 className="text-xl" >My Retros</h1>
        <div className="flex flex-wrap p-2">
           
            <CreateRetro userId={userId} />
            {retroNotes.reverse().map((retro, idx) => (
                <Link key={idx} href={`/dashboard/${retro?.user_id}-${retro?.id}`}>
                    <div className='rounded-lg border h-[200px] w-[200px] shadow-sm p-5 mr-3 mb-3 cursor-pointer hover:border-slate-400 flex flex-col justify-center items-center'>
                        <div className="text-center">{retro?.retro_name}</div>
                    </div>
                </Link>

            ))}
        </div>

    </>)
}