"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Dashboard from "@/components/Dashboard";
import { TransacaoDTO } from "@/dtos/Transacao.dto";
import { ContaDTO } from "@/dtos/Contas.dto";

export default function Interno({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [contas, setContas] = useState<ContaDTO[]>([]);
  const [transacoes, setTransacoes] = useState<TransacaoDTO[]>([]);

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

  return (
    <main className="flex flex-col bg-black w-full min-h-screen font-sans relative">
      <div className="absolute z-0 -top-[10%] blur-[60px] bg-[#1f2937] opacity-40 rounded-b-full w-[80%] h-[70%]" />
      <div className="absolute z-0 bottom-32 left-0 blur-[60px] bg-[#1f2937] opacity-40 rounded-b-full w-full md:w-[24rem] h-[18rem]" />
      <div className="absolute z-0 bottom-0 left-0 blur-[60px] bg-[#1f2937] opacity-40 rounded-b-full w-full md:w-[30rem] h-full md:h-[18rem]" />
      <div className="absolute z-0 top-[50%] right-0 blur-[60px] bg-[#1f2937] opacity-40 rounded-b-full w-full md:w-[23rem] h-[17rem]" />

      <Header />

      <div className="w-full max-w-screen-xl mx-auto px-4 mt-6 flex-1 overflow-y-auto z-10">
        <Dashboard />
      </div>

      <Footer />
    </main>
  );
}
