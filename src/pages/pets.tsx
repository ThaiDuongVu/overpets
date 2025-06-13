import NavBar from "@/components/navbar";
import { useEffect, useState } from "react";
import RootLayout from "@/components/layout";
import Toast from "@/components/toast";
import { showToast } from "@/helper";
import Image from "next/image";
import { Pet } from "@/pet";
import { Hero } from "@/hero";
import PetsGrid from "@/components/pet-grid";

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

  // Data
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [slicedPets, setSlicedPets] = useState([]);

  // Pagination
  const petPerPage = 16;
  const [currentPage, setCurrentPage] = useState(0);
  const rowSize = 4;
  const [petRows, setPetRows] = useState([[]]);

  // Filters
  const [petTypeFilter, setPetTypeFilter] = useState("all");
  const [heroFilter, setHeroFilter] = useState("all");

  // Fetch & proccess pet data
  useEffect(() => {
    fetch("./data.json")
      .then(response => response.json())
      .then(data => {
        setPets(data);

        setFilteredPets(pets);
        // Filter pet type
        if (petTypeFilter != "all")
          setFilteredPets(filteredPets.filter((pet: Pet) => pet.type.includes(petTypeFilter)));

        // Filter hero
        if (heroFilter != "all")
          setFilteredPets(filteredPets.filter((pet: Pet) => pet.hero.includes(heroFilter)));

        // Split filtered data into rows
        let rows = []
        const start = currentPage * petPerPage;
        const end = start + petPerPage;
        setSlicedPets(filteredPets.slice(start, end));
        for (let i = 0; i < slicedPets.length; i += rowSize) {
          rows.push(slicedPets.slice(i, i + rowSize));
        };
        setPetRows(rows);
      })
      .catch(error => { console.error("Error fetching pet data:", error); });
  }, [pets, petRows]);

  const addToFavorites = (pet: Pet) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") ?? "[]");
    localStorage.setItem("favorites", JSON.stringify([...favorites, pet.id]));
    showToast(bootstrap, "addToast");
  };

  const paginationDisplay = () => {
    const firstPage = 0;
    const lastPage = 13;
    const pages = [];
    for (let i = 0; i < lastPage; i++) pages.push(i);

    return (
      <nav aria-label="Pagination navigation">
        <ul className="pagination justify-content-center">
          {/* First page */}
          <li className="page-item">
            <button type="button" className="page-link" onClick={() => setCurrentPage(currentPage > firstPage ? currentPage - 1 : currentPage)}>Previous</button>
          </li>
          <li className="page-item">
            <button type="button" className="page-link" aria-label={firstPage.toString()} onClick={() => setCurrentPage(firstPage)}><span aria-hidden="true">&laquo;</span>
            </button>
          </li>

          {/* Numbered pages */}
          {
            pages.map((page) => {
              return (
                <li className={`page-item ${currentPage === page ? "active" : ""}`} key={page}>
                  <button type="button" className="page-link" onClick={() => setCurrentPage(page)} >{`${page + 1}`}</button>
                </li>
              )
            })
          }

          {/* Last page */}
          <li className="page-item">
            <button type="button" className="page-link" aria-label={lastPage.toString()} onClick={() => setCurrentPage(lastPage - 1)}><span aria-hidden="true">&raquo;</span>
            </button>
          </li>
          <li className="page-item">
            <button type="button" className="page-link" onClick={() => setCurrentPage(currentPage < lastPage - 1 ? currentPage + 1 : currentPage)} >Next</button>
          </li>
        </ul>
      </nav>
    )
  };

  const [heroes, setHeroes] = useState([]);
  useEffect(() => {
    fetch("./heroes.json")
      .then(response => response.json())
      .then(data => {
        setHeroes(data);
      })
      .catch(error => { console.error("Error fetching hero data:", error); });
  }, [heroes]);

  return (
    <RootLayout>
      <NavBar activePage="pets" />
      <br />
      <div className="container">
        {/* Header */}
        <div className="row">
          <h4 className="text-center">Pets</h4>
        </div>

        <div className="row">
          {/* Filters */}
          <div className="col text-center">
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Pet Type <i className="bi bi-emoji-smile-fill"></i>
              </button>
              <ul className="dropdown-menu">
                <li><button type="button" className="dropdown-item" onClick={() => { setPetTypeFilter("all") }}>All <i className="bi bi-eye-fill"></i></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setPetTypeFilter("cat") }}>Cat</button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setPetTypeFilter("chicken") }}>Chicken</button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setPetTypeFilter("dog") }}>Dog</button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setPetTypeFilter("ferret") }}>Ferret</button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setPetTypeFilter("guinea pig") }}>Guinea Pig</button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setPetTypeFilter("hamster") }}>Hamster</button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setPetTypeFilter("hedgehog") }}>Hedgehog</button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setPetTypeFilter("horse") }}>Horse</button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setPetTypeFilter("lizzard") }}>Lizzard</button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setPetTypeFilter("rabbit") }}>Rabbit</button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setPetTypeFilter("raccoon") }}>Raccoon</button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setPetTypeFilter("parrot") }}>Parrot</button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setPetTypeFilter("turtle") }}>Turtle</button></li>
              </ul>
            </div>
          </div>
          <div className="col text-center">
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Hero <i className="bi bi-person-fill"></i>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button type="button" className="dropdown-item" onClick={() => { setHeroFilter("all") }}>All <i className="bi bi-eye-fill"></i></button>
                </li>
                {
                  heroes.map((hero: Hero) => {
                    return (
                      <li key={hero.name.toLowerCase()}>
                        <button type="button" className="dropdown-item" onClick={() => { setHeroFilter(hero.name.toLowerCase()) }}>{hero.name} <Image src={hero.img} width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
        <br />

        {/* Pet grid */}
        {PetsGrid({ petRows, addToFavorites })}
        <br />

        {/* Pagination */}
        {paginationDisplay()}

      </div>
      <Toast id="addToast" header="Added" message="Added to favorites!" />
    </RootLayout>
  )
};

export default Pets;