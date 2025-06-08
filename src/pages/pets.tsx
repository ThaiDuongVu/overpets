import NavBar from "@/components/navbar";
import { useEffect, useState } from "react";
import RootLayout from "@/components/layout";
import Spinner from "@/components/spinner";
import Toast from "@/components/toast";
import { showToast } from "@/helper";

interface Pet {
  img: string,
  type: string,
  hero: string,
  id: string
}

const Pets = () => {
  let bootstrap: NodeJS.Require;
  useEffect(() => {
    /* eslint-disable */
    bootstrap = require("bootstrap/dist/js/bootstrap.bundle.js");
  });

  // Whether running on a mobile device
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);
  }, []);

  const [pets, setPets] = useState([]);
  const rowSize = 4;
  const [petRows, setPetRows] = useState([[]]);
  useEffect(() => {
    fetch("./data.json")
      .then(response => response.json())
      .then(data => {
        setPets(data);
        // Split into rows of 4
        let rows = []
        for (let i = 0; i < pets.length; i += rowSize) {
          rows.push(pets.slice(i, i + rowSize));
        };
        setPetRows(rows);
      });
  }, [pets, petRows]);

  const addToFavorites = (pet: Pet) => {
    showToast(bootstrap, "addToast");
  };

  const petCard = (pet: Pet) => {
    if (!pet) return (
      <div></div>
    );

    return (
      <div className="card" key={pet.id}>
        <img src={pet.img} className="card-img-top" alt="Pet" />
        <div className="card-body">
          <h5 className="card-title text-capitalize">{pet.type}</h5>
          <p className="card-text text-capitalize">{pet.hero}</p>
          <a
            type="button"
            className="btn btn-primary pe-4 ps-4 me-2"
            href={pet.img} download={true}
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

  const petPerPage = 16;
  const [currentPage, setCurrentPage] = useState(0);
  const paginationDisplay = () => {
    return (
      <nav aria-label="Pagination navigation">
        <ul className="pagination justify-content-center">
          {/* First page */}
          <li className="page-item">
            <button type="button" className="page-link" onClick={() => setCurrentPage(currentPage > 0 ? currentPage - 1 : currentPage)}>Previous</button>
          </li>
          <li className="page-item">
            <button type="button" className="page-link" aria-label="0" onClick={() => setCurrentPage(0)}><span aria-hidden="true">&laquo;</span>
            </button>
          </li>

          {/* Numbered pages */}
          <li className={`page-item ${currentPage === 0 ? "active" : ""}`}>
            <button type="button" className="page-link" onClick={() => setCurrentPage(0)} >1</button>
          </li>
          
          {/* Last page */}
          <li className="page-item">
            <button type="button" className="page-link" aria-label="13" onClick={() => setCurrentPage(0)}><span aria-hidden="true">&raquo;</span>
            </button>
          </li>
          <li className="page-item">
            <button type="button" className="page-link" onClick={() => setCurrentPage(currentPage < 13 ? currentPage + 1 : currentPage)} >Next</button>
          </li>
        </ul>
      </nav>
    )
  };

  return (
    <RootLayout>
      <NavBar activePage="text-try" />
      <br />
      <div className="container">
        {/* Header */}
        <div className="row">
          <h4 className="text-center">Pets</h4>
        </div>
        <br />

        {/* Pet Display */}
        {
          pets.length == 0
            ?
            <Spinner />
            :
            petRows.map((row, index) => {
              return (
                <div className="card-group" key={index}>
                  {row.map(pet => petCard(pet))}
                </div>

                // <div key={index}>
                //   <div className="row">
                //     <div className="col">{petCard(row[0])}</div>
                //     <div className="col">{petCard(row[1])}</div>
                //     <div className="col">{petCard(row[2])}</div>
                //     <div className="col">{petCard(row[3])}</div>
                //   </div>
                //   <br />
                // </div>
              )
            })
        }
        <br />

        {/* Pagination */}
        {/* {paginationDisplay()} */}

      </div>
      <Toast id="addToast" header="Added" message="Added to favorites!" />
    </RootLayout>
  )
};

export default Pets;