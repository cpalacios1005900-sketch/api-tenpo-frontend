// models/Transaction.ts
export interface Transaction {
idTransaccion?: number;
numeroTransaccion: number;
montoPesos: number;
giroComercio: string;
nombreTenpista: string;
fechaTransaccion: string;
error?: string;
}