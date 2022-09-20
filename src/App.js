import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/user"
import Routes from "./routes"

function App() {

  return (
    <AuthProvider>
      <BrowserRouter >
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
