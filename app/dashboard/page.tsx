
import Dashboard from "@/components/dashboard/Dashboard";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  console.log("USER DO SUPABASE:", user);
  
  const { data: adminTest, error: adminError } =
    await supabase.rpc("is_admin");
  
  console.log("ADMIN TEST:", adminTest);
  console.log("ADMIN ERROR:", adminError);
  console.log("USER DO SUPABASE:", user);
  
  if (!user) {
    return null;
  }
  
  const {
    data: profile,
    error: profileError,
  } = await supabase
    .from("profiles")
    .select("name, role")
    .eq("id", user.id)
    .single();
  
  console.log("PROFILE:", profile);
  console.log("PROFILE ERROR:", profileError);
    
    const { data: boards, error } = await supabase
    .from("boards")
    .select(`
      id,
      title,
      description
    `)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("Erro ao buscar boards:", error);
  }

  const formattedBoards = (boards ?? []).map((board) => ({
    id: board.id,
    title: board.title,
    description: board.description ?? "",
    tasks: 0,
  }));

  return (
    <Dashboard
      boards={formattedBoards}
      userName={profile?.name ?? "Usuário"}
      userRole={profile?.role ?? "member"}
    />
  );

  }