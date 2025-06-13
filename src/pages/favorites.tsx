import NavBar from "@/components/navbar";
import RootLayout from "@/components/layout";
import { useEffect, useState } from "react";
import { Pet } from "@/pet";
import PetsGrid from "@/components/pet-grid";
import Toast from "@/components/toast";
import { showToast } from "@/helper";

const Favorites = () => {
  let bootstrap: NodeJS.Require;
  useEffect(() => {
    /* eslint-disable */
    bootstrap = require("bootstrap/dist/js/bootstrap.bundle.js");
  });

  // Data
  const [pets, setPets] = useState([]);
  const [favoritePets, setFavoritePets] = useState([]);
  const rowSize = 4;
  const [petRows, setPetRows] = useState([[]]);

  useEffect(() => {
    fetch("./data.json")
      .then(response => response.json())
      .then(data => {
        setPets(data);

        const favorites = JSON.parse(localStorage.getItem("favorites") ?? "[]");
        setFavoritePets(pets.filter((pet: Pet) => favorites.includes(pet.id)));

        // Split filtered data into rows
        let rows = []
        for (let i = 0; i < favoritePets.length; i += rowSize) {
          rows.push(favoritePets.slice(i, i + rowSize));
        };
        setPetRows(rows);
      })
      .catch(error => { console.error("Error fetching pet data:", error); });
  }, [pets]);

  const removeFromFavorites = (pet: Pet) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") ?? "[]");
    localStorage.setItem("favorites", JSON.stringify(favorites.filter((id: string) => id != pet.id)));
    showToast(bootstrap, "removeToast");
  };

  return (
    <RootLayout>
      <NavBar activePage="favorites" />
      <br />
      <div className="container">
        {/* Header */}
        <div className="row">
          <h4 className="text-center">Favorites</h4>
        </div>

        <div className="row">
          <div className="col text-center">
            {/* Pet grid */}
            {PetsGrid({ petRows, addToFavorites: removeFromFavorites })}
          </div>
        </div>
      </div>
      <Toast id="removeToast" header="Removed" message="Removed from favorites" />
    </RootLayout>
  )
};

export default Favorites;