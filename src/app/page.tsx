import Link from "next/link";
import Footer from "./footer";

export default function Home() {
  return (
    <>
      <div className="border p-10 m-5">
        <h1 className="text-3xl font-bold">Home</h1>
        <Link href={`/blog/`} className="underline">
          Go to blog
        </Link>

        <h1>CRUD´s from SQL SERVER</h1>

        <Footer />
      </div>
    </>
  );
}
