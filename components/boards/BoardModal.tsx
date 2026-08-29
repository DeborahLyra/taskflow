
"use client";

import { useState } from "react";

type Board = {
  id: number;
  title: string;
  description: string;
};

type BoardModalProps = {
  board?: Board | null;
  onClose: () => void;
};

export default function BoardModal({
  board,
  onClose,
}: BoardModalProps) {
  const [title, setTitle] = useState(board?.title ?? "");
  const [description, setDescription] = useState(
    board?.description ?? "",
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log({
      title,
      description,
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {board ? "Editar quadro" : "Novo quadro"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {board
                ? "Atualize as informações do quadro."
                : "Crie um novo quadro para organizar suas tarefas."}
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
              htmlFor="board-title"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Nome do quadro
            </label>

            <input
              id="board-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Ex.: Planejamento de conteúdo"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label
              htmlFor="board-description"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Descrição
            </label>

            <textarea
              id="board-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Descreva o objetivo desse quadro..."
              rows={4}
              className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
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
              {board ? "Salvar alterações" : "Criar quadro"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

