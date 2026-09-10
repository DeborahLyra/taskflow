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
  position: number;
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

  async function handleReorderTask(
    draggedTaskId: number,
    targetTaskId: number,
    columnId: number
  ) {
    if (draggedTaskId === targetTaskId) {
      return;
    }
  
    const column = localColumns.find(
      (column) => column.id === columnId
    );
  
    if (!column) return;
  
    const draggedTask = localColumns
      .flatMap((column) => column.tasks)
      .find((task) => task.id === draggedTaskId);
  
    if (!draggedTask) return;
  
    if (draggedTask.columnId !== columnId) {
      await handleMoveTask(
        draggedTaskId,
        columnId
      );
  
      return;
    }
  
    const previousColumns = localColumns;
  
    const tasks = [...column.tasks];
  
    const draggedIndex = tasks.findIndex(
      (task) => task.id === draggedTaskId
    );
  
    const targetIndex = tasks.findIndex(
      (task) => task.id === targetTaskId
    );
  
    if (
      draggedIndex === -1 ||
      targetIndex === -1
    ) {
      return;
    }
  
    const [removedTask] = tasks.splice(
      draggedIndex,
      1
    );
  
    tasks.splice(
      targetIndex,
      0,
      removedTask
    );
  
    const reorderedTasks = tasks.map(
      (task, index) => ({
        ...task,
        position: index,
      })
    );
  
    setLocalColumns((currentColumns) =>
      currentColumns.map((currentColumn) =>
        currentColumn.id === columnId
          ? {
              ...currentColumn,
              tasks: reorderedTasks,
            }
          : currentColumn
      )
    );
  
    const supabase = createClient();
  
    const updates = reorderedTasks.map(
      (task) =>
        supabase
          .from("tasks")
          .update({
            position: task.position,
          })
          .eq("id", task.id)
    );
  
    const results = await Promise.all(updates);
  
    const hasError = results.some(
      (result) => result.error
    );
  
    if (hasError) {
      console.error(
        "Erro ao salvar a ordem das tarefas."
      );
  
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
            onReorderTask={handleReorderTask}
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