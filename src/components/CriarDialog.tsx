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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CriarDialog() {
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

      const response = await axios.post("http://localhost:3001/accounts", payload);
      setSuccessMessage("Conta criada com sucesso!");
      setForm({ name: "", type: "", balance: "" });

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
        <button className="px-4 py-2 bg-fundocaixas text-xl rounded-xl hover:bg-blue-600 border border-gray-100 text-white mr-3">
          criar
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Criar Nova Conta</DialogTitle>
          <DialogDescription>Preencha os dados para criar uma nova conta.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome da Conta</Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Ex: Conta Corrente XP"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="type">Tipo da Conta</Label>
            <Select onValueChange={handleTipoChange} value={form.type}>
              <SelectTrigger id="type" className="w-full">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Corrente">Corrente</SelectItem>
                <SelectItem value="Poupança">Poupança</SelectItem>
                <SelectItem value="Carteira">Carteira</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="balance">Saldo Inicial (opcional)</Label>
            <Input
              id="balance"
              name="balance"
              type="number"
              value={form.balance}
              onChange={handleChange}
              placeholder="R$ 0,00"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>

        {successMessage && (
          <p className="text-green-600 text-sm pt-2">{successMessage}</p>
        )}
      </DialogContent>
    </Dialog>
  );
}