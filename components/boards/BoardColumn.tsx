
import TaskCard from "./TaskCard";

type Task = {
  id: number;
  title: string;
  description: string;
  dueDate?: string;
};

type BoardColumnProps = {
  title: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onAddTask: () => void;
};

export default function BoardColumn({
  title,
  tasks,
  onTaskClick,
  onAddTask,
}: BoardColumnProps) {
  return (
    <div className="flex w-80 flex-col rounded-xl bg-slate-200/70 p-3">
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            {title}
          </h2>

          <span className="rounded-full bg-slate-300 px-2 py-0.5 text-xs font-semibold text-slate-600">
            {tasks.length}
          </span>
        </div>

        <button
          type="button"
          className="rounded-md px-2 py-1 text-slate-500 transition hover:bg-slate-300"
        >
          ⋯
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => onTaskClick(task)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onAddTask}
        className="mt-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-500 transition hover:bg-slate-300 hover:text-slate-700"
      >
        + Adicionar tarefa
      </button>
    </div>
  );
}

