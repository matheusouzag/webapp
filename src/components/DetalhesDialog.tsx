import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes da Transação</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 text-sm text-gray-800">
          <p><strong>Tipo:</strong> {tipo}</p>
          <p><strong>Conta:</strong> {conta}</p>
          <p><strong>Valor:</strong> R$ {valor.toFixed(2)}</p>
          {descricao && <p><strong>Descrição:</strong> {descricao}</p>}
          <p><strong>Data:</strong> {new Date(data).toLocaleString("pt-BR")}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
