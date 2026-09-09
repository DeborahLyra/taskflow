"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import type { Task } from "./Board";

type Column = {
    id: number;
    title: string;
  };
  
  type EditTaskModalProps = {
    task: Task;
    columns: Column[];
    onClose: () => void;
  };

export default function EditTaskModal({
    task,
    columns,
    onClose,
}: EditTaskModalProps) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] =
        useState(task.description);

    const [dueDate, setDueDate] =
        useState(task.dueDate ?? "");

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [columnId, setColumnId] = useState(task.columnId);

    const router = useRouter();

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (!title.trim()) {
            setErrorMessage("Digite o título da tarefa.");
            return;
        }

        setLoading(true);
        setErrorMessage("");

        const supabase = createClient();

        const { error } = await supabase
            .from("tasks")
            .update({
                title: title.trim(),
                description: description.trim() || null,
                due_date: dueDate || null,
                column_id: columnId,
            })
            .eq("id", task.id);

        if (error) {
            console.error("Erro ao editar tarefa:", error);

            setErrorMessage(
                "Não foi possível atualizar a tarefa."
            );

            setLoading(false);

            return;
        }

        router.refresh();
        onClose();
    }

    async function handleDelete() {
        const confirmed = window.confirm(
            "Tem certeza que deseja excluir esta tarefa?"
        );

        if (!confirmed) return;

        setLoading(true);
        setErrorMessage("");

        const supabase = createClient();

        const { error } = await supabase
            .from("tasks")
            .delete()
            .eq("id", task.id);

        if (error) {
            console.error("Erro ao excluir tarefa:", error);

            setErrorMessage(
                "Não foi possível excluir a tarefa."
            );

            setLoading(false);
            return;
        }

        router.refresh();
        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Editar tarefa
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-xl text-slate-400 transition hover:text-slate-700"
                    >
                        ×
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <div>
                        <label
                            htmlFor="edit-title"
                            className="mb-1 block text-sm font-medium text-slate-700"
                        >
                            Título
                        </label>

                        <input
                            id="edit-title"
                            type="text"
                            value={title}
                            onChange={(event) =>
                                setTitle(event.target.value)
                            }
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="edit-description"
                            className="mb-1 block text-sm font-medium text-slate-700"
                        >
                            Descrição
                        </label>

                        <textarea
                            id="edit-description"
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                            rows={4}
                            className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="edit-column"
                            className="mb-1 block text-sm font-medium text-slate-700"
                        >
                            Coluna
                        </label>

                        <select
                            id="edit-column"
                            value={columnId}
                            onChange={(event) =>
                                setColumnId(Number(event.target.value))
                            }
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
                        >
                            {columns.map((column) => (
                                <option
                                    key={column.id}
                                    value={column.id}
                                >
                                    {column.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="edit-due-date"
                            className="mb-1 block text-sm font-medium text-slate-700"
                        >
                            Prazo
                        </label>

                        <input
                            id="edit-due-date"
                            type="date"
                            value={dueDate}
                            onChange={(event) =>
                                setDueDate(event.target.value)
                            }
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
                        />
                    </div>

                    {errorMessage && (
                        <p className="text-sm text-red-500">
                            {errorMessage}
                        </p>
                    )}

                    <div className="flex items-center justify-between pt-2">
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={loading}
                            className="rounded-xl px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                        >
                            Excluir tarefa
                        </button>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={loading}
                                className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
                            >
                                {loading
                                    ? "Salvando..."
                                    : "Salvar alterações"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}