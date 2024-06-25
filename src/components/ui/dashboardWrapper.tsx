import { PrismaClient } from "@prisma/client"
import Link from "next/link";
import CreateRetro from "./createretro";
import RetroButtonWrapper from "./retro-button-wrapper";


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
                <div key={idx} className="rounded-lg border shadow-sm mr-3 mb-3 cursor-pointer hover:border-slate-400 flex flex-col">
                    <RetroButtonWrapper retroId={retro?.id}/>
                    <Link href={`/dashboard/${retro?.user_id}-${retro?.id}`}>
                        <div className="h-[168px] w-[200px] flex justify-center items-center">
                            <h1 className="text-center p-3">{retro?.retro_name} </h1>
                        </div>
                    </Link>
                </div>
            ))}
        </div>

    </>)
}