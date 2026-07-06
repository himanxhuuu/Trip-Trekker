import { CloudRain, CloudSun, Snowflake, SunMedium } from 'lucide-react';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import PageHeader from '../components/PageHeader';
import { api } from '../services/api';

const icons = { Summer: SunMedium, Monsoon: CloudRain, Winter: Snowflake, 'Spring/Autumn': CloudSun };

export default function Weather() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getWeather().then(setCards).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader eyebrow="Weather" title="Season-aware planning cards">
        Delhi changes dramatically through the year. Use these cues for clothing, timings, and comfort.
      </PageHeader>

      {loading ? <LoadingSpinner /> : (
        <section className="grid gap-5 md:grid-cols-2">
          {cards.map((card) => {
            const Icon = icons[card.season] || CloudSun;
            return (
              <article key={card.season} className="card">
                <div className="flex items-start gap-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-skyglass-100 text-skyglass-700 dark:bg-skyglass-900 dark:text-skyglass-200">
                    <Icon size={27} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black">{card.season}</h2>
                    <p className="mt-1 text-sm font-bold text-slate-500 dark:text-slate-400">{card.months}</p>
                  </div>
                </div>
                <div className="mt-6 rounded-[8px] bg-skyglass-50 p-4 dark:bg-slate-950">
                  <p className="text-sm font-black uppercase text-slate-500 dark:text-slate-400">Temperature</p>
                  <p className="mt-1 text-2xl font-black text-skyglass-800 dark:text-skyglass-200">{card.temp}</p>
                </div>
                <p className="mt-4 muted">{card.advice}</p>
              </article>
            );
          })}
        </section>
      )}
    </>
  );
}
