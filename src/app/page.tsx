import User from "@/components/User";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";

export default function Home() {
  
  return (
    <main className="pt-36">
      <MaxWidthWrapper>
        <User />
      </MaxWidthWrapper>
    </main>
  );
}
