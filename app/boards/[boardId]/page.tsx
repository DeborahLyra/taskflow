import { notFound } from "next/navigation";

import Board from "@/components/boards/Board";
import BoardHeader from "@/components/boards/BoardHeader";
import { createClient } from "@/lib/supabase/server";

type Column = {
  id: number;
  title: string;
  position: number;
};

export default async function BoardPage({
  params,
}: {
  params: Promise<{ boardId: string }>;
}) {
  const { boardId } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const { data: board, error: boardError } = await supabase
    .from("boards")
    .select("id, title, description")
    .eq("id", boardId)
    .single();

  if (boardError || !board) {
    notFound();
  }

  const { data: columns, error: columnsError } = await supabase
  .from("columns")
  .select(`
    id,
    title,
    position,
    tasks (
      id,
      title,
      description,
      due_date,
      assigned_to,
      position
    )
  `)
  .eq("board_id", boardId)
  .order("position", { ascending: true });
  if (columnsError) {
    console.error("Erro ao buscar colunas:", columnsError);
  }

  const formattedColumns =
  columns?.map((column) => ({
    id: column.id,
    title: column.title,
    tasks:
      column.tasks
        ?.sort((a, b) => a.position - b.position)
        .map((task) => ({
          id: task.id,
          title: task.title,
          description: task.description ?? "",
          dueDate: task.due_date ?? undefined,
          columnId: column.id,
        })) ?? [],
  })) ?? [];

  return (
    <main className="min-h-screen bg-slate-100">
      <BoardHeader
        title={board.title}
        description={board.description ?? ""}
      />

      <Board columns={formattedColumns} />
    </main>
  );
}