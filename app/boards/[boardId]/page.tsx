
type Task = {
  id: number;
  title: string;
  description: string;
  dueDate?: string;
};

type BoardColumn = {
  id: number;
  title: string;
  tasks: Task[];
};

const columns: BoardColumn[] = [
  {
    id: 1,
    title: "A fazer",
    tasks: [
      {
        id: 1,
        title: "Criar publicação",
        description: "Preparar o conteúdo para a próxima publicação.",
        dueDate: "30/08",
      },
      {
        id: 2,
        title: "Revisar calendário",
        description: "Verificar as próximas publicações.",
        dueDate: "31/08",
      },
    ],
  },
  {
    id: 2,
    title: "Em andamento",
    tasks: [
      {
        id: 3,
        title: "Arte do evento",
        description: "Finalizar a arte para divulgação.",
        dueDate: "29/08",
      },
    ],
  },
  {
    id: 3,
    title: "Concluído",
    tasks: [
      {
        id: 4,
        title: "Post de domingo",
        description: "Publicação finalizada.",
        dueDate: "25/08",
      },
    ],
  },
];

export default async function BoardPage({
  params,
}: {
  params: Promise<{ boardId: string }>;
}) {
  const { boardId } = await params;

  return (
    <main className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="flex min-h-16 items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-center gap-4">
            <a
              href="/dashboard"
              className="text-sm font-medium text-slate-500 transition hover:text-emerald-600"
            >
              ← Meus boards
            </a>

            <div className="hidden h-6 w-px bg-slate-200 sm:block" />

            <div>
              <h1 className="font-bold text-slate-900">
                Conteúdo
              </h1>

              <p className="text-xs text-slate-500">
                Organização das tarefas de conteúdo
              </p>
            </div>
          </div>

          <button
            type="button"
            className="rounded-lg px-3 py-2 text-slate-500 transition hover:bg-slate-100"
          >
            ⋯
          </button>
        </div>
      </header>

      <section className="overflow-x-auto p-6 md:p-8">
        <div className="flex min-w-max gap-5">
          {columns.map((column) => (
            <div
              key={column.id}
              className="flex w-80 flex-col rounded-xl bg-slate-200/70 p-3"
            >
              <div className="mb-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">
                    {column.title}
                  </h2>

                  <span className="rounded-full bg-slate-300 px-2 py-0.5 text-xs font-semibold text-slate-600">
                    {column.tasks.length}
                  </span>
                </div>

                <button
                  type="button"
                  className="rounded-md px-2 py-1 text-slate-500 transition hover:bg-slate-300"
                >
                  ⋯
                </button>
              </div>

              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <article
                    key={task.id}
                    className="cursor-pointer rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <h3 className="font-semibold text-slate-800">
                      {task.title}
                    </h3>

                    <p className="mt-2 text-sm leading-5 text-slate-500">
                      {task.description}
                    </p>

                    {task.dueDate && (
                      <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                        <span>📅</span>
                        <span>{task.dueDate}</span>
                      </div>
                    )}
                  </article>
                ))}
              </div>

              <button
                type="button"
                className="mt-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-500 transition hover:bg-slate-300 hover:text-slate-700"
              >
                + Adicionar tarefa
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

