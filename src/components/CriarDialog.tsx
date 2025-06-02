"use client";
import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "phosphor-react";

export default function CriarDialog({ onAtualizar }: { onAtualizar?: () => void }) {
  const [form, setForm] = useState({
    name: "",
    type: "",
    balance: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTipoChange = (value: string) => {
    setForm((prev) => ({ ...prev, type: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    try {
      const payload = {
        name: form.name,
        type: form.type,
        balance: form.balance ? Number(form.balance) : 0,
      };

      await axios.post("http://localhost:3001/accounts", payload);
      setSuccessMessage("Conta criada com sucesso!");
      setForm({ name: "", type: "", balance: "" });
      onAtualizar?.(); 
    } catch (error: any) {
      console.error("Erro ao criar conta:", error);
      alert("Erro ao criar conta: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="button-primary px-4 py-2"><PlusCircle size={24} />Criar Conta </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md card">
        <DialogHeader>
          <DialogTitle className="text-gray-100">Criar Nova Conta</DialogTitle>
          <DialogDescription className="text-gray-300/70">
            Preencha os dados para criar uma nova conta.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-gray-100">Nome da Conta</Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Ex: Conta Corrente XP"
              className="bg-white/20 placeholder:text-gray-300 text-gray-300"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="type" className="text-gray-100">Tipo da Conta</Label>
            <Select onValueChange={handleTipoChange} value={form.type}>
              <SelectTrigger id="type" className="w-full bg-white/20 !text-gray-300">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent className="bg-gray-200">
                <SelectItem value="Corrente">Corrente</SelectItem>
                <SelectItem value="Poupança">Poupança</SelectItem>
                <SelectItem value="Carteira">Carteira</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="balance" className="text-gray-100">Saldo Inicial (opcional)</Label>
            <Input
              id="balance"
              name="balance"
              type="number"
              value={form.balance}
              onChange={handleChange}
              placeholder="R$ 0,00"
              className="bg-white/20 placeholder:text-gray-300 text-gray-300"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button className="button-primary hover:bg-gray-300" type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>

          {successMessage && (
            <p className="text-green-600 text-sm">{successMessage}</p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
