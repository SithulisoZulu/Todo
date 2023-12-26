import type { APIRoute } from "astro";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { app } from "../../../firebase/server";

export const POST: APIRoute = async ({ request, redirect }) => {
  const auth = getAuth(app);
  const db = getFirestore(app);

  /* Get form data */
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const name = formData.get("name")?.toString();
  const surname = formData.get("surname")?.toString();

  if (!email || !password || !name) {
    return new Response(
      "Missing form data",
      { status: 400 }
    );
  }

  /* Create user */
  try {
    await auth.createUser({
      email,
      password,
      displayName: name,
    });

    const usersRef = db.collection("users");
    await usersRef.add({
      name,
      surname,
      email,    
    });
    
  } catch (error: any) {
    return new Response(
      "Something went wrong" + error,
      { status: 400 }
    );
  }
  return redirect("../../auth/signin");
};