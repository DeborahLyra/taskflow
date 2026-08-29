
import Board from "@/components/boards/Board";
import BoardHeader from "@/components/boards/BoardHeader";

type Task = {
    id: number;
    title: string;
    description: string;
    dueDate?: string;
};

type BoardColumnData = {
    id: number;
    title: string;
    tasks: Task[];
};

const columns: BoardColumnData[] = [
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

    console.log("Board:", boardId);

    return (
        <main className="min-h-screen bg-slate-100">
            <BoardHeader
                title="Conteúdo"
                description="Organização das tarefas de conteúdo"
            />

            <Board columns={columns} />
        </main>
    );
}

