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
        <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left">
          Editar
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Conta</DialogTitle>
          <DialogDescription>Altere os dados e salve as mudanças.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="type">Tipo</Label>
            <Select onValueChange={handleTipoChange} value={form.type}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Tipo da Conta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Corrente">Corrente</SelectItem>
                <SelectItem value="Poupança">Poupança</SelectItem>
                <SelectItem value="Carteira">Carteira</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="balance">Saldo</Label>
            <Input
              id="balance"
              name="balance"
              type="number"
              value={form.balance}
              onChange={handleChange}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
