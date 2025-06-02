"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import DetalhesDialog from "@/components/DetalhesDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TransacaoDTO } from "@/dtos/Transacao.dto";

export default function HistoricoTransacoes() {
  const [transacoes, setTransacoes] = useState<TransacaoDTO[]>([]);

  useEffect(() => {
    fetchTransacoes();
  }, []);

  const fetchTransacoes = async () => {
    try {
      const res = await axios.get("http://localhost:3001/transactions");
      setTransacoes(res.data);
    } catch (err) {
      console.error("Erro ao buscar transações", err);
    }
  };

  const transferencias = transacoes.filter((t) => t.type === "transferencia");
  const outras = transacoes.filter((t) => t.type !== "transferencia");

  return (
    <main className="flex flex-col items-center bg-black text-gray-300 w-full min-h-screen font-sans">
      <div className="absolute z-0 -top-[10%] blur-[60px] bg-[#1f2937] opacity-40 rounded-b-full w-[80%] h-[70%]" />
      <div className="absolute z-0 bottom-32 left-0 blur-[60px] bg-[#1f2937] opacity-40 rounded-b-full w-full md:w-[24rem] h-[18rem]" />
      <div className="absolute z-0 bottom-0 left-0 blur-[60px] bg-[#1f2937] opacity-40 rounded-b-full w-full md:w-[30rem] h-full md:h-[18rem]" />
      <div className="absolute z-0 top-[50%] right-0 blur-[60px] bg-[#1f2937] opacity-40 rounded-b-full w-full md:w-[23rem] h-[17rem]" />
      <div className="w-full max-w-full">
        <Header />
      </div>
      

      <div className="w-full max-w-7xl px-4 pt-8 md:pt-8 h-full z-50">
        <h1 className="text-2xl font-bold mb-6">Histórico de Transações</h1>

        {transferencias.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-5">Transferências</h2>

            <div className="hidden sm:grid grid-cols-5 font-semibold text-base py-2 rounded">
              <div>Conta de Origem</div>
              <div>Conta de Destino</div>
              <div>Valor</div>
              <div>Data</div>
              <div>Detalhes</div>
            </div>

            {transferencias.map((t) => (
              <div
                key={t.id}
                className="flex flex-col sm:grid sm:grid-cols-5 sm:items-center border-b py-3 px-4 md:px-0 text-sm hover:bg-white/20 transition-all duration-300 sm:bg-transparent rounded-xl sm:rounded-none mb-3 sm:mb-0"
              >
                <div className="sm:col-span-1 font-medium">
                  <span className="block sm:hidden font-semibold">Origem:</span>
                  {t.accountOriginName || "—"}
                </div>
                <div className="hidden sm:block">{t.accountDestinationName || "—"}</div>
                <div className="sm:col-span-1 font-medium text-right sm:text-left">
                  <span className="block sm:hidden font-semibold">Valor:</span>
                  R$ {t.value.toFixed(2)}
                </div>
                <div className="hidden sm:block">{new Date(t.date).toLocaleString("pt-BR")}</div>
                <div className="sm:col-span-1 mt-2 sm:mt-0 sm:text-center">
                  <DetalhesDialog
                    tipo={t.type}
                    valor={t.value}
                    descricao={t.description}
                    data={t.date}
                    conta={`${t.accountOriginName} → ${t.accountDestinationName}`}
                  >
                    <span className="cursor-pointer hover:text-black transition">
                      <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                    </span>
                  </DetalhesDialog>
                </div>
              </div>
            ))}
          </>
        )}

        {outras.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mt-10 mb-5">Ganhos e Gastos</h2>

            <div className="hidden sm:grid grid-cols-5 font-semibold text-base py-2 rounded">
              <div>Tipo</div>
              <div>Conta</div>
              <div>Valor</div>
              <div>Data</div>
              <div>Detalhes</div>
            </div>

            {outras.map((t) => (
              <div
                key={t.id}
                className="flex flex-col sm:grid sm:grid-cols-5 sm:items-center border-b py-3 px-4 md:px-0 text-sm hover:bg-white/20 transition-all duration-300 sm:bg-transparent rounded-xl sm:rounded-none mb-3 sm:mb-0"
              >
                <div className="capitalize font-medium">
                  <span className="block sm:hidden font-semibold">Tipo:</span>
                  {t.type}
                </div>
                <div className="hidden sm:block">
                  {t.type === "credito" ? t.accountDestinationName : t.accountOriginName}
                </div>
                <div
                  className={`font-medium text-right sm:text-left ${
                    t.type === "debito" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  <span className="block sm:hidden font-semibold">Valor:</span>
                  {(t.type === "debito" ? "-" : "+") + " R$ " + t.value.toFixed(2)}
                </div>
                <div className="hidden sm:block">{new Date(t.date).toLocaleString("pt-BR")}</div>
                <div className="mt-2 sm:mt-0">
                  <DetalhesDialog
                    tipo={t.type}
                    valor={t.value}
                    descricao={t.description}
                    data={t.date}
                    conta={
                      t.type === "credito"
                        ? t.accountDestinationName || ""
                        : t.accountOriginName || ""
                    }
                  >
                    <span className="cursor-pointer hover:text-black transition">
                      <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                    </span>
                  </DetalhesDialog>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
