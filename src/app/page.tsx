import Link from "next/link";
import Footer from "./footer";
import Usercrud from "./usercrud";

export default function Page() {
  return (
    <>
      <div className="border p-10 m-5">
        <h1 className="text-3xl font-bold">Home</h1>
        <Link href={`/blog/`} className="underline">
          Go to blog
        </Link>
        <Usercrud/>
        <Footer />
      </div>
    </>
  );
}