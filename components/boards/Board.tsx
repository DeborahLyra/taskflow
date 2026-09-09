"use client";

import { useState } from "react";

import BoardColumn from "./BoardColumn";
import TaskModal from "./TaskModal";
import EditTaskModal from "./EditTaskModal";

export type Task = {
  id: number;
  title: string;
  description: string;
  dueDate?: string;
  columnId: number;
};

type Column = {
  id: number;
  title: string;
  tasks: Task[];
};

type BoardProps = {
  columns: Column[];
};

export default function Board({ columns }: BoardProps) {
  const [selectedColumnId, setSelectedColumnId] =
    useState<number | null>(null);

  const [selectedTask, setSelectedTask] =
    useState<Task | null>(null);

  function handleAddTask(columnId: number) {
    setSelectedColumnId(columnId);
  }

  function handleEditTask(task: Task) {
    setSelectedTask(task);
  }

  function handleCloseTaskModal() {
    setSelectedColumnId(null);
  }

  function handleCloseEditModal() {
    setSelectedTask(null);
  }

  return (
    <>
      <div className="flex gap-4 overflow-x-auto p-6">
        {columns.map((column) => (
          <BoardColumn
            key={column.id}
            column={column}
            onAddTask={() => handleAddTask(column.id)}
            onEditTask={handleEditTask}
          />
        ))}
      </div>

      {selectedColumnId !== null && (
        <TaskModal
          columnId={selectedColumnId}
          onClose={handleCloseTaskModal}
        />
      )}

      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          columns={columns}
          onClose={handleCloseEditModal}
        />
      )}
    </>
  );
}