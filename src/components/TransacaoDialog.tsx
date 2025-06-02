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
import { Coins } from "phosphor-react";
import { ContaDTO } from "@/dtos/Contas.dto";

export default function TransacaoDialog() {
  const [contas, setContas] = useState<ContaDTO[]>([]);
  const [tipo, setTipo] = useState("");
  const [contaId, setContaId] = useState("");
  const [saldoConta, setSaldoConta] = useState<number | null>(null);
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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


  const handleTipoChange = (value: string) => {
    setTipo(value);
    setContaId("");
    setSaldoConta(null);
    setErro("");
    setValor("");
  };

  const handleContaChange = (value: string) => {
    setContaId(value);
    const conta = contas.find((c) => c.id.toString() === value);
    setSaldoConta(conta?.balance ?? null);
    setErro("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setSuccess("");
    setLoading(true);

    const valorNumerico = Number(valor);

    if (!tipo || !contaId || isNaN(valorNumerico) || valorNumerico <= 0) {
      setErro("Preencha todos os campos corretamente.");
      setLoading(false);
      return;
    }

    if (tipo === "debito" && saldoConta !== null && valorNumerico > saldoConta) {
      setErro("Valor excede o saldo disponível da conta.");
      setLoading(false);
      return;
    }

    const payload: any = {
      type: tipo,
      value: valorNumerico,
      description: descricao,
    };

    if (tipo === "debito") payload.accountOriginId = Number(contaId);
    if (tipo === "credito") payload.accountDestinationId = Number(contaId);

    try {
      await axios.post("http://localhost:3001/transactions", payload);
      setSuccess("Transação registrada com sucesso!");
      setTipo("");
      setContaId("");
      setSaldoConta(null);
      setValor("");
      setDescricao("");
      fetchContas(setContas)
    } catch (error: any) {
      console.error("Erro ao registrar transação:", error);
      setErro(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="button-primary px-4 py-2 flex items-center gap-2">
          <Coins size={24} />
          Gastos/Ganhos
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md card">
        <DialogHeader>
          <DialogTitle className="text-gray-100">Nova Transação</DialogTitle>
          <DialogDescription className="text-gray-300/70">Registre um novo ganho ou gasto.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label className="text-gray-100">Tipo da Transação</Label>
            <Select value={tipo} onValueChange={handleTipoChange}>
              <SelectTrigger className="w-full bg-white/20 !text-gray-300">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent className="bg-gray-200">
                <SelectItem value="credito">Crédito (Ganhos)</SelectItem>
                <SelectItem value="debito">Débito (Gastos)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {tipo && (
            <div className="grid gap-2">
              <Label className="text-gray-100">{tipo === "debito" ? "Conta de Origem" : "Conta de Destino"}</Label>
              <Select value={contaId} onValueChange={handleContaChange}>
                <SelectTrigger className="w-full bg-white/20 !text-gray-300">
                  <SelectValue placeholder="Selecione a conta" />
                </SelectTrigger>
                <SelectContent className="bg-gray-200">
                  {contas.map((conta) => (
                    <SelectItem key={conta.id} value={conta.id.toString()}>
                      {conta.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {tipo === "debito" && saldoConta !== null && (
                <p className="text-sm text-gray-300">
                  Saldo disponível: R$ {saldoConta.toFixed(2)}
                </p>
              )}
            </div>
          )}

          <div className="grid gap-2">
            <Label className="text-gray-100">Valor</Label>
            <Input className="bg-white/20 placeholder:text-gray-300 text-gray-300"
              type="text"
              inputMode="decimal"
              pattern="^\d*\.?\d*$"
              value={valor}
              onChange={(e) => {
                const input = e.target.value;
                if (/^\d*\.?\d*$/.test(input) || input === "") {
                  setValor(input);
                }
              }}
              placeholder="Ex: 150.00"
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-gray-100">Descrição (opcional)</Label>
            <Input className="placeholder:text-gray-300 text-gray-300"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: salário, mercado..."
            />
          </div>

          <DialogFooter className="pt-2">
            <Button className="button-primary hover:bg-gray-300" type="submit" disabled={loading || !tipo}>
              {loading ? "Salvando..." : "Registrar"}
            </Button>
          </DialogFooter>

          {erro && <p className="text-red-600 text-sm">{erro}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
}
