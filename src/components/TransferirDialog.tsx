"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";

interface Conta {
  id: number;
  name: string;
  balance: number;
}

export default function TransferirDialog() {
  const [contas, setContas] = useState<Conta[]>([]);
  const [origemId, setOrigemId] = useState<string>("");
  const [destinoId, setDestinoId] = useState<string>("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [saldoOrigem, setSaldoOrigem] = useState<number>(0);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [erroTransferencia, setErroTransferencia] = useState("");

  useEffect(() => {
    const fetchContas = async () => {
      try {
        const response = await axios.get("http://localhost:3001/accounts");
        setContas(response.data);
      } catch (error) {
        console.error("Erro ao buscar contas:", error);
      }
    };
    fetchContas();
  }, []);

  const handleOrigemChange = (value: string) => {
    setOrigemId(value);
    setErroTransferencia("");
    const contaSelecionada = contas.find((c) => c.id.toString() === value);
    setSaldoOrigem(contaSelecionada?.balance || 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErroTransferencia("");

    const valorNumerico = Number(valor);

    if (valorNumerico > saldoOrigem) {
      setErroTransferencia("Valor da transferência excede o saldo disponível.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        type: "transferencia",
        accountOriginId: Number(origemId),
        accountDestinationId: Number(destinoId),
        value: valorNumerico,
        description: descricao,
      };

      await axios.post("http://localhost:3001/transactions", payload);
      setSuccessMessage("Transferência realizada com sucesso!");
      setOrigemId("");
      setDestinoId("");
      setValor("");
      setDescricao("");
      setSaldoOrigem(0);
    } catch (error: any) {
      console.error("Erro ao transferir:", error);
      setErroTransferencia(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-24 py-2 bg-fundo text-sm rounded-xl hover:bg-white hover:text-black border border-black text-white transition hover:scale-105">
          Transferir
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nova Transferência</DialogTitle>
          <DialogDescription>Preencha os dados para transferir entre contas.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Conta de Origem</Label>
            <Select value={origemId} onValueChange={handleOrigemChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione a conta de origem" />
              </SelectTrigger>
              <SelectContent>
                {contas.map((conta) => (
                  <SelectItem key={conta.id} value={conta.id.toString()}>
                    {conta.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {origemId && (
              <p className="text-sm text-gray-500">Saldo disponível: R$ {saldoOrigem.toFixed(2)}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Conta de Destino</Label>
            <Select value={destinoId} onValueChange={setDestinoId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione a conta de destino" />
              </SelectTrigger>
              <SelectContent>
                {contas
                  .filter((conta) => conta.id.toString() !== origemId)
                  .map((conta) => (
                    <SelectItem key={conta.id} value={conta.id.toString()}>
                      {conta.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Valor</Label>
            <Input
              type="text"
              inputMode="decimal"
              pattern="^\d*\.?\d*$"
              value={valor}
              onChange={(e) => {
                const input = e.target.value;
                if (/^\d*\.?\d*$/.test(input) || input === "") {
                  setValor(input);
                  setErroTransferencia("");
                }
              }}
              placeholder="Ex: 150.00"
            />
          </div>

          <div className="grid gap-2">
            <Label>Descrição (opcional)</Label>
            <Input
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: transferência mensal"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="submit" disabled={loading || !origemId || !destinoId}>
              {loading ? "Processando..." : "Transferir"}
            </Button>
          </DialogFooter>

          {erroTransferencia && <p className="text-red-600 text-sm">{erroTransferencia}</p>}
          {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
}
