export default function StatPill({ label, value }) {
  return (
    <div className="rounded-[8px] border border-skyglass-100 bg-skyglass-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950">
      <p className="text-xs font-black uppercase text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-black text-skyglass-800 dark:text-skyglass-200">{value}</p>
    </div>
  );
}
