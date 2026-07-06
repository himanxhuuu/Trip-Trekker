import { CalendarCheck, Clock, Plus, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import PageHeader from '../components/PageHeader';
import StatPill from '../components/StatPill';
import { districts } from '../data/tripData';
import { api } from '../services/api';

export default function ActivitiesPlanner() {
  const [district, setDistrict] = useState('Central Delhi');
  const [budget, setBudget] = useState(600);
  const [activities, setActivities] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getActivities(district).then(setActivities).finally(() => setLoading(false));
    setSelected([]);
  }, [district]);

  const affordable = activities.filter((activity) => activity.cost <= Number(budget || 0));
  const schedule = useMemo(() => selected.slice().sort((a, b) => a.start - b.start), [selected]);
  const total = schedule.reduce((sum, activity) => sum + activity.cost, 0);

  function toggleActivity(activity) {
    setSelected((current) => {
      if (current.some((item) => item.id === activity.id)) return current.filter((item) => item.id !== activity.id);
      toast.success(`${activity.name} added to schedule.`);
      return [...current, activity];
    });
  }

  return (
    <>
      <PageHeader eyebrow="Activities Planner" title="Build a day that fits your budget">
        Filter district activities by cost, then pick the experiences you want in your recommended schedule.
      </PageHeader>

      <section className="panel mb-5 grid gap-4 p-5 md:grid-cols-[1fr_1fr_auto] md:items-end">
        <label className="grid gap-2">
          <span className="field-label">District</span>
          <select className="input" value={district} onChange={(event) => setDistrict(event.target.value)}>
            {districts.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="grid gap-2">
          <span className="field-label">Daily budget (INR)</span>
          <input className="input" type="number" min="0" value={budget} onChange={(event) => setBudget(event.target.value)} />
        </label>
        <StatPill label="Selected cost" value={`INR ${total}`} />
      </section>

      {loading ? <LoadingSpinner /> : (
        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <section className="grid gap-4 sm:grid-cols-2">
            {affordable.map((activity) => {
              const active = selected.some((item) => item.id === activity.id);
              return (
                <article key={activity.id} className={`card ${active ? 'border-skyglass-400 bg-skyglass-50 dark:bg-slate-800' : ''}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-black">{activity.name}</h2>
                      <p className="mt-2 muted">{activity.description}</p>
                    </div>
                    <button className={active ? 'secondary-button px-3 py-2' : 'primary-button px-3 py-2'} onClick={() => toggleActivity(activity)} aria-label="Toggle activity">
                      {active ? <Trash2 size={17} /> : <Plus size={17} />}
                    </button>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <StatPill label="Time" value={`${activity.start}:00-${activity.end}:00`} />
                    <StatPill label="Cost" value={`INR ${activity.cost}`} />
                  </div>
                </article>
              );
            })}
            {!affordable.length && <div className="panel p-8 text-center font-bold text-slate-600 dark:text-slate-300">No activities fit this budget yet.</div>}
          </section>

          <aside className="panel p-5">
            <div className="mb-4 flex items-center gap-2 text-lg font-black">
              <CalendarCheck className="text-skyglass-600" />
              Recommended schedule
            </div>
            <div className="grid gap-3">
              {schedule.map((activity) => (
                <div key={activity.id} className="rounded-[8px] border border-skyglass-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-950">
                  <p className="font-black">{activity.name}</p>
                  <p className="mt-1 flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400"><Clock size={14} /> {activity.start}:00 to {activity.end}:00</p>
                </div>
              ))}
              {!schedule.length && <p className="muted">Choose activities to generate your day plan.</p>}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
