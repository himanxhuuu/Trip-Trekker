import { Star, Wifi, Utensils, Car, Waves } from 'lucide-react';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import PageHeader from '../components/PageHeader';
import StatPill from '../components/StatPill';
import { districts } from '../data/tripData';
import { api } from '../services/api';

const amenityIcon = (amenity) => {
  if (/wifi/i.test(amenity)) return Wifi;
  if (/restaurant|dining|breakfast/i.test(amenity)) return Utensils;
  if (/pool|spa/i.test(amenity)) return Waves;
  return Car;
};

export default function Hotels() {
  const [district, setDistrict] = useState('Central Delhi');
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getHotels(district).then(setHotels).finally(() => setLoading(false));
  }, [district]);

  return (
    <>
      <PageHeader eyebrow="Hotel Recommendations" title="Stay options by district">
        Compare prices, ratings, and amenities near your preferred Delhi district.
      </PageHeader>

      <section className="panel mb-5 max-w-xl p-5">
        <label className="grid gap-2">
          <span className="field-label">District</span>
          <select className="input" value={district} onChange={(event) => setDistrict(event.target.value)}>
            {districts.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </section>

      {loading ? <LoadingSpinner label="Finding hotels" /> : (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {hotels.map((hotel) => (
            <article key={hotel.name} className="card">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black">{hotel.name}</h2>
                  <p className="mt-1 text-sm font-bold text-slate-500 dark:text-slate-400">{district}</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-black text-amber-700 dark:bg-amber-950 dark:text-amber-200">
                  <Star size={15} fill="currentColor" /> {hotel.rating}
                </span>
              </div>
              <StatPill label="Per night" value={`INR ${hotel.price.toLocaleString('en-IN')}`} />
              <div className="mt-5 flex flex-wrap gap-2">
                {hotel.amenities.map((amenity) => {
                  const Icon = amenityIcon(amenity);
                  return (
                    <span key={amenity} className="inline-flex items-center gap-2 rounded-full bg-skyglass-50 px-3 py-2 text-xs font-black text-skyglass-800 dark:bg-slate-950 dark:text-skyglass-200">
                      <Icon size={14} />
                      {amenity}
                    </span>
                  );
                })}
              </div>
            </article>
          ))}
        </section>
      )}
    </>
  );
}
