import { useState } from "react";

interface SubmitResult {
  status: number;
  data: any;
}
interface Props {
  onDelete: (d: number) => Promise<SubmitResult>;
  onEdit: React.Dispatch<React.SetStateAction<null>>;
  data: any;
}

export function TransactionTable({ data, onEdit, onDelete }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [alert, setAlert] = useState<{
    show: boolean;
    type: "success" | "danger";
    message: string;
  }>({
    show: false,
    type: "success",
    message: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.ceil(data.length / pageSize);

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleConfirm = (id: number) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (selectedId != null) {
      const result = await onDelete(selectedId);

      if (result?.status === 200) {
        setAlert({
          show: true,
          type: "success",
          message: "✅ Transacción creada correctamente",
        });
      } else {
        let message = "❌ Error al crear la transacción";
        let messageApi = result?.data?.error;
        switch (result?.status) {
          case 400:
            message = "❌ " + messageApi;
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
    }
    setShowModal(false);
    setSelectedId(null);
  };

  return (
    <>
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-semibold mb-0">📋 Listado de Transacciones</h6>
            <span className="badge bg-secondary">
              {data.length} registros
            </span>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="small text-muted">Id transacción</th>
                  <th className="small text-muted">Monto transacción en pesos</th>
                  <th className="small text-muted">Giro o comercio de transacción</th>
                  <th className="small text-muted">Nombre de Tenpista</th>
                  <th className="small text-muted">Fecha de transacción</th>
                  <th className="small text-muted text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((tx: any) => (
                  <tr key={tx.idTransaccion}>
                    <td className="fw-semibold">{tx.numeroTransaccion}</td>
                    <td className="fw-semibold text-success">
                      {new Intl.NumberFormat("es-CL", {
                        style: "currency",
                        currency: "CLP",
                        maximumFractionDigits: 0,
                      }).format(tx.montoPesos)}
                    </td>
                    <td>{tx.giroComercio}</td>
                    <td>{tx.nombreTenpista}</td>
                    <td>
                      {new Date(tx.fechaTransaccion).toLocaleString("es-CL", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-outline-warning btn-sm me-2"
                        onClick={() => onEdit(tx)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleConfirm(tx.idTransaccion)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-end mt-3 gap-2">
            <button
              className="btn btn-sm btn-outline-secondary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              Anterior
            </button>
            <span className="align-self-center">
              {currentPage} / {totalPages}
            </span>
            <button
              className="btn btn-sm btn-outline-secondary"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h6 className="modal-title">Confirmar eliminación</h6>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  />
                </div>
                <div className="modal-body">
                  <p className="mb-0">
                    ¿Está seguro que desea eliminar esta transacción?
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={handleDelete}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}

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
    </>
  );
}
