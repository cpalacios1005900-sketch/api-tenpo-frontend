import { useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import { TransactionForm } from "../components/TransactionForm";
import { TransactionTable } from "../components/TransactionTable";
import { Transaction } from "../models/Transaction";

// pages/TransactionsPage.tsx

export interface SubmitResult {
  status: number;
  data: any;
}
export function TransactionsPage() {
    const { query, create, update, remove } = useTransactions();
    const [selected, setSelected] = useState(null);
    


const handleSave = async (tx: Transaction): Promise<SubmitResult> => {
  let result: SubmitResult;

  if (tx.idTransaccion) {
    result = await update.mutateAsync(tx);
  } else {
    result = await create.mutateAsync(tx);
  }

  setSelected(null);
  return result;
};

const handleDelete = async (id: number): Promise<SubmitResult> => {
  let result: SubmitResult;
  
  result = await remove.mutateAsync(id);
  

  setSelected(null);
  return result;
};




    



  return (
    <div className="container mt-4">
      <TransactionForm initialData={selected} onSubmit={handleSave} />

      <TransactionTable
        data={query.data ?? []}
        onEdit={setSelected}
        onDelete={(id: number) => handleDelete(id)}
      />
      
    </div>
  );

}