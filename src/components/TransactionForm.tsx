import { useEffect, useState } from "react";
import { Transaction } from "../models/Transaction";

interface SubmitResult {
  status: number;
  data: any;
}
interface Props {
  initialData?: Transaction | null;
  onSubmit: (tx: Transaction) => Promise<SubmitResult>;
}
type Touched = {
  numeroTransaccion?: boolean;
  nombreTenpista?: boolean;
  montoPesos?: boolean;
  giroComercio?: boolean;
  fechaTransaccion?: boolean;
};


const formatCLP = (value?: number) =>
  typeof value === "number"
    ? new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0,
      }).format(value)
    : "";

const parseCLP = (value: string) =>
  Number(value.replace(/[^0-9]/g, "")) || undefined;

export function TransactionForm({ initialData, onSubmit }: Props) {
  const [form, setForm] = useState<Transaction>(
    initialData ?? {
      numeroTransaccion: undefined as unknown as number,
      montoPesos: undefined as unknown as number,
      giroComercio: "",
      nombreTenpista: "",
      fechaTransaccion: "",
    }
  );

  const [touched, setTouched] = useState<Touched>({});
  const [isValid, setIsValid] = useState(false);
  const [alert, setAlert] = useState<{
  show: boolean;
  type: "success" | "danger";
  message: string;
}>({
  show: false,
  type: "success",
  message: "",
});

const EMPTY_FORM: Transaction = {
  numeroTransaccion: undefined as unknown as number,
  montoPesos: undefined as unknown as number,
  giroComercio: "",
  nombreTenpista: "",
  fechaTransaccion: "",
};


  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]:
        name === "montoPesos"
          ? parseCLP(value)
          : name === "numeroTransaccion"
          ? value === "" ? undefined : Number(value)
          : value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  const validators = {
    numeroTransaccion:
      typeof form.numeroTransaccion === "number" && form.numeroTransaccion > 0,
    nombreTenpista: form.nombreTenpista.trim() !== "",
    montoPesos:
      typeof form.montoPesos === "number" && form.montoPesos > 0,
    giroComercio: form.giroComercio.trim() !== "",
    fechaTransaccion:
      form.fechaTransaccion !== "" &&
      new Date(form.fechaTransaccion) <= new Date(),
  };

  useEffect(() => {
    setIsValid(Object.values(validators).every(Boolean));
  }, [form]);

  const inputClass = (field: keyof typeof validators) => {
    if (!touched[field]) return "form-control form-control-sm py-1";
    return `form-control form-control-sm py-1 ${
      validators[field] ? "is-valid" : "is-invalid"
    }`;
  };

const handleSubmit = async () => {
  if (!isValid) return;

  const result = await onSubmit(form);
  console.log(result)

  if (result?.status === 201 || result?.status === 200) {
    setAlert({
      show: true,
      type: "success",
      message: "✅ Transacción creada correctamente",
    });

    setForm(EMPTY_FORM);
  setTouched({});
  
  } else {
    let message = "❌ Error al crear la transacción";
    let messageApi = result?.data?.error;
    switch (result?.status) {
      case 400:
        message = "❌ "+messageApi;
        break;
      case 429:
        message = "❌ Ha excedido el máximo de solicitudes por minuto";
        break;  
      case 409:
        message = "⚠️ La transacción ya existe";
        break;
      case 500:
        message = "🔥 Error interno del servidor";
        break;
        
    }

    setAlert({
      show: true,
      type: "danger",
      message,
    });
  }

  setTimeout(() => {
    setAlert(prev => ({ ...prev, show: false }));
  }, 5000);
};


  return (
    <div className="card shadow-sm border-0 mb-3">
      <div className="card-body py-3 px-3">
        <div className="text-center mb-2">
          <h6 className="fw-semibold mb-0">Registro de Transacción</h6>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-8">

            <div className="row g-2">
              <div className="col-6">
                <label className="form-label small mb-1">Id transacción</label>
                <input
                  type="number"
                  name="numeroTransaccion"
                  value={form.numeroTransaccion ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass("numeroTransaccion")}
                />
                <div className="invalid-feedback">
                  El Id de transacción debe ser mayor a 0
                </div>
              </div>

              <div className="col-6">
                <label className="form-label small mb-1">Nombre Tenpista</label>
                <input
                  name="nombreTenpista"
                  value={form.nombreTenpista}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass("nombreTenpista")}
                />
                <div className="invalid-feedback">
                  El nombre es obligatorio
                </div>
              </div>
            </div>

            <div className="row g-2 mt-1">
              <div className="col-6">
                <label className="form-label small mb-1">Monto (Pesos)</label>
                <input
                  type="text"
                  name="montoPesos"
                  value={formatCLP(form.montoPesos)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass("montoPesos")}
                />
                <div className="invalid-feedback">
                  El monto debe ser mayor a 0
                </div>
              </div>

              <div className="col-6">
                <label className="form-label small mb-1">Giro / Comercio</label>
                <input
                  name="giroComercio"
                  value={form.giroComercio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass("giroComercio")}
                />
                <div className="invalid-feedback">
                  El giro es obligatorio
                </div>
              </div>
            </div>

            <div className="row g-2 mt-1">
              <div className="col-6">
                <label className="form-label small mb-1">
                  Fecha transacción
                </label>
                <input
                  type="datetime-local"
                  name="fechaTransaccion"
                  value={form.fechaTransaccion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass("fechaTransaccion")}
                />
                <div className="invalid-feedback">
                  La fecha no puede ser futura
                </div>
              </div>
            </div>

            <div className="text-center mt-3">
              <button
                className="btn btn-primary btn-sm px-4"
                disabled={!isValid}
                onClick={handleSubmit}
              >
                Guardar
              </button>
            </div>

            {alert.show && (
  <div
    className={`alert alert-${alert.type} shadow`}
    style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      minWidth: "300px",
      zIndex: 1050,
    }}
    role="alert"
  >
    {alert.message}
  </div>
)}

          </div>
        </div>
      </div>
    </div>
  );
}
