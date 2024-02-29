import "./App.css";
import UserModule from "./pages/user-module";
import { UserContextProvider } from "./context/userContext";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <UserModule></UserModule>
      </UserContextProvider>
    </div>
  );
}

export default App;
