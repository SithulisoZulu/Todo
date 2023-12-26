import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const task = formData.get("task")?.toString();
  const date = formData.get("date")?.toString();
//   const isImportant = formData.get("isImportant") === "on";

  if (!task || !date) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }
  try {
    const db = getFirestore(app);
    const tasksRef = db.collection("tasks");
    await tasksRef.add({
      task,
      date,
    });
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
  return redirect("/Todo");
};