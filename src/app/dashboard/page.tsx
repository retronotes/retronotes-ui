/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useState, useEffect } from 'react';
import ListRetroNotes from '@/components/ListRetroNotes';
import CreateNewRetro from '@/components/CreateNewRetro';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useUser } from '@clerk/nextjs';
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
    const { user } = useUser();
    const [retroNotes, setRetroNotes] = useState([]);
    const { toast } = useToast();

    const fetchRetroNotes = async () => {
        if (!user?.id) return;
        const response = await fetch(`/api/retronote/${user.id}`, {
            method: 'GET',
            cache: 'no-cache'
        });

        if (response.ok) {
            const data = await response.json();
            setRetroNotes(data);
        } else {
            const errorData = await response.json();
            toast({
                title: "Error: Retro Notes",
                description: `${errorData.error}`,
            });
        }
    };

    useEffect(() => {
        fetchRetroNotes();
    }, [user?.id]);

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-semibold md:text-2xl">
                        Retro Notes
                    </h1>
                </div>
                <div>
                    <Dialog>
                        <DialogTrigger className="border p-2 rounded-lg hover:border-gray-400">
                            + New Retro Note
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Retro Note</DialogTitle>
                            </DialogHeader>
                            <CreateNewRetro user_id={user?.id} onCreate={fetchRetroNotes} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <ListRetroNotes retroNotes={retroNotes} />
        </main>
    );
};

export default Dashboard;
