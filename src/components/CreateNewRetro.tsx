/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type CreateNewRetroProp = {
    user_id: null | undefined | string,
    onCreate: () => void
}

const CreateNewRetro = ({ user_id, onCreate }: CreateNewRetroProp) => {
    const { toast } = useToast();
    const [retroName, setRetroName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/retronote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: user_id, retro_name: retroName }),
        });

        if (response.ok) {
            const data = await response.json();
            toast({
                title: "Success: New Retro Note",
                description: `${data.message}`,
            });
            onCreate();
        } else {
            const errorData = await response.json();
            toast({
                title: "Error: New Retro Note",
                description: `${errorData.error}`,
            });
        }

        setRetroName('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex w-full max-w-lg mt-2 items-center space-x-2 gap-1.5">
            <Input
                type="text"
                className="text-lg"
                placeholder="Retro name"
                value={retroName}
                onChange={(e) => setRetroName(e.target.value)}
                required
            />
            <Button type="submit" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Create
            </Button>
        </form>
    );
};

export default CreateNewRetro;
