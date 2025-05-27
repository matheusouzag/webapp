import React, { useState } from 'react';
import EditarDialog from './EditarDialog';

interface ContaCardProps {
  id: number;
  nome: string;
  tipo: string;
  saldo: number;
  onDelete: (id: number) => void;
  onUpdated: () => void;
}

const ContaCard: React.FC<ContaCardProps> = ({ id, nome, tipo, saldo, onDelete, onUpdated }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_auto] items-center w-3/4">
      <p className="text-base text-[#1f1f21] font-normal">{nome}</p>
      <p className="text-base text-[#1f1f21] font-normal">{tipo}</p>
      <p className="text-base text-[#1f1f21] font-normal">R$ {saldo.toFixed(2)}</p>

      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="px-4 py-2 bg-fundocaixas text-lg rounded hover:bg-blue-600 border border-gray-100 text-white"
        >
          ...
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-md z-10">
            <EditarDialog
              id={id}
              currentName={nome}
              currentType={tipo}
              currentBalance={saldo}
              onUpdated={onUpdated}
            />
            <button
              onClick={() => {
                onDelete(id);
                setShowMenu(false);
              }}
              className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-red-600"
            >
              Apagar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContaCard;
