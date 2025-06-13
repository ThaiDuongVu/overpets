import NavBar from "@/components/navbar";
import { useEffect, useState } from "react";
import RootLayout from "@/components/layout";
import Spinner from "@/components/spinner";
import Toast from "@/components/toast";
import { showToast } from "@/helper";
import Image from "next/image";
import { Pet } from "@/pet";

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
      });
  }, [pets, petRows]);

  const addToFavorites = (pet: Pet) => {
    showToast(bootstrap, "addToast");
  };

  const petCard = (pet: Pet) => {
    if (!pet) return (
      <Spinner />
    );

    return (
      <div className="card mb-2" key={pet.id}>
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

  const getPetsAsGrid = () => {
    if (pets.length === 0) return <Spinner />

    return (
      petRows.map((row, index) => {
        return (
          <div className="card-group" key={index}>
            {row.map(pet => petCard(pet))}
          </div>
        )
      })
    );
  };

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
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("all") }}>All <i className="bi bi-eye-fill"></i></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("ana") }}>Ana <Image src="/heroes/ana.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("ashe") }}>Ashe <Image src="/heroes/ashe.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("baptiste") }}>Baptiste <Image src="/heroes/baptiste.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("bastion") }}>Bastion <Image src="/heroes/bastion.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("brigitte") }}>Brigitte <Image src="/heroes/brigitte.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("cassidy") }}>Cassidy <Image src="/heroes/cassidy.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("doomfist") }}>Doomfist <Image src="/heroes/doomfist.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("dva") }}>Dva <Image src="/heroes/dva.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("echo") }}>Echo <Image src="/heroes/echo.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("freja") }}>Freja <Image src="/heroes/freja.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("genji") }}>Genji <Image src="/heroes/genji.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("hanzo") }}>Hanzo <Image src="/heroes/hanzo.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("hazard") }}>Hazard <Image src="/heroes/hazard.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("illari") }}>Illari <Image src="/heroes/illari.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("junker queen") }}>Junker Queen <Image src="/heroes/junker queen.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("junkrat") }}>Junkrat <Image src="/heroes/junkrat.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("juno") }}>Juno <Image src="/heroes/juno.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("kiriko") }}>Kiriko <Image src="/heroes/kiriko.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("lifeweaver") }}>Lifeweaver <Image src="/heroes/lifeweaver.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("lucio") }}>Lucio <Image src="/heroes/lucio.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("mauga") }}>Mauga <Image src="/heroes/mauga.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("mei") }}>Mei <Image src="/heroes/mei.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("mercy") }}>Mercy <Image src="/heroes/mercy.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("moira") }}>Moira <Image src="/heroes/moira.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("orisa") }}>Orisa <Image src="/heroes/orisa.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("pharah") }}>Pharah <Image src="/heroes/pharah.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("ramattra") }}>Ramattra <Image src="/heroes/ramattra.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("reaper") }}>Reaper <Image src="/heroes/reaper.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("reinhardt") }}>Reinhardt <Image src="/heroes/reinhardt.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("roadhog") }}>Roadhog <Image src="/heroes/roadhog.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("sigma") }}>Sigma <Image src="/heroes/sigma.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("sojourn") }}>Sojourn <Image src="/heroes/sojourn.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("soldier 76") }}>Soldier 76 <Image src="/heroes/soldier 76.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("sombra") }}>Sombra <Image src="/heroes/sombra.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("symmetra") }}>Symmetra <Image src="/heroes/symmetra.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("torbjorn") }}>Torbjorn <Image src="/heroes/torbjorn.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("tracer") }}>Tracer <Image src="/heroes/tracer.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("venture") }}>Venture <Image src="/heroes/venture.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("widowmaker") }}>Widowmaker <Image src="/heroes/widowmaker.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("winston") }}>Winston <Image src="/heroes/winston.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("wrecking ball") }}>Wrecking Ball <Image src="/heroes/wrecking ball.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("zarya") }}>Zarya <Image src="/heroes/zarya.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setHeroFilter("zenyatta") }}>Zenyatta <Image src="/heroes/zenyatta.png" width={20} height={20} unoptimized={true} alt="icon" className="img-fluid rounded ms-2" /></button></li>
              </ul>
            </div>
          </div>
        </div>
        <br />

        {/* Pet Display */}
        {getPetsAsGrid()}
        <br />

        {/* Pagination */}
        {paginationDisplay()}

      </div>
      <Toast id="addToast" header="Added" message="Added to favorites!" />
    </RootLayout>
  )
};

export default Pets;