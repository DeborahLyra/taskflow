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

  function handleAddTask(columnId: number) {
    setSelectedColumnId(columnId);
  }

  function handleCloseTaskModal() {
    setSelectedColumnId(null);
  }

  return (
    <>
      <div className="flex gap-4 overflow-x-auto p-6">
        {columns.map((column) => (
          <BoardColumn
            key={column.id}
            column={column}
            onAddTask={() => handleAddTask(column.id)}
          />
        ))}
      </div>

      {selectedColumnId !== null && (
        <TaskModal
          columnId={selectedColumnId}
          onClose={handleCloseTaskModal}
        />
      )}
    </>
  );
}