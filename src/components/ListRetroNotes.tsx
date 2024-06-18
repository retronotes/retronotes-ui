/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useState, useEffect, Suspense } from 'react';
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { useUser } from '@clerk/nextjs';
import { useToast } from "@/components/ui/use-toast"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import CreateNewRetro from './CreateNewRetro';

type RetroNotes = {
    id: string,
    user_id: string,
    retro_name: string,
    what_went_well: string[],
    what_went_wrong: string[],
    action_item: string[],
}
type ListRetroNotesProp={
    user_id: null | undefined | string
}
const ListRetroNotes = ({user_id}:ListRetroNotesProp) => {
    const { toast } = useToast()
    const { user } = useUser();
    const [retroNotes, setRetroNotes] = useState<RetroNotes[]>([]);

    const getRetroNotes = async () => {

        const response = await fetch(`/api/retronote/${user_id}`, {
            method: 'GET',
            cache:'no-cache'
        });

        if (response.ok) {
            const data = await response.json();
            setRetroNotes(data)
        } else {
            const errorData = await response.json();
            toast({
                title: "Error: Retro Notes",
                description: `${errorData.error}`,
            })
        }
    }

    useEffect(() => {
        if (user_id != undefined) {
            getRetroNotes()
        }
    }, [user_id])

    return (
        <>
            {retroNotes.length > 0 ?
                <div className="flex  flex-wrap p-5 rounded-lg border border-dashed shadow-sm">
                    {retroNotes?.map((retro) => (
                        <div
                            key={retro.id}
                            className='rounded-lg border h-[70px] w-[400px] shadow-sm p-5 m-2 cursor-pointer  hover:border-slate-400'
                        >
                            <div className='flex justify-between'>
                                <div>{retro.retro_name} </div>
                                <div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button type="button" className='border-transparent h-6 px-1 rounded-md ' variant="outline">
                                                <Ellipsis className=" h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem disabled>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                :
                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">

                    <div className="flex flex-col w-full items-center gap-1 text-center">
                        <h3 className="text-7xl font-bold tracking-tight">
                            You have no retro notes
                        </h3>
                        <p className="text-xl text-muted-foreground">
                            Create your first retro note.
                        </p>
                        <CreateNewRetro user_id={user?.id} />
                    </div>
                </div>

            }
        </>

    );
};

export default ListRetroNotes;
