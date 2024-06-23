'use client'

import { useFormState, useFormStatus } from "react-dom"
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react"
import { createRetroAction } from "@/actions/actions"

const initialState = {
    message: ""
}

function SubmitButton() {
    const { pending } = useFormStatus();
    if (pending) {
        return <Button variant="outline">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
        </Button>
    } else {
        return <Button type="submit" variant="default" className="mt-2">
            <Plus className="mr-2 h-4 w-4" />
            Create
        </Button>
    }
}

export default function CreateRetro({ userId }: { userId: string }) {
    const [state, formAction] = useFormState(createRetroAction, initialState)
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        if (state.message && state.message !== initialState.message) {
            setIsDialogOpen(false)
        }
    }, [state.message]);

    return (<>
            <div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger >
                        <div className='rounded-lg border h-[200px] w-[200px] shadow-sm p-5 mr-3 mb-3 cursor-pointer hover:border-slate-400 flex flex-col justify-center items-center'>
                            <div className="flex flex-col item-center justify-center">
                                <div> <Plus color="black" className="border  h-10 w-10 ml-5 mb-4 rounded-full bg-white" /></div>
                                <div>Create  New</div>
                            </div>
                        </div>
                    </DialogTrigger>
                    <DialogContent aria-describedby="New Retro Note">
                        <DialogHeader>
                            <DialogTitle>Create New Retro Note</DialogTitle>
                            <form action={formAction} className="flex w-full max-w-lg mt-2 items-center space-x-2 gap-1.5">
                                <input
                                    type="text"
                                    id="userid"
                                    name="userid"
                                    defaultValue={userId}
                                    hidden
                                />
                                <Input
                                    type="text"
                                    id="retroname"
                                    className="text-lg mt-3"
                                    name="retroname"
                                    placeholder="Eg: Google UI Team"
                                    required
                                />
                                <SubmitButton />
                            </form>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
    </>)
}