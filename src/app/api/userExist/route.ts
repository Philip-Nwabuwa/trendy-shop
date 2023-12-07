import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    await connectMongoDB();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    console.log("user: ", user);

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { message: "Error while validating user" },
      { status: 500 }
    );
  }
}
