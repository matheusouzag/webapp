"use client";
import ContaCard from "@/components/ContaCard";
import CriarDialog from "@/components/CriarDialog";
import { useState } from "react";
import axios from "axios";


export default function Home() {
  return (
      <main className="flex flex-col justify-center m-auto bg-gray-700 text-white w-8/12">
          <div className="text-center space-y-1 bg-fundo p-8 shadow-lg border-b border-gray-400">
            <h1 className="text-4xl">Gestor Financeiro Pessoal</h1>
            <p className="text-lg text-gray-400">subtitulo gestor financeiro</p>
          </div>
          <div className="bg-fundo">
            <div className="flex justify-between py-4 bg-fundo mt-1">
              <div className="border border-gray-100 bg-fundocard px-6 py-4 rounded-xl">
                <CriarDialog />  
                <button className="px-4 py-2 bg-fundocaixas text-xl rounded-xl hover:bg-blue-600 border border-gray-100 text-white mr-3">historico</button>
                <button className="px-4 py-2 bg-fundocaixas text-xl rounded-xl hover:bg-blue-600 border border-gray-100 text-white">transferencia</button>
              </div>
              <div className="px-6 py-4 border border-gray-100 text-white bg-fundocard text-center rounded-xl">
                <p>Contas criadas</p>
                <p className="text-5xl">50</p>
              </div>
            </div>
            <div className="bg-fundocard">
              <div className="flex flex-col border border-gray-100 justify-between px-6 py-7 mt-1 rounded-xl">
                  <div className="flex items-center pb-4">
                    <div className="flex w-full justify-between pr-24 px-4">
                      <p className="text-lg">NOME</p>
                      <p className="text-lg">TIPO</p>
                      <p className="text-lg">SALDO</p>
                    </div>
                  </div>
                <ContaCard nome="Conta Corrente XP" tipo="Corrente" saldo={1500.75} />
                <ContaCard nome="Poupança Nubank" tipo="Poupança" saldo={2340.10} />
              </div>
            </div>
          </div>
      </main>
  );
}
