import React from "react";

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const printer = () => {
    console.log("first");
  };
  return (
    <div>
      <h1>home</h1>
      <button onClick={() => console.log("first")}>test</button>
    </div>
  );
};
export default Home;