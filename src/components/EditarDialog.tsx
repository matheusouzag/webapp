"use client";

import { useState, useEffect } from "react";
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
import { NotePencil } from "phosphor-react";

interface EditarDialogProps {
  id: number;
  currentName: string;
  currentType: string;
  currentBalance: number;
  onUpdated: () => void;
}

export default function EditarDialog({
  id,
  currentName,
  currentType,
  currentBalance,
  onUpdated,
}: EditarDialogProps) {
  const [form, setForm] = useState({
    name: currentName,
    type: currentType,
    balance: currentBalance.toString(),
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

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

    try {
      const payload = {
        name: form.name,
        type: form.type,
        balance: form.balance ? Number(form.balance) : 0,
      };

      await axios.put(`http://localhost:3001/accounts/${id}`, payload);
      setOpen(false);
      onUpdated();
    } catch (error: any) {
      console.error("Erro ao editar conta:", error);
      alert("Erro ao editar conta: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setForm({
      name: currentName,
      type: currentType,
      balance: currentBalance.toString(),
    });
  }, [currentName, currentType, currentBalance]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="hover:text-gray-400 transition-all">
          <NotePencil size={32} />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md card">
        <DialogHeader>
          <DialogTitle className="text-gray-100">Editar Conta</DialogTitle>
          <DialogDescription className="text-gray-300/70">
            Altere os dados da conta e salve as mudanças.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-gray-100">Nome</Label>
            <Input
              id="name"
              name="name"
              className="bg-white/20 placeholder:text-gray-300 text-gray-300"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="type" className="text-gray-100">Tipo</Label>
            <Select onValueChange={handleTipoChange} value={form.type}>
              <SelectTrigger className="w-full bg-white/20 text-gray-300">
                <SelectValue placeholder="Tipo da Conta" />
              </SelectTrigger>
              <SelectContent className="bg-gray-200">
                <SelectItem value="Corrente">Corrente</SelectItem>
                <SelectItem value="Poupança">Poupança</SelectItem>
                <SelectItem value="Carteira">Carteira</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="balance" className="text-gray-100">Saldo</Label>
            <Input
              id="balance"
              name="balance"
              type="number"
              className="bg-white/20 placeholder:text-gray-300 text-gray-300"
              value={form.balance}
              onChange={handleChange}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              className="button-primary hover:bg-gray-300"
              type="submit"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
