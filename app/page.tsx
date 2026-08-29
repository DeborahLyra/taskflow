
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="mb-8">
          <span className="text-3xl font-bold tracking-tight text-emerald-600">
            TaskFlow
          </span>
        </div>

        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Organize seus projetos.
            <span className="block text-emerald-600">
              Conquiste seus objetivos.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Um espaço simples e organizado para planejar tarefas,
            acompanhar projetos e trabalhar em equipe.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700">
              Entrar
            </button>

            <button className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100">
              Criar conta
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

