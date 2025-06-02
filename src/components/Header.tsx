"use client";

import Link from "next/link";
import TransferirDialog from "./TransferirDialog";
import TransacaoDialog from "./TransacaoDialog";
import { ClockCounterClockwise, UserSwitch, List } from "phosphor-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="bg-fundo px-4 py-4 shadow-lg border-b border-gray-400 text-white z-50 animacao rounded-b-3xl relative">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <img className="h-10 block lg:hidden" src="/images/logo.png" alt="Logo" />
          <img className="h-12 hidden lg:block" src="/images/controle+.png" alt="Controle+" />
        </Link>

        <div className="md:hidden">
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="focus:outline-none"
          >
            <List size={32} />
          </button>
        </div>

        <div className="hidden md:flex gap-4 items-center">
          <TransferirDialog />
          <TransacaoDialog />
          <button
            onClick={() => router.push("/historico")}
            className="button-primary px-4 py-2 flex items-center gap-2"
          >
            <ClockCounterClockwise size={20} />
            Histórico
          </button>
          <button
            onClick={() => router.push("/contas")}
            className="button-primary px-4 py-2 flex items-center gap-2"
          >
            <UserSwitch size={20} />
            Alterar Conta
          </button>
        </div>
      </div>

      {menuAberto && (
      <div className="md:hidden w-full bg-fundo border-t border-gray-700 px-4 py-4 flex flex-col gap-3 z-40">
          <TransferirDialog />
          <TransacaoDialog />
          <button
            onClick={() => router.push("/historico")}
            className="button-primary px-4 py-2 flex items-center gap-2"
          >
            <ClockCounterClockwise size={20} />
            Histórico
          </button>
          <button
            onClick={() => router.push("/contas")}
            className="button-primary px-4 py-2 flex items-center gap-2"
          >
            <UserSwitch size={20} />
            Alterar Conta
          </button>
        </div>
      )}
    </header>
  );
}
