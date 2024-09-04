import supabase from "../config/supabaseClient";

const Home = ({ user }) => {
  console.log("hi");
  const signInAnonymously = async () => {
    const { data, error } = await supabase.auth.signInAnonymously();
    console.log(error);
  };
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
  };
  console.log(user);

  return (
    <div className="Home-main">
      <h1 className="Home-header">Capstone 2</h1>
      <p className="Home-p">Hey {user.first_name} Hope your tummy is ok!</p>
      <button onClick={() => signInAnonymously()}>Sign In Anon</button>
    </div>
  );
};

export default Home;
