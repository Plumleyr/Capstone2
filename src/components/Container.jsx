import "../styles/Container.css";

const Container = ({ children }) => {
  return (
    <div className="Container">
      {children}
      <div className="shadow"></div>
    </div>
  );
};

export default Container;
