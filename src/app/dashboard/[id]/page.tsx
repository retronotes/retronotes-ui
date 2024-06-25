/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus, EllipsisVertical, Edit, Trash2, Trophy, TreePalm, Rocket } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import RetroNoteFound from "@/components/RetroNotFound";
import ButtonSlot from "@/components/ButtonsSlot";
import { UserButton } from "@clerk/nextjs";
import RetroSkeleton from "@/components/ui/retro-skeleton";
import RetroNameSkeleton from "@/components/ui/retro-name-skeleton";
type RetroNote = {
    id: string;
    user_id: string;
    retro_name: string;
    what_went_well: string[];
    what_went_wrong: string[];
    action_item: string[];
};

export default function Page() {
    const { id } = useParams<{ id: string }>();
    const { toast } = useToast();
    const wsClient = useRef<WebSocket | null>(null);
    const [retroNote, setRetroNote] = useState<RetroNote>({
        id: '',
        user_id: '',
        retro_name: '',
        what_went_well: [],
        what_went_wrong: [],
        action_item: [],
    });

    const [isError, setIsError] = useState(false);

    const [newItem, setNewItem] = useState<{ [key: string]: string }>({
        what_went_well: '',
        what_went_wrong: '',
        action_item: '',
    });

    const [editing, setEditing] = useState<{ section: string, index: number | null }>({
        section: '',
        index: null,
    });

    const [showInput, setShowInput] = useState<{ [key: string]: boolean }>({
        what_went_well: false,
        what_went_wrong: false,
        action_item: false,
    });

    const [dropdown, setDropdown] = useState<{ section: string, index: number | null }>({
        section: '',
        index: null,
    });


    const fetchRetroNotes = async () => {
        const [user_id, retro_id] = id.split('-');
        try {
            const response = await fetch(`/api/retronote/${user_id}/${retro_id}`, {
                method: 'GET',
                cache: 'no-cache'
            });

            if (response.ok) {
                const data = await response.json();
                setRetroNote(data);
            } else {
                const errorData = await response.json();
                setIsError(true)
                toast({
                    title: `Error: Retro Note`,
                    description: `${errorData.error}`,
                });
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to fetch retro notes.',
            });
        }
    };

    useEffect(() => {
        fetchRetroNotes();
    }, []);

    const sendRetroNote = (updatedRetroNote: RetroNote) => {
        if (wsClient.current && wsClient.current.readyState === WebSocket.OPEN) {
            wsClient.current.send(JSON.stringify(updatedRetroNote));
        } else {
            console.warn('WebSocket is not open. Ready state:', wsClient.current?.readyState);
        }
    };

    useEffect(() => {
        if (!retroNote.id) return;
        const socket = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`);
        wsClient.current = socket;

        socket.onopen = () => {
            // Send initial retroNote after connection is open
            socket.send(JSON.stringify(retroNote));
        };

        socket.onclose = () => {
            console.log('WebSocket Client Disconnected');
        };

        socket.onmessage = (message) => {
            const handleMessage = (data: string) => {
                try {
                    const receivedData = JSON.parse(data);
                    setRetroNote((prevRetroNote) => ({
                        ...prevRetroNote,
                        ...receivedData,
                    }));
                } catch (error) {
                }
            };

            if (message.data instanceof Blob) {
                const reader = new FileReader();
                reader.onload = () => {
                    handleMessage(reader.result as string);
                };
                reader.readAsText(message.data);
            } else {
                handleMessage(message.data);
            }
        };

        return () => {
            socket.close();
        };
    }, [retroNote?.id]);

    const handleAddItem = (section: keyof RetroNote) => {
        if (newItem[section] !== '') {
            const updatedRetroNote = {
                ...retroNote,
                [section]: [...retroNote[section], newItem[section]],
            };
            setRetroNote(updatedRetroNote);
            sendRetroNote(updatedRetroNote);
            setNewItem((prev) => ({ ...prev, [section]: '' }));
            setShowInput((prev) => ({ ...prev, [section]: false }));
        }
    };

    const handleEditItem = (section: keyof RetroNote, index: number) => {
        const editedItems = [...retroNote[section]];
        editedItems[index] = newItem[section];
        const updatedRetroNote = {
            ...retroNote,
            [section]: editedItems,
        };
        setRetroNote(updatedRetroNote);
        sendRetroNote(updatedRetroNote);
        setNewItem((prev) => ({ ...prev, [section]: '' }));
        setEditing({ section: '', index: null });
    };

    const handleDeleteItem = (section: keyof RetroNote, index: number) => {
        const updatedItems = (retroNote[section] as string[]).filter((_, i) => i !== index);
        const updatedRetroNote = {
            ...retroNote,
            [section]: updatedItems,
        };
        setRetroNote(updatedRetroNote);
        sendRetroNote(updatedRetroNote);
    };

    const handleDropdownClick = (section: string, index: number) => {
        setDropdown({ section, index });
    };

    const handleDropdownAction = (action: string, section: keyof RetroNote, index: number) => {
        if (action === 'edit') {
            setEditing({ section, index });
            setNewItem((prev) => ({ ...prev, [section]: retroNote[section][index] }));
        } else if (action === 'delete') {
            handleDeleteItem(section, index);
        }
        setDropdown({ section: '', index: null });
    };

    return (

        <div className="flex flex-col">
            <header className="sticky justify-between top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
                <h1 className="text-2xl tracking-wide font-light uppercase">

                    {retroNote?.retro_name === "" ? <RetroNameSkeleton /> : retroNote?.retro_name}
                </h1>
                <div className='flex gap-3' >
                    <ButtonSlot />
                    <UserButton />
                </div>

            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                {
                    isError ? <RetroNoteFound />
                        : <div className="h-full">
                            <ResizablePanelGroup direction="horizontal" className="min-h-[200px] rounded-lg border">
                                <ResizablePanel>
                                    <div className="h-full p-3">
                                        <div className="flex justify-between">
                                            <h1 className="text-xl mb-2 subpixel-antialiased font-light tracking-wide capitalize">
                                                Start doing
                                            </h1>
                                            <div>
                                                <Button variant="outline" size="icon" className="mt-[-2px] h-8 w-8" onClick={() => setShowInput((prev) => ({ ...prev, what_went_well: !prev.what_went_well }))}>
                                                    <Plus className="h-4 w-4" />
                                                    <span className="sr-only">Add item</span>
                                                </Button>
                                            </div>
                                        </div>
                                        <Separator />
                                        <div className="mt-3">
                                            {retroNote?.retro_name === "" ? <RetroSkeleton /> :
                                                retroNote.what_went_well.map((item, index) => (
                                                    <div className="rounded-sm border border-dashed p-2 m-1 flex justify-between items-center" key={index}>
                                                        {editing.section === 'what_went_well' && editing.index === index ? (
                                                            <input
                                                                type="text"
                                                                className="flex-1 border-none bg-zinc-900 mr-1"
                                                                value={newItem.what_went_well}
                                                                onChange={(e) => setNewItem((prev) => ({ ...prev, what_went_well: e.target.value }))}
                                                                onBlur={() => handleEditItem('what_went_well', index)}
                                                            />
                                                        ) : (
                                                            <span className="flex-1">{item}</span>
                                                        )}

                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger onClick={() => handleDropdownClick('what_went_well', index)}>
                                                                <div className='border border-transparent  rounded-sm hover:border-gray-400'>
                                                                    <EllipsisVertical className="h-4 w-4" />
                                                                </div>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent>
                                                                <DropdownMenuItem onClick={() => handleDropdownAction('edit', 'what_went_well', index)}>
                                                                    <Edit className="h-4 w-4 inline-block mr-2" /> Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => handleDropdownAction('delete', 'what_went_well', index)}>
                                                                    <Trash2 className="h-4 w-4 inline-block mr-2" /> Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                ))}
                                            {showInput.what_went_well && (
                                                <div className="rounded-sm border border-dashed p-2 m-1 flex justify-between items-center">
                                                    <input
                                                        type="text"
                                                        className="flex-1 border-none bg-zinc-900 mr-1"
                                                        placeholder="Add new item"
                                                        value={newItem.what_went_well}
                                                        onChange={(e) => setNewItem((prev) => ({ ...prev, what_went_well: e.target.value }))}
                                                        onBlur={() => handleAddItem('what_went_well')}
                                                    />
                                                </div>
                                            )
                                            }
                                        </div>
                                    </div>
                                </ResizablePanel>
                                <ResizableHandle withHandle />
                                <ResizablePanel>
                                    <div className="h-full p-3">
                                        <div className="flex justify-between">
                                            <h1 className="text-xl mb-2 subpixel-antialiased font-light tracking-wide capitalize">
                                                Stop doing / Issues / Should Change
                                            </h1>
                                            <div>
                                                <Button variant="outline" size="icon" className="mt-[-2px] h-8 w-8" onClick={() => setShowInput((prev) => ({ ...prev, what_went_wrong: !prev.what_went_wrong }))}>
                                                    <Plus className="h-4 w-4" />
                                                    <span className="sr-only">Add item</span>
                                                </Button>
                                            </div>
                                        </div>
                                        <Separator />
                                        <div className="mt-3">
                                            {retroNote?.retro_name === "" ? <RetroSkeleton /> :
                                                retroNote?.what_went_wrong.map((item, index) => (
                                                    <div className="rounded-sm border border-dashed p-2 m-1 flex justify-between items-center" key={index}>
                                                        {editing.section === 'what_went_wrong' && editing.index === index ? (
                                                            <input
                                                                type="text"
                                                                className="flex-1 border-none bg-zinc-900 mr-1"
                                                                value={newItem.what_went_wrong}
                                                                onChange={(e) => setNewItem((prev) => ({ ...prev, what_went_wrong: e.target.value }))}
                                                                onBlur={() => handleEditItem('what_went_wrong', index)}
                                                            />
                                                        ) : (
                                                            <span className="flex-1">{item}</span>
                                                        )}

                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger onClick={() => handleDropdownClick('what_went_wrong', index)}>
                                                                <div className='border border-transparent  rounded-sm hover:border-gray-400'>
                                                                    <EllipsisVertical className="h-4 w-4" />
                                                                </div>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent>
                                                                <DropdownMenuItem onClick={() => handleDropdownAction('edit', 'what_went_wrong', index)}>
                                                                    <Edit className="h-4 w-4 inline-block mr-2" /> Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => handleDropdownAction('delete', 'what_went_wrong', index)}>
                                                                    <Trash2 className="h-4 w-4 inline-block mr-2" /> Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                ))}
                                            {showInput.what_went_wrong && (
                                                <div className="rounded-sm border border-dashed p-2 m-1 flex justify-between items-center">
                                                    <input
                                                        type="text"
                                                        className="flex-1 border-none bg-zinc-900 mr-1"
                                                        placeholder="Add new item"
                                                        value={newItem.what_went_wrong}
                                                        onChange={(e) => setNewItem((prev) => ({ ...prev, what_went_wrong: e.target.value }))}
                                                        onBlur={() => handleAddItem('what_went_wrong')}
                                                    />
                                                </div>
                                            )
                                            }
                                        </div>
                                    </div>
                                </ResizablePanel>
                                <ResizableHandle withHandle />
                                <ResizablePanel>
                                    <div className="h-full p-3">
                                        <div className="flex justify-between">
                                            <h1 className="text-xl mb-2 subpixel-antialiased font-light tracking-wide capitalize">
                                                Keep doing / Outcomes and success
                                            </h1>

                                            <div>
                                                <Button variant="outline" size="icon" className="mt-[-2px] h-8 w-8" onClick={() => setShowInput((prev) => ({ ...prev, action_item: !prev.action_item }))}>
                                                    <Plus className="h-4 w-4" />
                                                    <span className="sr-only">Add item</span>
                                                </Button>
                                            </div>
                                        </div>
                                        <Separator />
                                        <div className="mt-3">
                                            {retroNote?.retro_name === "" ? <RetroSkeleton /> :
                                                retroNote.action_item.map((item, index) => (
                                                    <div className="rounded-sm border border-dashed p-2 m-1 flex justify-between items-center" key={index}>
                                                        {editing.section === 'action_item' && editing.index === index ? (
                                                            <input
                                                                type="text"
                                                                className="flex-1 border-none bg-zinc-900 mr-1"
                                                                value={newItem.action_item}
                                                                onChange={(e) => setNewItem((prev) => ({ ...prev, action_item: e.target.value }))}
                                                                onBlur={() => handleEditItem('action_item', index)}
                                                            />
                                                        ) : (
                                                            <span className="flex-1">{item}</span>
                                                        )}

                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger onClick={() => handleDropdownClick('action_item', index)}>
                                                                <div className='border border-transparent  rounded-sm hover:border-gray-400'>
                                                                    <EllipsisVertical className="h-4 w-4" />
                                                                </div>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent>
                                                                <DropdownMenuItem onClick={() => handleDropdownAction('edit', 'action_item', index)}>
                                                                    <Edit className="h-4 w-4 inline-block mr-2" /> Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => handleDropdownAction('delete', 'action_item', index)}>
                                                                    <Trash2 className="h-4 w-4 inline-block mr-2" /> Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                ))}
                                            {showInput.action_item && (
                                                <div className="rounded-sm border border-dashed p-2 m-1 flex justify-between items-center">
                                                    <input
                                                        type="text"
                                                        className="flex-1 border-none bg-zinc-900 mr-1"
                                                        placeholder="Add new item"
                                                        value={newItem.action_item}
                                                        onChange={(e) => setNewItem((prev) => ({ ...prev, action_item: e.target.value }))}
                                                        onBlur={() => handleAddItem('action_item')}
                                                    />
                                                </div>
                                            )
                                            }
                                        </div>
                                    </div>
                                </ResizablePanel>
                            </ResizablePanelGroup>
                        </div>
                }
            </div>
        </div>

    );
}
