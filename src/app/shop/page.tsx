import { getServerSession } from "next-auth";
import React from "react";
import { redirect } from "next/navigation";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import { authOptions } from "@/lib/authOptions";

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
