import { Pet } from "@/pet";
import Spinner from "./spinner";

export type AddToFavoritesFunction = (pet: Pet) => void;

const PetCard = ({ pet, addToFavorites }: { pet: Pet | undefined, addToFavorites: AddToFavoritesFunction }) => {
  if (!pet) return (
    <Spinner />
  );

  return (
    <div className="card mb-2" key={pet.id}>
      {/* eslint-disable */}
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

export default PetCard;