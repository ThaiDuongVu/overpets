import { Pet } from "@/pet";
import PetCard from "@/components/pet-card";
import Spinner from "./spinner";
import { AddToFavoritesFunction } from "@/components/pet-card";

const PetsGrid = ({ petRows, addToFavorites }: { petRows: Array<Array<Pet | undefined>>, addToFavorites: AddToFavoritesFunction }) => {
  if (petRows.length === 0) return <Spinner />

  return (
    petRows.map((row, index) => {
      return (
        <div className="card-group" key={index}>
          {row.map(pet => PetCard({ pet, addToFavorites }))}
        </div>
      )
    })
  );
}

export default PetsGrid;