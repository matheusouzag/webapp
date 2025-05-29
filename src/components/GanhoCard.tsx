import DetalhesDialog from "./DetalhesDialog";

interface GanhoProps {
  tipo: string;
  conta: string;
  valor: number;
  descricao?: string;
  data: string;
}

export default function GanhoCard({ tipo, conta, valor, descricao, data }: GanhoProps) {
  const dataFormatada = new Date(data).toLocaleString("pt-BR");

  return (
    <DetalhesDialog tipo={tipo} conta={conta} valor={valor} descricao={descricao} data={data}>
      <div className="bg-green-100 px-4 py-6 rounded shadow-md w-full flex flex-col justify-between cursor-pointer hover:scale-95 transition">
        <p className="text-sm text-black font-semibold">
          Conta: <span className="font-normal">{conta}</span>
        </p>
        <p className="text-sm text-black font-semibold">
          Valor: <span className="font-normal">R$ {valor.toFixed(2)}</span>
        </p>
        <p className="text-sm text-black font-semibold">
          Data: <span className="font-normal">{dataFormatada}</span>
        </p>
      </div>
    </DetalhesDialog>
  );
}
