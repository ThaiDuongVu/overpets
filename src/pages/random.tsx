import NavBar from "@/components/navbar";
import { useEffect, useState } from "react";
import RootLayout from "@/components/layout";
import Toast from "@/components/toast";
import { randomInt, showToast } from "@/helper";
import { Pet } from "@/pet";
import PetCard from "@/components/pet-card";

const Random = () => {
  let bootstrap: NodeJS.Require;
  useEffect(() => {
    /* eslint-disable */
    bootstrap = require("bootstrap/dist/js/bootstrap.bundle.js");
  });

  const [pets, setPets] = useState([]);
  const [pet, setPet] = useState<Pet>();
  const [petIndex, setPetIndex] = useState(0);

  // Fetch pet data
  useEffect(() => {
    fetch("./data.json")
      .then(response => response.json())
      .then(data => {
        setPets(data);
        setPet(pets[randomInt(0, data.length)]);
      });
  }, []);

  const shuffle = () => {
    setPetIndex(randomInt(0, pets.length));
    setPet(pets[petIndex]);
  };

  const addToFavorites = (pet: Pet) => {
    let favorites = JSON.parse(localStorage.getItem("favorites") ?? "[]");
    localStorage.setItem("favorites", JSON.stringify([...favorites, pet.id]));
    showToast(bootstrap, "addToast");
  };

  return (
    <RootLayout>
      <NavBar activePage="random" />
      <br />
      <div className="container root-content">
        {/* Header */}
        <div className="row">
          <h4 className="text-center">Random Overwatch pet</h4>
        </div>

        {/* Main card */}
        <div className="row">
          <div className="col">
            {PetCard({ pet, addToFavorites })}
          </div>
        </div>
        <br />

        {/* Shuffle button */}
        <div className="row">
          <div className="col text-center">
            <button type="button" className="btn btn-success" onClick={() => { shuffle(); }}>Shuffle <i className="bi bi-shuffle"></i></button>
          </div>
        </div>

        <Toast id="addToast" header="Added" message="Added to favorites!" />
      </div>
    </RootLayout>
  )
};

export default Random;