import { CheckCircle2, ListChecks, Wand2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import PageHeader from '../components/PageHeader';

const essentials = ['Government ID', 'Phone charger', 'Reusable water bottle', 'Hand sanitizer', 'Small first-aid kit'];
const weatherItems = {
  hot: ['Sunscreen SPF 50', 'Cotton shirts', 'Sunglasses', 'Cap or hat', 'Electrolyte sachets'],
  rainy: ['Compact umbrella', 'Rain jacket', 'Waterproof pouch', 'Quick-dry clothes', 'Extra socks'],
  cold: ['Warm jacket', 'Scarf', 'Moisturizer', 'Thermal innerwear', 'Closed shoes'],
  pleasant: ['Light layers', 'Comfortable walking shoes', 'Day backpack', 'Evening jacket'],
};
const activityItems = {
  heritage: ['Camera', 'Comfortable walking shoes', 'Offline map', 'Cash for local markets'],
  adventure: ['Sports shoes', 'Energy bars', 'Towel', 'Extra t-shirt'],
  shopping: ['Foldable tote bag', 'UPI/cash backup', 'Size notes', 'Bargaining budget'],
  food: ['Digestive tablets', 'Wet wipes', 'Food allergy note', 'Small cash change'],
};

export default function Packing() {
  const [weather, setWeather] = useState('hot');
  const [days, setDays] = useState(3);
  const [activity, setActivity] = useState('heritage');
  const [generated, setGenerated] = useState([]);
  const [checked, setChecked] = useState([]);

  const previewCount = useMemo(() => essentials.length + weatherItems[weather].length + activityItems[activity].length + Number(days || 0), [weather, activity, days]);

  function generateList() {
    if (!days || Number(days) < 1 || Number(days) > 30) {
      toast.error('Enter trip days between 1 and 30.');
      return;
    }
    const clothing = Array.from({ length: Math.min(Number(days), 10) }, (_, index) => `Day ${index + 1} outfit`);
    const list = [...new Set([...essentials, ...weatherItems[weather], ...activityItems[activity], ...clothing])];
    setGenerated(list);
    setChecked([]);
    toast.success('Packing checklist generated.');
  }

  function toggle(item) {
    setChecked((current) => current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item]);
  }

  return (
    <>
      <PageHeader eyebrow="Packing List Generator" title="Pack for weather, duration, and activities">
        Generate a checklist that updates with your Delhi travel conditions.
      </PageHeader>

      <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
        <section className="panel p-5">
          <div className="grid gap-4">
            <label className="grid gap-2">
              <span className="field-label">Weather</span>
              <select className="input" value={weather} onChange={(event) => setWeather(event.target.value)}>
                <option value="hot">Hot and sunny</option>
                <option value="rainy">Rainy / monsoon</option>
                <option value="cold">Cold winter</option>
                <option value="pleasant">Pleasant</option>
              </select>
            </label>
            <label className="grid gap-2">
              <span className="field-label">Trip days</span>
              <input className="input" type="number" min="1" max="30" value={days} onChange={(event) => setDays(event.target.value)} />
            </label>
            <label className="grid gap-2">
              <span className="field-label">Activity type</span>
              <select className="input" value={activity} onChange={(event) => setActivity(event.target.value)}>
                <option value="heritage">Heritage sightseeing</option>
                <option value="adventure">Adventure/outdoor</option>
                <option value="shopping">Shopping</option>
                <option value="food">Food crawl</option>
              </select>
            </label>
            <button className="primary-button" onClick={generateList}>
              <Wand2 size={18} />
              Generate checklist
            </button>
            <div className="rounded-[8px] bg-skyglass-50 p-4 text-sm font-bold text-slate-600 dark:bg-slate-950 dark:text-slate-300">
              Estimated checklist size: <span className="text-skyglass-800 dark:text-skyglass-200">{previewCount} items</span>
            </div>
          </div>
        </section>

        <section className="panel p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-xl font-black"><ListChecks className="text-skyglass-600" /> Checklist</h2>
            {generated.length > 0 && <span className="text-sm font-black text-skyglass-700 dark:text-skyglass-200">{checked.length}/{generated.length} packed</span>}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {generated.map((item) => {
              const done = checked.includes(item);
              return (
                <button key={item} className={`rounded-[8px] border p-4 text-left font-bold transition hover:-translate-y-0.5 ${done ? 'border-skyglass-400 bg-skyglass-100 text-skyglass-900 dark:bg-skyglass-950 dark:text-skyglass-100' : 'border-skyglass-100 bg-white dark:border-slate-700 dark:bg-slate-950'}`} onClick={() => toggle(item)}>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={18} className={done ? 'text-skyglass-700' : 'text-slate-300'} />
                    {item}
                  </span>
                </button>
              );
            })}
            {!generated.length && <p className="muted">Set your trip details and generate a checklist.</p>}
          </div>
        </section>
      </div>
    </>
  );
}
