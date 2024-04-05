"use server";

import { revalidatePath } from "next/cache";
export default async function action() {
   
  try {
    revalidatePath("/favorites");
    return Response.json({ revalidated: true, now: Date.now() })
  } catch (error) {
    console.error(error);
  }
}
