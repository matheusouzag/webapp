import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DetalhesDialogProps {
  tipo: string;
  conta: string;
  valor: number;
  descricao?: string;
  data: string;
  children: React.ReactNode;
}

export default function DetalhesDialog({
  tipo,
  conta,
  valor,
  descricao,
  data,
  children,
}: DetalhesDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-gray-100">Detalhes da Transação</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 text-sm text-gray-300 pt-2">
          <p>
            <span className="text-gray-100 font-semibold">Tipo:</span> {tipo}
          </p>
          <p>
            <span className="text-gray-100 font-semibold">Conta:</span> {conta}
          </p>
          <p>
            <span className="text-gray-100 font-semibold">Valor:</span> R$ {valor.toFixed(2)}
          </p>
          {descricao && (
            <p>
              <span className="text-gray-100 font-semibold">Descrição:</span> {descricao}
            </p>
          )}
          <p>
            <span className="text-gray-100 font-semibold">Data:</span>{" "}
            {new Date(data).toLocaleString("pt-BR")}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
