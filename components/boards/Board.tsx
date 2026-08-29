
"use client";

import { useState } from "react";

import BoardColumn from "./BoardColumn";
import MemberModal from "./MemberModal";
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

type Member = {
  id: number;
  name: string;
  email: string;
  role: "Administrador" | "Membro";
};

type BoardProps = {
  columns: BoardColumnData[];
};

const members: Member[] = [
  {
    id: 1,
    name: "Deborah Lyra",
    email: "deborah@email.com",
    role: "Administrador",
  },
  {
    id: 2,
    name: "Maria",
    email: "maria@email.com",
    role: "Membro",
  },
  {
    id: 3,
    name: "João",
    email: "joao@email.com",
    role: "Membro",
  },
];

export default function Board({ columns }: BoardProps) {
  const [selectedTask, setSelectedTask] =
    useState<Task | null>(null);

  const [isTaskModalOpen, setIsTaskModalOpen] =
    useState(false);

  const [isMemberModalOpen, setIsMemberModalOpen] =
    useState(false);

  function handleOpenTask(task: Task) {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  }

  function handleCreateTask() {
    setSelectedTask(null);
    setIsTaskModalOpen(true);
  }

  function handleCloseTaskModal() {
    setIsTaskModalOpen(false);
    setSelectedTask(null);
  }

  function handleOpenMembers() {
    setIsMemberModalOpen(true);
  }

  function handleCloseMembers() {
    setIsMemberModalOpen(false);
  }

  return (
    <>
      <section className="overflow-x-auto p-6 md:p-8">
        <div className="mb-5 flex justify-end">
          <button
            type="button"
            onClick={handleOpenMembers}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-emerald-400 hover:text-emerald-600"
          >
            👥 Membros
          </button>
        </div>

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

      {isTaskModalOpen && (
        <TaskModal
          task={selectedTask}
          onClose={handleCloseTaskModal}
        />
      )}

      {isMemberModalOpen && (
        <MemberModal
          members={members}
          onClose={handleCloseMembers}
        />
      )}
    </>
  );
}

