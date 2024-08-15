import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { doc, setDoc } from "firebase/firestore";
import { initializeFirebase } from "@/firebase/config";

export async function POST() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await initializeFirebase();
    const userDocRef = doc(db, "users", user.id);

    await setDoc(userDocRef, {
      email: user.emailAddresses[0].emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "User document created successfully" });
  } catch (error) {
    console.error("Error creating user document:", error);
    return NextResponse.json(
      { error: "Error creating user document" },
      { status: 500 },
    );
  }
}

// import { NextResponse } from "next/server";
// import { currentUser } from "@clerk/nextjs/server";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "@/firebase/config";

// export async function POST() {
//   try {
//     const user = await currentUser();

//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const userDocRef = doc(db, "users", user.id);

//     await setDoc(userDocRef, {
//       email: user.emailAddresses[0].emailAddress,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       createdAt: new Date(),
//     });

//     return NextResponse.json({ message: "User document created successfully" });
//   } catch (error) {
//     console.error("Error creating user document:", error);
//     return NextResponse.json(
//       { error: "Error creating user document" },
//       { status: 500 },
//     );
//   }
// }
