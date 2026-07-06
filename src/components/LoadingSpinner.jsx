export default function LoadingSpinner({ label = 'Loading planner data' }) {
  return (
    <div className="grid min-h-44 place-items-center">
      <div className="flex items-center gap-3 rounded-full border border-skyglass-100 bg-white px-5 py-3 text-sm font-black text-skyglass-700 shadow-lift dark:border-slate-700 dark:bg-slate-900 dark:text-skyglass-200">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-skyglass-200 border-t-skyglass-600" />
        {label}
      </div>
    </div>
  );
}
