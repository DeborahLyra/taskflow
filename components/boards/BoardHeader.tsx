
type BoardHeaderProps = {
  title: string;
  description: string;
};

export default function BoardHeader({
  title,
  description,
}: BoardHeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex min-h-16 items-center justify-between gap-4 px-6 py-3">
        <div className="flex items-center gap-4">
          <a
            href="/dashboard"
            className="text-sm font-medium text-slate-500 transition hover:text-emerald-600"
          >
            ← Meus boards
          </a>

          <div className="hidden h-6 w-px bg-slate-200 sm:block" />

          <div>
            <h1 className="font-bold text-slate-900">
              {title}
            </h1>

            <p className="text-xs text-slate-500">
              {description}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="rounded-lg px-3 py-2 text-slate-500 transition hover:bg-slate-100"
        >
          ⋯
        </button>
      </div>
    </header>
  );
}

