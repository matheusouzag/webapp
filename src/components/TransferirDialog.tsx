"use client";
import { ArrowsLeftRight } from "phosphor-react";
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
import { ContaDTO } from "@/dtos/Contas.dto";

export default function TransferirDialog() {
  const [contas, setContas] = useState<ContaDTO[]>([]);
  const [origemId, setOrigemId] = useState<string>("");
  const [destinoId, setDestinoId] = useState<string>("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [saldoOrigem, setSaldoOrigem] = useState<number>(0);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [erroTransferencia, setErroTransferencia] = useState("");

  useEffect(() => {
    fetchContas(setContas);
  }, []);


  async function fetchContas(setContas: Function) {
  try {
    const response = await axios.get("http://localhost:3001/accounts");
    setContas(response.data);

    const contaAntigaString = localStorage.getItem('conta');
    if (contaAntigaString) {
      const contaAntiga: ContaDTO = JSON.parse(contaAntigaString);
      const novaConta = response.data.find((c: ContaDTO) => c.id === contaAntiga.id);
      if (novaConta) {
        localStorage.setItem('conta', JSON.stringify(novaConta));
        window.dispatchEvent(new Event("contaAtualizada"));
      }
    }
  } catch (error) {
    console.error("Erro ao buscar contas:", error);
  }
}
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
      fetchContas(setContas);
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
        <button className="button-primary px-4 py-2">
          <ArrowsLeftRight size={24} />
          Transferir
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md card">
        <DialogHeader>
          <DialogTitle className="text-gray-100">Nova Transferência</DialogTitle>
          <DialogDescription className="text-gray-300/70">Preencha os dados para transferir entre contas.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label className="text-gray-100">Conta de Origem</Label>
            <Select value={origemId} onValueChange={handleOrigemChange}>
              <SelectTrigger className="w-full bg-white/20 !text-gray-300">
                <SelectValue placeholder="Selecione a conta de origem" />
              </SelectTrigger>
              <SelectContent className="bg-gray-200">
                {contas.map((conta) => (
                  <SelectItem key={conta.id} value={conta.id.toString()}>
                    {conta.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {origemId && (
              <p className="text-sm text-gray-300">
                Saldo disponível: R$ {saldoOrigem.toFixed(2)}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label className="text-gray-100">Conta de Destino</Label>
            <Select value={destinoId} onValueChange={setDestinoId}>
              <SelectTrigger className="w-full bg-white/20 !text-gray-300">
                <SelectValue placeholder="Selecione a conta de destino" />
              </SelectTrigger>
              <SelectContent className="bg-gray-200">
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
            <Label className="text-gray-100">Valor</Label>
            <Input
              className="bg-white/20 placeholder:text-gray-300 text-gray-300"
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
            <Label className="text-gray-100">Descrição (opcional)</Label>
            <Input
              className="placeholder:text-gray-300 text-gray-300"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: transferência mensal"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button className="button-primary hover:bg-gray-300" type="submit" disabled={loading || !origemId || !destinoId}>
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
