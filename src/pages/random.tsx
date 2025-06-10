import NavBar from "@/components/navbar";
import { useEffect, useState } from "react";
import RootLayout from "@/components/layout";
import Toast from "@/components/toast";
import { randomInt, showToast } from "@/helper";
import { Pet } from "@/pet";
import Spinner from "@/components/spinner";

const Random = () => {
  let bootstrap: NodeJS.Require;
  useEffect(() => {
    /* eslint-disable */
    bootstrap = require("bootstrap/dist/js/bootstrap.bundle.js");
  });

  const [pets, setPets] = useState([]);
  const [petIndex, setPetIndex] = useState(0);

  // Fetch pet data
  useEffect(() => {
    fetch("./data.json")
      .then(response => response.json())
      .then(data => {
        setPets(data);
        setPetIndex(randomInt(0, data.length));
      });
  }, []);

  const shuffle = () => {
    setPetIndex(randomInt(0, pets.length));
  };

  const addToFavorites = (pet: Pet) => {
    showToast(bootstrap, "addToast");
  };

  const petCard = (pet: Pet) => {
    if (!pet) return (
      <Spinner />
    );

    return (
      <div className="card" key={pet.id}>
        <img src={pet.img} className="card-img-top border-bottom bg-info-subtle" alt="Pet" />
        <div className="card-body">
          <h5 className="card-title text-capitalize">{pet.type}</h5>
          <p className="card-text text-capitalize">{pet.hero}</p>
          <a
            type="button"
            className="btn btn-primary pe-4 ps-4 me-2"
            href={pet.img} download={true} target="_blank"
            title="Download">
            <i className="bi bi-download"></i>
          </a>
          <a
            type="button"
            className="btn btn-danger pe-4 ps-4"
            onClick={() => { addToFavorites(pet) }}>
            <i className="bi bi-heart-fill"></i>
          </a>
        </div>
      </div>
    );
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
            {petCard(pets[petIndex])}
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