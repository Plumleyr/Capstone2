import { useUserSession } from "../hooks";
import Routes from "./Routes";

function App() {
  const { user, loading, error } = useUserSession();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Routes user={user} />
    </>
  );
}

export default App;
