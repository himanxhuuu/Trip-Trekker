import { IndianRupee, PieChart, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import PageHeader from '../components/PageHeader';
import StatPill from '../components/StatPill';
import { api } from '../services/api';

export default function Budget() {
  const [budget, setBudget] = useState(1200);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getBudgets().then(setDestinations).finally(() => setLoading(false));
  }, []);

  const matches = useMemo(() => {
    const value = Number(budget || 0);
    return destinations
      .map((destination) => ({
        ...destination,
        total: destination.travelCost + destination.foodCost + destination.ticketCost,
      }))
      .filter((destination) => destination.total <= value)
      .sort((a, b) => a.total - b.total);
  }, [budget, destinations]);

  function validateBudget(value) {
    setBudget(value);
    if (Number(value) < 300) toast.error('Most Delhi experiences need at least INR 300.');
  }

  return (
    <>
      <PageHeader eyebrow="Trip Budget Planner" title="Find Delhi experiences inside your budget">
        Enter your available budget to reveal matching destinations with travel, food, and ticket splits.
      </PageHeader>

      <section className="panel mb-5 grid gap-4 p-5 md:grid-cols-[1fr_auto] md:items-end">
        <label className="grid gap-2">
          <span className="field-label">Trip budget (INR)</span>
          <input className="input" type="number" min="0" value={budget} onChange={(event) => validateBudget(event.target.value)} />
        </label>
        <StatPill label="Possible options" value={matches.length} />
      </section>

      {loading ? <LoadingSpinner /> : (
        <section className="grid gap-5 lg:grid-cols-2">
          {matches.map((destination) => (
            <article key={destination.name} className="card">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black">{destination.name}</h2>
                  <p className="mt-2 muted">{destination.description}</p>
                </div>
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-skyglass-100 text-skyglass-700 dark:bg-skyglass-900 dark:text-skyglass-200">
                  <Sparkles size={22} />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-4">
                <StatPill label="Travel" value={`INR ${destination.travelCost}`} />
                <StatPill label="Food" value={`INR ${destination.foodCost}`} />
                <StatPill label="Tickets" value={`INR ${destination.ticketCost}`} />
                <StatPill label="Total" value={`INR ${destination.total}`} />
              </div>
              <div className="mt-5 flex items-center gap-2 rounded-[8px] bg-white p-3 text-sm font-black text-skyglass-700 dark:bg-slate-950 dark:text-skyglass-200">
                <PieChart size={17} />
                Best time: {destination.bestTime}
              </div>
            </article>
          ))}
          {!matches.length && (
            <article className="panel p-8 text-center lg:col-span-2">
              <IndianRupee className="mx-auto mb-3 text-skyglass-600" size={34} />
              <h2 className="text-xl font-black">No exact match yet</h2>
              <p className="mt-2 muted">Increase the budget or choose free attractions like public gardens, markets, and heritage walks.</p>
            </article>
          )}
        </section>
      )}
    </>
  );
}
