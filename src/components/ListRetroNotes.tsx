/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Ellipsis } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
type RetroNote = {
    id: string,
    user_id: string,
    retro_name: string,
    what_went_well: string[],
    what_went_wrong: string[],
    action_item: string[],
}

type ListRetroNotesProp = {
    retroNotes: RetroNote[],
    onDelete: (user_id: string, id: string) => void
}


const ListRetroNotes = ({ retroNotes, onDelete }: ListRetroNotesProp) => {
    return (
        <div className="flex flex-wrap p-2">
            {retroNotes.map((retro, idx) => (
                <Link key={idx} href={`/dashboard/${retro?.user_id}-${retro?.id}`}>
                    <div
                        className='rounded-lg border h-[70px] w-[400px] shadow-sm p-5 mr-3 cursor-pointer hover:border-slate-400'
                    >
                        <div className='flex justify-between'>
                            <div>{retro?.retro_name}</div>
                            <div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <div className='border border-transparent  px-1 rounded-sm hover:border-gray-400'>
                                            <Ellipsis className="h-4 w-4" />
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem disabled>Edit</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => onDelete(retro?.user_id, retro?.id)}>Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </Link>

            ))}
        </div>
    );
};

export default ListRetroNotes;
