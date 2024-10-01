import { useUserSession } from "../hooks";
import Routes from "./Routes";
import useStore from "../store";
import "../styles/App.css";

function App() {
  const { error } = useUserSession();
  const { loading } = useStore();

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
