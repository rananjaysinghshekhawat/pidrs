import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const issueTypes = [
  { label: "Potholes", note: "Deep, shallow, or spreading" },
  { label: "Streetlights", note: "Dark, flickering, or damaged" },
  { label: "Water leaks", note: "Pipe bursts and pooling" },
  { label: "Footpaths", note: "Broken slabs, uneven tiles" },
  { label: "Open drains", note: "Missing covers, overflow" },
];

const steps = [
  { n: "1", title: "File the report", body: "Add a photo, pick a category, and drop a pin — takes under a minute." },
  { n: "2", title: "Authority reviews it", body: "Your local authority sees it on their board and assigns it a status." },
  { n: "3", title: "Track it to resolution", body: "Watch it move from Pending to In Progress to Resolved." },
];

const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 grid md:grid-cols-5 gap-10 items-end">
        <div className="md:col-span-3">
          <p className="text-signal font-medium text-sm mb-3">Civic issue reporting, made accountable</p>
          <h1 className="font-display font-800 text-5xl sm:text-6xl leading-[0.95] text-ink">
            See something broken?
            <br />
            File it. Track it.
            <br />
            Get it fixed.
          </h1>
          <p className="mt-6 text-ink/70 max-w-md">
            PIDRS lets residents report damaged public infrastructure with
            geo-tagged photo proof, so authorities can prioritise repairs
            instead of chasing paperwork.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {!user && (
              <>
                <Link to="/register" className="bg-asphalt text-paper px-5 py-2.5 rounded-sm hover:bg-ink/80 focus-ring">
                  Get started
                </Link>
                <Link to="/login" className="border border-asphalt px-5 py-2.5 rounded-sm hover:bg-white focus-ring">
                  Log in
                </Link>
              </>
            )}
            {user?.role === "citizen" && (
              <Link to="/report" className="bg-asphalt text-paper px-5 py-2.5 rounded-sm hover:bg-ink/80 focus-ring">
                Report an issue
              </Link>
            )}
            {user?.role === "authority" && (
              <Link to="/dashboard" className="bg-asphalt text-paper px-5 py-2.5 rounded-sm hover:bg-ink/80 focus-ring">
                Open dashboard
              </Link>
            )}
          </div>
        </div>

        <div className="md:col-span-2 ticket p-5">
          <p className="text-xs text-ink/50 mb-3">Issue categories</p>
          <ul className="divide-y divide-ink/10">
            {issueTypes.map((t) => (
              <li key={t.label} className="py-2.5 flex justify-between items-baseline">
                <span className="font-medium text-ink">{t.label}</span>
                <span className="text-xs text-ink/50 text-right">{t.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14 perforation">
        <h2 className="font-display font-700 text-3xl text-ink mb-8">How a report moves</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.n}>
              <span className="font-display text-4xl text-amber">{s.n}</span>
              <h3 className="font-semibold text-ink mt-2">{s.title}</h3>
              <p className="text-sm text-ink/60 mt-1">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
