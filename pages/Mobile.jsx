import Link from "next/link";

export default function Mobile() {
  return (
    <main className="container py-10">
      <div className="card">
        <h1 className="text-2xl  mb-4 capitalize font-bold">School admin</h1>
        <p className="mb-6">
          Build with Next.js + MySQL.
        </p>
        <div className="flex gap-3 flex-col">
          <Link className="btn" href="/addSchool">Add School</Link>
          <Link className="btn-secondary" href="/showSchools">Show Schools</Link>
        </div>
      </div>
    </main>
  );
}
