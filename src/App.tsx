import React from "react";
import "./App.css";
import BreedsList from "./components/Breeds";

const Breeds = () => {
  return (
    <div className="App">
      <h1>Catalog page for breeds of dogs</h1>
      <BreedsList />
    </div>
  );
};

export default Breeds;
