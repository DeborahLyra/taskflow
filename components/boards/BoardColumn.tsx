type Task = {
  id: number;
  title: string;
  description: string;
  dueDate?: string;
};

type Column = {
  id: number;
  title: string;
  tasks: Task[];
};

type BoardColumnProps = {
  column: Column;
  onAddTask: () => void;
};

export default function BoardColumn({
  column,
  onAddTask,
}: BoardColumnProps) {
  return (
    <div className="w-80 shrink-0 rounded-2xl bg-slate-200/70 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-slate-800">
          {column.title}
        </h2>

        <span className="text-sm text-slate-500">
          {column.tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {column.tasks.map((task) => (
          <div
            key={task.id}
            className="rounded-xl bg-white p-4 shadow-sm"
          >
            <h3 className="font-medium text-slate-900">
              {task.title}
            </h3>

            {task.description && (
              <p className="mt-2 text-sm text-slate-500">
                {task.description}
              </p>
            )}

            {task.dueDate && (
              <p className="mt-3 text-xs text-slate-400">
                Prazo: {task.dueDate}
              </p>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onAddTask}
        className="mt-4 w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-300/70 hover:text-slate-900"
      >
        + Adicionar tarefa
      </button>
    </div>
  );
}