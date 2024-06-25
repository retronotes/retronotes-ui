'use client';
import {  DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteRetroAction } from "@/actions/actions";
import {useToast,toast } from "./use-toast";



const handleDelete = (retroId:string)=> { 
   deleteRetroAction(retroId).then((data)=> 
    toast({
        title: `Success: ${data.message}`
    })
  )
}
export default function DeleteRetro({ retroId }: { retroId: string }) {
    const { toast } = useToast();
    
   return(<DropdownMenuItem onClick={()=>handleDelete(retroId)}>Delete</DropdownMenuItem>)
}