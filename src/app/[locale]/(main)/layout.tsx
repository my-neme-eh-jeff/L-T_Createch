//third party
import { redirect } from "next/navigation";

//components
import Navbar from "./_components/navbar";
import { getServerAuthSession } from "@/server/auth";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  // if (!session) {
  //   redirect("/login");
  // }
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
