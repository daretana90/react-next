import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-bold">Welcome to blog!</h1>
      <Link href={`/`} className="underline">
        Return
      </Link>
    </>
  );
}
