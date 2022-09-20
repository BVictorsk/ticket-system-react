import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/user"
import Routes from "./routes"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter >
      <ToastContainer autoClose={3000} />
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
