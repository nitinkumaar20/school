import { useEffect, useState } from "react";
import Link from "next/link";
interface School {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  image?: string | null;
  email_id?: string;
}

export default function ShowSchools() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch("/api/schools");
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to fetch");
        setSchools(json.data as School[]);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSchools();
  }, []);

  const filtered = schools.filter((s) =>
    [s.name, s.city, s.state].some((v) =>
      (v || "").toLowerCase().includes(query.toLowerCase())
    )
  );

  return (
    <main className="container py-10">
      <div className="mb-4 flex items-center justify-between">
       <h1 className="font-bold text-xl hidden lg:block">Total Schools</h1>
 <Link href="/" className="text-blue-600 hover:underline lg:hidden">← Back</Link>
      </div>

      {loading && <p>Loading schools...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <section className="grid-cards">
          {filtered.map((s) => (
            <article key={s.id} className="card">
              {s.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-40 object-cover rounded-xl mb-3"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded-xl mb-3" />
              )}
              <h2 className="font-semibold text-lg">{s.name}</h2>
              <p className="text-sm text-gray-600">{s.address}</p>
              <p className="text-sm text-gray-500 mt-1">{s.city}</p>
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              No schools found.
            </div>
          )}
        </section>
      )}
    </main>
  );
}
