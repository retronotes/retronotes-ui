'use client';
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useFormState } from "react-dom";
import { deleteRetroAction } from "@/actions/actions";
const initialState = {
    message: "",
}
export default function DeleteRetro({ retroId }: { retroId: string }) {
    const [state, formAction] = useFormState(deleteRetroAction, initialState)
    return <>
        <form action={formAction}>
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <input
                type="text"
                id="retroid"
                name="retroid"
                defaultValue={retroId}
                hidden
            />


        </form>
    </>

}