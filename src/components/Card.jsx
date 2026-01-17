export default function Card({ children, className = '', hoverable = false }) {
  const hoverClass = hoverable ? 'hover:card-shadow-hover cursor-pointer' : '';

  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-xl card-shadow p-6 transition-all duration-200 ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
}
