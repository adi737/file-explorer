import { Outlet } from "react-router-dom";
import { CreateFileModal, Navigation } from "./components";
import { FilesProvider } from "./context/FilesContext";
import { createPortal } from "react-dom";

function App() {
  const modalContainer = document.getElementById("modal");
  return (
    <FilesProvider>
      <main>
        <Navigation />
        <Outlet />
      </main>
      {modalContainer && createPortal(<CreateFileModal />, modalContainer)}
    </FilesProvider>
  );
}

export default App;
