import { Outlet } from "react-router-dom";
import { Navigation } from "./components";
import { FilesProvider } from "./context/FilesContext";

function App() {
  return (
    <FilesProvider>
      <main>
        <Navigation />
        <Outlet />
      </main>
    </FilesProvider>
  );
}

export default App;
