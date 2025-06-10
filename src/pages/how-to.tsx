import NavBar from "@/components/navbar";
import RootLayout from "@/components/layout";

const HowTo = () => {
  // let bootstrap: NodeJS.Require;
  // useEffect(() => {
  //   /* eslint-disable */
  //   bootstrap = require("bootstrap/dist/js/bootstrap.bundle.js");
  // });

  return (
    <RootLayout>
      <NavBar activePage="how-to" />
      <br />
      <div className="container">
        {/* Header */}
        <div className="row">
          <h4 className="text-center">Coming Soon!</h4>
        </div>
      </div>
    </RootLayout>
  )
};

export default HowTo;