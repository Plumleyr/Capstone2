import { useUserSession } from "../hooks/useUserSession";
import Routes from "./Routes";
import "../styles/App.css";

function App() {
  const { error, loading } = useUserSession();
  return (
    <>
      {loading ? (
        <div className="App-Loading">Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <Routes />
      )}
    </>
  );
}

export default App;
