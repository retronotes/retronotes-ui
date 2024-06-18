/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import ListRetroNotes from '@/components/ListRetroNotes';
import CreateNewRetro from '@/components/CreateNewRetro';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useUser } from '@clerk/nextjs';


const Dashboard = () => {
    const {user} =  useUser()
  
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
                            <CreateNewRetro user_id={user?.id} />
                        </DialogContent>
                    </Dialog>

                </div>
            </div>
            <ListRetroNotes user_id={user?.id}/>
        </main>
    );
};

export default Dashboard;
