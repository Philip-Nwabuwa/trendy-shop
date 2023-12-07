import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrpt from "bcryptjs";

export async function POST(req: any) {
  try {
    const { email, password } = await req.json();
    const hashedPassword = await bcrpt.hash(password, 10);
    console.log(email, password);

    await connectMongoDB();
    await User.create({ email, password: hashedPassword });

    return NextResponse.json({ message: "user registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error while registering" },
      { status: 500 }
    );
  }
}
