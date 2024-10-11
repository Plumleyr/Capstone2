import { useUserSession } from "../hooks";
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
