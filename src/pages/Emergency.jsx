import { Ambulance, Flame, HeartPulse, Phone, Shield, UserRoundCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import PageHeader from '../components/PageHeader';
import { api } from '../services/api';

const icons = [Shield, Ambulance, Flame, Phone, HeartPulse, UserRoundCheck];

export default function Emergency() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getEmergency().then(setContacts).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader eyebrow="Emergency Contacts" title="Important Delhi help numbers">
        Keep the essential contacts accessible during the trip.
      </PageHeader>

      {loading ? <LoadingSpinner /> : (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {contacts.map((contact, index) => {
            const Icon = icons[index % icons.length];
            return (
              <article key={contact.label} className="card">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-skyglass-100 text-skyglass-700 dark:bg-skyglass-900 dark:text-skyglass-200">
                  <Icon size={23} />
                </div>
                <h2 className="text-lg font-black">{contact.label}</h2>
                <a className="mt-3 inline-flex text-2xl font-black text-skyglass-700 dark:text-skyglass-200" href={`tel:${contact.value.replaceAll('-', '')}`}>
                  {contact.value}
                </a>
              </article>
            );
          })}
          <article className="panel p-6 md:col-span-2 xl:col-span-3">
            <h2 className="text-xl font-black">Quick travel safety notes</h2>
            <div className="mt-4 grid gap-3 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300 md:grid-cols-3">
              <p>Save these numbers before leaving your hotel.</p>
              <p>For lost documents or theft, contact Tourist Police.</p>
              <p>Share your route and hotel details with one trusted contact.</p>
            </div>
          </article>
        </section>
      )}
    </>
  );
}
