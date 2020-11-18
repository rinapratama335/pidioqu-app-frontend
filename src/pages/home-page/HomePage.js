import { useContext } from "react";
import Navbar from "../../components/navbar/Navbar";
import { UserContext } from "../../context/userContext";

const HomePage = () => {
  const [state] = useContext(UserContext);

  return (
    <>
      <Navbar />
    </>
  );
};

export default HomePage;
