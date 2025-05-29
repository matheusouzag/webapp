"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ContaCard from "@/components/ContaCard";
import CriarDialog from "@/components/CriarDialog";
import TransferirDialog from "@/components/TransferirDialog";
import TransacaoDialog from "@/components/TransacaoDialog";
import GastoCard from "@/components/GastoCard";
import GanhoCard from "@/components/GanhoCard";

interface Conta {
  id: number;
  name: string;
  type: string;
  balance: number;
}

interface Transacao {
  id: number;
  type: "credito" | "debito" | "transferencia";
  value: number;
  description?: string;
  date: string;
  accountOrigin?: { name: string };
  accountDestination?: { name: string };
}



export default function Home() {
  const [contas, setContas] = useState<Conta[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);

  useEffect(() => {
  fetchContas();
  fetchTransacoes();
}, []);

const fetchTransacoes = async () => {
  try {
    const response = await axios.get("http://localhost:3001/transactions");
    setTransacoes(response.data);
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
  }
};

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
      <div className="bg-white w-[1200px] mt-12  pb-24">
        <div className="flex justify-between py-4 bg-white">
          <div className="bg-white">
            <CriarDialog />
            <button className="w-24 py-2 bg-black text-sm rounded-xl hover:bg-white hover:text-black border transition ease-in-out duration-300 hover:scale-105 
  border-black text-white mr-3">
              Histórico
            </button>
            <TransferirDialog />
          </div>
          <div className="flex items-start gap-2">
            <TransacaoDialog />
            <div className="px-5 py-4 border border-black text-white bg-black text-center rounded-xl hover:bg-white hover:text-black transition ease-in-out duration-300 hover:scale-105">
              <p className="text-base mb-2">Contas criadas</p>
              <p className="text-5xl">{contas.length}</p>
            </div>   
            </div>
          </div>
        <section className="bg-white mb-8">
          <h2 className="text-xl font-semibold mb-6">Contas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
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
        </section>

        <section className="flex-col mb-8">
          <h2 className="text-xl font-semibold mb-6">Gastos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {transacoes.filter(t => t.type === "debito").map(t => (
              <GastoCard
                key={t.id}
                tipo={t.type}
                conta={t.accountOrigin?.name || "Desconhecida"}
                valor={t.value}
                descricao={t.description}
                data={t.date}
              />
            ))}
          </div>
        </section>

        <section className="flex-col">
          <h2 className="text-xl font-semibold mb-6">Ganhos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {transacoes.filter(t => t.type === "credito").map(t => (
              <GanhoCard
                key={t.id}
                tipo={t.type}
                conta={t.accountDestination?.name || "Desconhecida"}
                valor={t.value}
                descricao={t.description}
                data={t.date}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
