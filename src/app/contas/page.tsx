"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Trash } from "phosphor-react";
import { ContaDTO } from "@/dtos/Contas.dto";
import EditarDialog from "@/components/EditarDialog";
import { useRouter } from "next/navigation";
import CriarDialog from "@/components/CriarDialog";

export default function Externo() {
  const [contas, setContas] = useState<ContaDTO[]>([]);
  const router = useRouter();

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

  function SelecionarConta(conta: ContaDTO) {
    localStorage.setItem("conta", JSON.stringify(conta));
    router.push("/interno");
  }

  return (
    <main className="flex bg-black w-screen min-h-screen font-sans justify-center items-start py-8 px-4">
      <div className="absolute z-0 -top-[10%] blur-[60px] bg-[#1f2937] opacity-40 rounded-b-full w-[80%] h-[70%]" />
      <div className="absolute z-0 bottom-32 left-0 blur-[60px] bg-[#1f2937] opacity-40 rounded-b-full w-full md:w-[24rem] h-[18rem]" />
      <div className="absolute z-0 bottom-0 left-0 blur-[60px] bg-[#1f2937] opacity-40 rounded-b-full w-full md:w-[30rem] h-full md:h-[18rem]" />
      <div className="absolute z-0 top-[50%] right-0 blur-[60px] bg-[#1f2937] opacity-40 rounded-b-full w-full md:w-[23rem] h-[17rem]" />

      <section className="z-50 w-full max-w-7xl animacao">
        <div className="flex flex-col items-center text-center mb-6">
          <h1 className="text-gray-100 text-4xl sm:text-5xl font-extrabold">Contas bancárias</h1>
          <h2 className="text-gray-300/80 text-base sm:text-lg mt-2">Selecione uma das contas bancárias abaixo</h2>
          <div className="mt-4">
            <CriarDialog onAtualizar={fetchContas} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contas.map((conta) => (
            <div
              key={conta.id}
              className="card p-4 flex flex-col justify-between hover:scale-105 transition-all duration-300 cursor-pointer bg-white/5 border border-white/10 rounded-lg"
            >
              <div>
                <h2 className="text-gray-100 text-2xl font-extrabold">{conta.name}</h2>
                <h3 className="text-gray-300/80 text-sm mb-3">{conta.type}</h3>
                <div className="flex justify-between items-center text-gray-300">
                  <h4 className="text-green-600 text-xl">R$ {conta.balance.toFixed(2)}</h4>
                  <div className="flex gap-2">
                    <button onClick={() => handleDelete(conta.id)}>
                      <Trash className="hover:text-red-500 transition-all" size={24} />
                    </button>
                    <EditarDialog
                      id={conta.id}
                      currentName={conta.name}
                      currentType={conta.type}
                      currentBalance={conta.balance}
                      onUpdated={fetchContas}
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={() => SelecionarConta(conta)}
                className="button-primary px-3 py-2 mt-4 text-sm"
              >
                Entrar
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
