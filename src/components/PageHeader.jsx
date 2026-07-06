import { motion } from 'framer-motion';

export default function PageHeader({ eyebrow, title, children, action }) {
  return (
    <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-skyglass-700 dark:text-skyglass-300">{eyebrow}</p>
        <h1 className="page-title">{title}</h1>
        {children && <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">{children}</p>}
      </motion.div>
      {action}
    </div>
  );
}
