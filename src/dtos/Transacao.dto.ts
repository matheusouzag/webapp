export interface TransacaoDTO {
  id: number;
  type: "credito" | "debito" | "transferencia";
  value: number;
  description?: string;
  date: string;
  accountOrigin?: { name: string };
  accountDestination?: { name: string };
  accountOriginName?: string;
  accountDestinationName?: string;
}