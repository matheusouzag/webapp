import DetalhesDialog from "./DetalhesDialog";

interface GastoProps {
  tipo: string;
  conta: string;
  valor: number;
  descricao?: string;
  data: string;
}

export default function GastoCard({
  tipo,
  conta,
  valor,
  descricao,
  data,
}: GastoProps) {
  const dataFormatada = new Date(data).toLocaleString("pt-BR");

  return (
    <DetalhesDialog
      tipo={tipo}
      conta={conta}
      valor={valor}
      descricao={descricao}
      data={data}
    >
      <div className="card p-4 flex flex-col hover:scale-105 transition-all duration-300 cursor-pointer">
        <h5 className="text-gray-300/80 text-sm">Gastos e Ganhos</h5>
        <h3
          className={`text-3xl md:text-4xl font-bold ${
            tipo === "debito" ? "text-red-600" : "text-green-600"
          }`}
        >
          R$ {valor},00
        </h3>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-gray-300/80 mt-3 text-sm border-t border-gray-300 pt-2">
          <p className="capitalize">{tipo}</p>
          <p className="mt-1 sm:mt-0">{dataFormatada}</p>
        </div>
      </div>
    </DetalhesDialog>
  );
}
