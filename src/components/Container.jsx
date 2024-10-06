import "../styles/Container.css";

const Container = ({ width, height, children }) => {
  return (
    <div style={{ width: width, height: height }} className="Container">
      {children}
      <div className="shadow"></div>
    </div>
  );
};

export default Container;
