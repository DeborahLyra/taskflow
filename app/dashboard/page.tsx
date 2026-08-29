
import Dashboard from "@/components/dashboard/Dashboard";

const boards = [
  {
    id: 1,
    title: "Conteúdo",
    description: "Organização das tarefas de conteúdo.",
    tasks: 8,
  },
  {
    id: 2,
    title: "Eventos",
    description: "Planejamento e organização de eventos.",
    tasks: 12,
  },
];

export default function DashboardPage() {
  return <Dashboard boards={boards} />;
}

