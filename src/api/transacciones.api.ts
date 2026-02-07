// api/transacciones.api.ts

import { Transaction } from "../models/Transaction";
import { api } from "./axios";
import { AxiosResponse } from "axios";

api.interceptors.request.use(config => {
  if (config.method?.toLowerCase() !== "get") {
    config.headers["X-Client-Id"] = "frontend-react-app";
  }

  return config;
});



export const getAll = async () => {
const { data } = await api.get("/all");
return data;
};


export const createTx = async (tx: Transaction) => {
  const response: AxiosResponse = await api.post("/create", tx, {
    validateStatus: () => true, 
  });

  return {
    status: response.status,
    data: response.data,
  };
};

export const updateTx = async (tx: Transaction) => {
  const response: AxiosResponse = await api.put("/update", tx, {
    validateStatus: () => true, 
  });

  return {
    status: response.status,
    data: response.data,
  };
};


export const deleteTx = async (id: number) => {
  const response: AxiosResponse = await api.delete(
    `/delete?idTransaccion=${id}`,
    {
      validateStatus: () => true,
    }
  );

  return {
    status: response.status,
    data: response.data,
  };
};