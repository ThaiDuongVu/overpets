import Image from "next/image";

const Header = () => {
  return (
    <div className="bg-body-tertiary">
      <br />
      <p className="fs-1 fw-bold text-center">
        OverPets
        <Image src="/icon.png" width={100} height={100} unoptimized={true} alt="icon" className="img-fluid rounded header-icon" />
      </p>
      <p className="fs-5 text-center">A collection of pets as Overwatch heroes</p>
      <hr />
    </div>
  );
};

export default Header;