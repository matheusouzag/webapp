import React, { useState, useRef } from 'react';
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
    <div className="bg-gray-100 px-4 py-6 rounded shadow-md w-full flex flex-col justify-between relative gap-1 transition ease-in-out duration-300 hover:scale-95">
      <p className="text-sm text-black font-semibold">Nome: <span className="font-normal">{nome}</span></p>
      <p className="text-sm text-black font-semibold">Tipo: <span className="font-normal">{tipo}</span></p>
      <p className="text-sm text-black font-semibold">Saldo: <span className="font-normal">R$ {saldo.toFixed(2)}</span></p>

      <div className="absolute top-2 right-2">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="text-lg font-bold px-2 py-1 bg-gray-100 text-black rounded"
        >
          ⋮
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-md z-10">
            <EditarDialog
              id={id}
              currentName={nome}
              currentType={tipo}
              currentBalance={saldo}
              onUpdated={() => {
                setShowMenu(false); 
              }}
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
