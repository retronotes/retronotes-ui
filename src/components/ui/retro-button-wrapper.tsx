import { Ellipsis } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DeleteRetro from "./deleteretro";
export default function RetroButtonWrapper({retroId}:{retroId:string}) {
    return (
        <div className="flex justify-end pt-1 pr-3">
            <DropdownMenu>
                <DropdownMenuTrigger> <Ellipsis className="text-zinc-600 hover:text-zinc-100" /></DropdownMenuTrigger>
                <DropdownMenuContent>
                    {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
                    <DeleteRetro retroId={retroId}/>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}