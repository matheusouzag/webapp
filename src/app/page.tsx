"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ContaCard from "@/components/ContaCard";
import CriarDialog from "@/components/CriarDialog";

interface Conta {
  id: number;
  name: string;
  type: string;
  balance: number;
}

export default function Home() {
  const [contas, setContas] = useState<Conta[]>([]);

  useEffect(() => {
    fetchContas();
  }, []);

  const fetchContas = async () => {
    try {
      const response = await axios.get("http://localhost:3001/accounts");
      setContas(response.data);
    } catch (error) {
      console.error("Erro ao buscar contas:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/accounts/${id}`);
      setContas((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Erro ao apagar conta:", error);
    }
  };

  const handleEdit = (id: number) => {
    alert("Editar conta ID: " + id);
  };

  return (
    <main className="flex flex-col items-center bg-white w-full h-screen font-sans">
      <div className="text-center bg-white p-5 shadow-lg border-b border-gray-400 w-full">
        <h1 className="text-2xl font-black">Gestor Financeiro Pessoal</h1>
        <p className="text-lg text-gray-600">Organize suas finanças com precisão</p>
      </div>
      <div className="bg-white w-11/12 mt-12">
        <div className="flex justify-between py-4 bg-white">
          <div className="bg-white">
            <CriarDialog />
            <button className="w-24 py-2 bg-black text-sm rounded-xl hover:bg-white hover:text-black border transition ease-in-out duration-300 hover:scale-105 
  border-black text-white mr-3">
              Histórico
            </button>
            <button className="w-24 py-2 bg-black text-sm rounded-xl hover:bg-white hover:text-black border transition ease-in-out duration-300 hover:scale-105 
  border-black text-white mr-3">
              Transferir
            </button>
          </div>
          <div className="px-5 py-4 border border-black text-white bg-black text-center rounded-xl hover:bg-white hover:text-black transition ease-in-out duration-300 hover:scale-105">
            <p className="text-base mb-2">Contas criadas</p>
            <p className="text-5xl">{contas.length}</p>
          </div>
        </div>
        <div className="bg-white py-6">
          <div className="grid grid-cols-[1fr_1fr_1fr_auto] font-semibold text-lg text-gray-600 pb-4 w-3/4">
            <p className="text-base text-black">Nome</p>
            <p className="text-base text-black">Tipo</p>
            <p className="text-base text-black">Saldo</p>
            <p className="text-base text-black">Ações</p>
          </div>

          <div>
            {contas.map((conta) => (
              <ContaCard
                key={conta.id}
                id={conta.id}
                nome={conta.name}
                tipo={conta.type}
                saldo={conta.balance}
                onDelete={handleDelete}
                onUpdated={fetchContas}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
