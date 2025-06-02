"use client";

import { useEffect, useState } from "react";
import GastoCard from "./GastoCard";
import axios from "axios";
import {
  ArrowCircleDown,
  ArrowCircleUp,
  List,
  UserCircle,
} from "phosphor-react";
import { ContaDTO } from "@/dtos/Contas.dto";
import { TransacaoDTO } from "@/dtos/Transacao.dto";

export default function Dashboard() {
  const [transacoes, setTransacoes] = useState<TransacaoDTO[]>([]);
  const [tipo, setTipo] = useState<"credito" | "debito" | undefined>(undefined);
  const [conta, setConta] = useState<ContaDTO>(
    JSON.parse(localStorage.getItem("conta")!)
  );

  useEffect(() => {
    const atualizarConta = () => {
      const contaAtualizada = JSON.parse(localStorage.getItem("conta")!);
      setConta(contaAtualizada);
      fetchTransacoes();
    };

    window.addEventListener("contaAtualizada", atualizarConta);
    return () => {
      window.removeEventListener("contaAtualizada", atualizarConta);
    };
  }, []);

  const fetchTransacoes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/transactions");
      setTransacoes(response.data);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  };

  return (
    <main className="flex flex-col gap-4 z-50 animacao">
      <section className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-end border-b border-gray-100 pb-4">
        {/* Conta */}
        <div className="flex gap-2 text-gray-100 items-center">
          <UserCircle size={54} />
          <div className="flex flex-col">
            <h2 className="text-gray-100 text-2xl md:text-3xl font-extrabold">
              {conta.name}
            </h2>
            <p className="text-gray-100 opacity-80 text-sm md:text-base">
              {conta.type}
            </p>
          </div>
        </div>

        {/* Saldo */}
        <div className="flex flex-col card px-3 py-2 w-full md:w-auto">
          <p className="text-gray-200 text-xs">Saldo Atual</p>
          <h3 className="text-2xl md:text-3xl text-gray-200">
            R$ {conta.balance},00
          </h3>
        </div>
      </section>

      {/* Filtros */}
      <section>
        <div className="card p-4 mb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h2 className="text-2xl font-semibold text-left text-gray-300">
            Extratos
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTipo("debito")}
              className={`px-3 py-2 text-sm flex items-center gap-1 ${
                tipo === "debito" ? "button-secondary" : "button-primary"
              }`}
            >
              <ArrowCircleUp size={20} />
              Débitos
            </button>
            <button
              onClick={() => setTipo("credito")}
              className={`px-3 py-2 text-sm flex items-center gap-1 ${
                tipo === "credito" ? "button-secondary" : "button-primary"
              }`}
            >
              <ArrowCircleDown size={20} />
              Créditos
            </button>
            <button
              onClick={() => setTipo(undefined)}
              className={`px-3 py-2 text-sm flex items-center gap-1 ${
                tipo === undefined ? "button-secondary" : "button-primary"
              }`}
            >
              <List size={20} />
              Todos
            </button>
          </div>
        </div>

        {/* Lista */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {transacoes
            .filter(
              (t) =>
                t.type !== "transferencia" &&
                (t.type === tipo || tipo === undefined) &&
                ((t.accountDestinationName === conta.name &&
                  t.type === "credito") ||
                  (t.accountOriginName === conta.name && t.type === "debito"))
            )
            .map((t) => (
              <GastoCard
                key={t.id}
                tipo={t.type}
                conta={
                  t.accountOrigin?.name ||
                  t.accountOriginName ||
                  "Conta removida"
                }
                valor={t.value}
                descricao={t.description}
                data={t.date}
              />
            ))}
        </div>
      </section>
    </main>
  );
}
