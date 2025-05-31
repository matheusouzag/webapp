"use client";

import Link from "next/link";

export default function Header() {
  return (
    <div className="text-center bg-fundo p-5 shadow-lg border-b border-gray-400 w-full text-white rounded-b-3xl">
      <div className="max-w-7xl m-auto md:flex justify-between md:pr-4 items-center">
        <div className="mb-4 md:mb-0">
          <Link href="/">
            <div className="cursor-pointer">
              <h1 className="text-xl md:text-2xl font-black max-w-7xl m-auto text-center md:text-left px-4">
                Gestor Financeiro Pessoal
              </h1>
              <p className="text-base md:text-lg text-gray-300 max-w-7xl m-auto text-center md:text-left px-4">
                Organize suas finanças com precisão
              </p>
            </div>
          </Link>
        </div>

        <Link href="/historico">
          <button className="w-24 py-2 bg-white text-sm md:text-base font-bold rounded-xl hover:bg-white hover:text-black border border-black text-black transition hover:scale-105">
            Histórico
          </button>
        </Link>
      </div>
    </div>
  );
}
