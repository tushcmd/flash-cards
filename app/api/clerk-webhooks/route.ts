import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { initializeFirebase } from "@/firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data;

    // Check if id is defined
    if (!id) {
      console.error("User ID is undefined");
      return NextResponse.json(
        { error: "User ID is undefined" },
        { status: 400 },
      );
    }
    try {
      const db = await initializeFirebase();
      const userDocRef = doc(db, "users", id);

      // Check if the user document already exists
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // User doesn't exist, create the document
        await setDoc(userDocRef, {
          email: payload.data.email_addresses[0].email_address,
          firstName: payload.data.first_name,
          lastName: payload.data.last_name,
          createdAt: new Date(),
        });
        console.log("User document created in Firestore");
      } else {
        console.log("User document already exists in Firestore");
      }
    } catch (error) {
      console.error("Error creating user document in Firestore:", error);
    }
  }

  return NextResponse.json({ message: "Received" }, { status: 200 });
}
