
"use client";

type Member = {
  id: number;
  name: string;
  email: string;
  role: "Administrador" | "Membro";
};

type MemberModalProps = {
  members: Member[];
  onClose: () => void;
};

export default function MemberModal({
  members,
  onClose,
}: MemberModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Membros do quadro
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Pessoas que possuem acesso a este quadro.
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

        <div className="p-6">
          <div className="space-y-3">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700">
                    {member.name.charAt(0)}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {member.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {member.email}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    member.role === "Administrador"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {member.role}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mt-5 w-full rounded-lg border border-dashed border-slate-300 px-4 py-3 text-sm font-semibold text-slate-500 transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-600"
          >
            + Adicionar membro
          </button>
        </div>
      </div>
    </div>
  );
}

