import React from 'react';

interface ContaCardProps {
  nome: string;
  tipo: string;
  saldo: number;
}

const ContaCard: React.FC<ContaCardProps> = ({ nome, tipo, saldo }) => {
  return (
    <div className="flex py-4 items-center px-4 border-t border-gray-100">
      <div className="flex w-full justify-between pr-8">
        <p className="text-base">{nome}</p>
        <p className="text-base">{tipo}</p>
        <p className="text-base">R$ {saldo.toFixed(2)}</p>
      </div>
      <div>
        <button className="px-4 py-2 bg-fundocaixas text-lg rounded hover:bg-blue-600 border border-gray-100 text-white">
          ...
        </button>
      </div>
    </div>
  );
};

export default ContaCard;