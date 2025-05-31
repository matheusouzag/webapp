"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import DetalhesDialog from "@/components/DetalhesDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Transacao {
  id: number;
  type: "credito" | "debito" | "transferencia";
  value: number;
  description?: string;
  date: string;
  accountOriginName?: string;
  accountDestinationName?: string;
}

export default function HistoricoTransacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);

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

  const transferencias = transacoes.filter(t => t.type === "transferencia");
  const outras = transacoes.filter(t => t.type !== "transferencia");

  return (
    <main className="flex flex-col font-sans">
      <Header />
      <div className="w-full max-w-7xl m-auto px-4 mt-8 pb-24">
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
                className="flex sm:grid sm:grid-cols-5 items-center border-b py-3 px-4 md:px-0 text-sm hover:bg-gray-50 transition bg-gray-100 sm:bg-transparent rounded-xl sm:rounded-none mb-3 sm:mb-0"
              >
                <div className="w-1/2 sm:w-auto">{t.accountOriginName || "—"}</div>
                <div className="hidden sm:block">{t.accountDestinationName || "—"}</div>
                <div className="w-1/2 sm:w-auto text-right sm:text-left">R$ {t.value.toFixed(2)}</div>
                <div className="hidden sm:block">{new Date(t.date).toLocaleString("pt-BR")}</div>
                <div className="w-auto sm:w-auto ml-2 sm:ml-0 md:ml-7">
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
                className="flex sm:grid sm:grid-cols-5 items-center border-b py-3 px-4 md:px-0 text-sm hover:bg-gray-50 transition bg-gray-100 sm:bg-transparent rounded-xl sm:rounded-none mb-3 sm:mb-0"
              >
                <div className="w-1/2 sm:w-auto capitalize">{t.type}</div>
                <div className="hidden sm:block">
                  {t.type === "credito" ? t.accountDestinationName : t.accountOriginName}
                </div>
                <div
                  className={`w-1/2 sm:w-auto text-right sm:text-left ${
                    t.type === "debito" ? "text-red-600" : "text-green-600"
                  } font-medium`}
                >
                  {(t.type === "debito" ? "-" : "+") + " R$ " + t.value.toFixed(2)}
                </div>
                <div className="hidden sm:block">{new Date(t.date).toLocaleString("pt-BR")}</div>
                <div className="w-auto sm:w-auto ml-2 sm:ml-0 md:ml-7">
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
      <Footer/>
    </main>
  );
}
