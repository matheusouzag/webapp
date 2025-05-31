"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ContaCard from "@/components/ContaCard";
import CriarDialog from "@/components/CriarDialog";
import TransferirDialog from "@/components/TransferirDialog";
import TransacaoDialog from "@/components/TransacaoDialog";
import GastoCard from "@/components/GastoCard";
import GanhoCard from "@/components/GanhoCard";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  accountOriginName?: string;
  accountDestinationName?: string;
}

export default function Home() {
  const [contas, setContas] = useState<Conta[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);

  useEffect(() => {
    fetchContas();
    fetchTransacoes();
  }, []);

  const fetchContas = async () => {
    try {
      const response = await axios.get("http://localhost:3001/accounts");
      setContas(response.data);
    } catch (error) {
      console.error("Erro ao buscar contas:", error);
    }
  };

  const fetchTransacoes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/transactions");
      setTransacoes(response.data);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
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

  return (
    <main className="flex flex-col items-center bg-white w-full min-h-screen font-sans">
      <Header />

      <div className="bg-white w-full max-w-7xl px-4 mt-8 pb-24">
        <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start md:py-4 md:gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-6 text-left">Ações</h2>
            <div className="flex flex-wrap gap-3">
              <CriarDialog />         
              <TransferirDialog />
              <TransacaoDialog />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 items-start">
            
            <div className="px-5 py-4 border border-black text-white bg-fundo text-center rounded-xl hover:bg-white hover:text-black transition ease-in-out duration-300 hover:scale-105 hidden md:block">
              <p className="text-base mb-2">Contas criadas</p>
              <p className="text-4xl md:text-5xl">{contas.length}</p>
            </div>
          </div>
        </div>

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold mb-6 text-left">Contas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-6 text-left">Gastos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {transacoes.filter(t => t.type === "debito").map(t => (
              <GastoCard
                key={t.id}
                tipo={t.type}
                conta={t.accountOrigin?.name || t.accountOriginName || "Conta removida"}
                valor={t.value}
                descricao={t.description}
                data={t.date}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-6 text-left">Ganhos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {transacoes.filter(t => t.type === "credito").map(t => (
              <GanhoCard
                key={t.id}
                tipo={t.type}
                conta={t.accountDestination?.name || t.accountDestinationName || "Conta removida"}
                valor={t.value}
                descricao={t.description}
                data={t.date}
              />
            ))}
          </div>
        </section>
      </div>
      <Footer/>
    </main>
  );
}
