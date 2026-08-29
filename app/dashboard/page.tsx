
export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="flex h-16 items-center justify-between px-6">
          <h1 className="text-xl font-bold text-emerald-600">
            TaskFlow
          </h1>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            >
              🔔
            </button>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700">
              D
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden min-h-[calc(100vh-4rem)] w-64 border-r border-slate-200 bg-white p-4 md:block">
          <nav className="space-y-1">
            <button
              type="button"
              className="w-full rounded-lg bg-emerald-50 px-4 py-3 text-left text-sm font-semibold text-emerald-700"
            >
              Dashboard
            </button>

            <button
              type="button"
              className="w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            >
              Meus boards
            </button>

            <button
              type="button"
              className="w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            >
              Configurações
            </button>
          </nav>
        </aside>

        <section className="flex-1 p-6 md:p-10">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Olá, Deborah 👋
            </h2>

            <p className="mt-2 text-slate-500">
              Aqui está um resumo dos seus projetos.
            </p>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">
                Seus quadros
              </h3>

              <button
                type="button"
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                + Novo quadro
              </button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <button
                type="button"
                className="rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <h4 className="font-semibold text-slate-900">
                  Conteúdo
                </h4>

                <p className="mt-2 text-sm text-slate-500">
                  Organização das tarefas de conteúdo.
                </p>

                <span className="mt-6 block text-sm font-medium text-emerald-600">
                  8 tarefas
                </span>
              </button>

              <button
                type="button"
                className="rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <h4 className="font-semibold text-slate-900">
                  Eventos
                </h4>

                <p className="mt-2 text-sm text-slate-500">
                  Planejamento e organização de eventos.
                </p>

                <span className="mt-6 block text-sm font-medium text-emerald-600">
                  12 tarefas
                </span>
              </button>

              <button
                type="button"
                className="flex min-h-[170px] items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-transparent p-6 text-center transition hover:border-emerald-400 hover:bg-emerald-50"
              >
                <div>
                  <span className="text-2xl text-emerald-600">+</span>

                  <p className="mt-2 text-sm font-semibold text-slate-600">
                    Criar novo quadro
                  </p>
                </div>
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

