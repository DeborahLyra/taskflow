
"use client";

import { useState } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  dueDate?: string;
};

type TaskModalProps = {
  task?: Task | null;
  onClose: () => void;
};

export default function TaskModal({
  task,
  onClose,
}: TaskModalProps) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(
    task?.description ?? "",
  );
  const [dueDate, setDueDate] = useState(task?.dueDate ?? "");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log({
      title,
      description,
      dueDate,
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {task ? "Editar tarefa" : "Nova tarefa"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {task
                ? "Atualize as informações da tarefa."
                : "Adicione uma nova tarefa ao seu board."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Fechar"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label
              htmlFor="task-title"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Título
            </label>

            <input
              id="task-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Ex.: Criar publicação"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label
              htmlFor="task-description"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Descrição
            </label>

            <textarea
              id="task-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Descreva a tarefa..."
              rows={4}
              className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label
              htmlFor="task-due-date"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Prazo
            </label>

            <input
              id="task-due-date"
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

