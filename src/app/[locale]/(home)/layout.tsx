// import Footer from "@/app/(home)/_components/footer";
import Footer from "./_components/footer";
import Navbar from "./_components/navbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <Navbar/>
        <main className="-mt-16">{children}</main>
        <Footer />
      </div>
    </>
  );
}
