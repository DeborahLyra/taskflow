
import LoginForm from "@/components/auth/LoginForm";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-emerald-600">
            TaskFlow
          </h1>

          <p className="mt-2 text-slate-500">
            Organização de projetos e tarefas
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Entrar
          </h2>

          <p className="mt-1 mb-6 text-sm text-slate-500">
            Acesse sua conta para continuar.
          </p>

          <LoginForm />
        </div>
      </div>
    </main>
  );
}

