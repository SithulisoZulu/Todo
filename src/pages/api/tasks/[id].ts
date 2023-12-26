import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore(app);
const tasksRef = db.collection("tasks");

export const POST: APIRoute = async ({ params, redirect, request }) => {
  const formData = await request.formData();
  const task = formData.get("task")?.toString();
  const date = formData.get("date")?.toString();
//   const isBesttask = formData.get("isBesttask") === "on";

  if (!task || !date) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }

  if (!params.id) {
    return new Response("Cannot find task", {
      status: 404,
    });
  }

  try {
    await tasksRef.doc(params.id).update({
      task,
      date: Date,
    });
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
  return redirect("/Todo");
};

export const DELETE: APIRoute = async ({ params, redirect }) => {
  if (!params.id) {
    return new Response("Cannot find task", {
      status: 404,
    });
  }

  try {
    await tasksRef.doc(params.id).delete();
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
  return redirect("/dashboard");
};