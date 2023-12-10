import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/login");
  }
  return (
    <main className="pt-36">
      <MaxWidthWrapper>Shop</MaxWidthWrapper>
    </main>
  );
};

export default page;
