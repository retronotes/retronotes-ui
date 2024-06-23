'use server';
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client"

export async function createRetroAction(
    prevState: {
        message: string;
    },
    formData: FormData,
) {
    const schema = z.object({
        retroname: z.string().min(1, "retro name is required"),
        userid: z.string().min(1, "User ID is required")
    })

    try {
        const parse = schema.parse({
            retroname: formData.get('retroname'),
            userid: formData.get('userid')
        })

        if (!parse) {
            return { message: "Failed to Create Retro" }
        }

        const data = parse;
        const prisma = new PrismaClient();
        const newRetro = await prisma.retro.create({
            data: {
                user_id: data.userid,
                retro_name: data.retroname,
                what_went_well: [],
                what_went_wrong: [],
                action_item: [],
            },
        });
        revalidatePath("/board");
        return {
            message: `Added Retro ${newRetro.retro_name} `
        }
    } catch (err) {
        return {
            message: `Failed to create retro`
        }
    }
}

export async function deleteRetroAction(prevState:{message:string},formData:FormData){
    try{
      console.log("retro_id")
    }catch(error){

    }

    return {
        message:""
    }
    
}