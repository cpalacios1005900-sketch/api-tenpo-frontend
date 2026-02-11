// hooks/useTransactions.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/transacciones.api";


export function useTransactions() {
    const queryClient = useQueryClient();


    const query = useQuery({
        queryKey: ["transactions"],
        queryFn: api.getAll,
        staleTime: 1000 * 60, // cache 1 min
    });


    const create = useMutation({
        mutationFn: api.createTx,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactions"] }),
    });


    const update = useMutation({
        mutationFn: api.updateTx,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactions"] }),
    });


    const remove = useMutation({
        mutationFn: api.deleteTx,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactions"] }),
    });


    return { query, create, update, remove };
}