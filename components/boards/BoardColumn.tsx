import TaskCard from "./TaskCard";
import type { Task } from "./Board";

type Column = {
  id: number;
  title: string;
  tasks: Task[];
};

type BoardColumnProps = {
  column: Column;
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onMoveTask: (
    taskId: number,
    columnId: number
  ) => void;
  onReorderTask: (
    draggedTaskId: number,
    targetTaskId: number,
    columnId: number
  ) => void;
};

export default function BoardColumn({
  column,
  onAddTask,
  onEditTask,
  onMoveTask,
  onReorderTask,
}: BoardColumnProps) {
  return (
    <div
      className="w-80 shrink-0 rounded-2xl bg-slate-200/70 p-4"
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDrop={(event) => {
        event.preventDefault();

        const taskId = Number(
          event.dataTransfer.getData("taskId")
        );

        if (!taskId) return;

        onMoveTask(taskId, column.id);
    }}
    >
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
          <TaskCard
          key={task.id}
          task={task}
          onClick={() => onEditTask(task)}
          onDropTask={(draggedTaskId, targetTaskId) =>
            onReorderTask(
              draggedTaskId,
              targetTaskId,
              column.id
            )
          }
          />
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