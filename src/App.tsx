import { TransactionsPage } from "./pages/TransactionsPage";

function App() {
  return (
    <>
      {/* Header simple */}
      <nav className="navbar navbar-light bg-light shadow-sm">
  <div className="container">
    <div className="navbar-brand d-flex align-items-center gap-2">
      <img
        src="/Tenpo.webp"
        alt="Logo"
        height={60}
        className="d-inline-block align-text-top"
      />
      <span className="h6 mb-0 fw-semibold">
        Gestión de Transacciones
      </span>
    </div>
  </div>
</nav>

      {/* Contenido principal */}
      <main>
        <TransactionsPage />
      </main>
    </>
  );
}

export default App;

