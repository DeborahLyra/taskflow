"use client";

import { useEffect, useState } from "react";

import BoardColumn from "./BoardColumn";
import TaskModal from "./TaskModal";
import EditTaskModal from "./EditTaskModal";

import { createClient } from "@/lib/supabase/client";

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
  const [localColumns, setLocalColumns] =
    useState<Column[]>(columns);

  const [selectedColumnId, setSelectedColumnId] =
    useState<number | null>(null);

  const [selectedTask, setSelectedTask] =
    useState<Task | null>(null);

  useEffect(() => {
    setLocalColumns(columns);
  }, [columns]);

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

  async function handleMoveTask(
    taskId: number,
    newColumnId: number
  ) {
    const previousColumns = localColumns;

    const taskToMove = localColumns
      .flatMap((column) => column.tasks)
      .find((task) => task.id === taskId);

    if (!taskToMove) return;

    if (taskToMove.columnId === newColumnId) {
      return;
    }

    const updatedTask = {
      ...taskToMove,
      columnId: newColumnId,
    };

    setLocalColumns((currentColumns) =>
      currentColumns.map((column) => {
        if (column.id === newColumnId) {
          return {
            ...column,
            tasks: [...column.tasks, updatedTask],
          };
        }

        return {
          ...column,
          tasks: column.tasks.filter(
            (task) => task.id !== taskId
          ),
        };
      })
    );

    const supabase = createClient();

    const { error } = await supabase
      .from("tasks")
      .update({
        column_id: newColumnId,
      })
      .eq("id", taskId);

    if (error) {
      console.error("Erro ao mover tarefa:", error);

      setLocalColumns(previousColumns);
    }
  }

  return (
    <>
      <div className="flex gap-4 overflow-x-auto p-6">
        {localColumns.map((column) => (
          <BoardColumn
            key={column.id}
            column={column}
            onAddTask={() => handleAddTask(column.id)}
            onEditTask={handleEditTask}
            onMoveTask={handleMoveTask}
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
          columns={localColumns}
          onClose={handleCloseEditModal}
        />
      )}
    </>
  );
}