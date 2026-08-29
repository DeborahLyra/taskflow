
type Task = {
  id: number;
  title: string;
  description: string;
  dueDate?: string;
};

type TaskCardProps = {
  task: Task;
  onClick: () => void;
};

export default function TaskCard({
  task,
  onClick,
}: TaskCardProps) {
  return (
    <article
      onClick={onClick}
      className="cursor-pointer rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <h3 className="font-semibold text-slate-800">
        {task.title}
      </h3>

      <p className="mt-2 text-sm leading-5 text-slate-500">
        {task.description}
      </p>

      {task.dueDate && (
        <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <span>📅</span>
          <span>{task.dueDate}</span>
        </div>
      )}
    </article>
  );
}

