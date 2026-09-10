import type { Task } from "./Board";

type TaskCardProps = {
  task: Task;
  onClick: () => void;
  onDropTask: (
    draggedTaskId: number,
    targetTaskId: number
  ) => void;
};

export default function TaskCard({
  task,
  onClick,
  onDropTask,
}: TaskCardProps) {
  return (
    <article
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData(
          "taskId",
          String(task.id)
        );
      }}
      onDragOver={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      onDrop={(event) => {
        event.preventDefault();
        event.stopPropagation();

        const draggedTaskId = Number(
          event.dataTransfer.getData("taskId")
        );

        if (!draggedTaskId) return;

        onDropTask(draggedTaskId, task.id);
      }}
      onClick={onClick}
      className="cursor-grab rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:cursor-grabbing"
    >
      <h3 className="font-semibold text-slate-800">
        {task.title}
      </h3>

      {task.description && (
        <p className="mt-2 text-sm leading-5 text-slate-500">
          {task.description}
        </p>
      )}

      {task.dueDate && (
        <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <span>📅</span>
          <span>{task.dueDate}</span>
        </div>
      )}
    </article>
  );
}