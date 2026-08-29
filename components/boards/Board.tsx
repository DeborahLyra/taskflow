
"use client";

import { useState } from "react";

import BoardColumn from "./BoardColumn";
import TaskModal from "./TaskModal";

type Task = {
  id: number;
  title: string;
  description: string;
  dueDate?: string;
};

type BoardColumnData = {
  id: number;
  title: string;
  tasks: Task[];
};

type BoardProps = {
  columns: BoardColumnData[];
};

export default function Board({ columns }: BoardProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenTask(task: Task) {
    setSelectedTask(task);
    setIsModalOpen(true);
  }

  function handleCreateTask() {
    setSelectedTask(null);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedTask(null);
  }

  return (
    <>
      <section className="overflow-x-auto p-6 md:p-8">
        <div className="flex min-w-max gap-5">
          {columns.map((column) => (
            <BoardColumn
              key={column.id}
              title={column.title}
              tasks={column.tasks}
              onTaskClick={handleOpenTask}
              onAddTask={handleCreateTask}
            />
          ))}
        </div>
      </section>

      {isModalOpen && (
        <TaskModal
          task={selectedTask}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

