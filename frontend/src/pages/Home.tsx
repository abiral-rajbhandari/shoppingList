import { Navigate } from "react-router-dom";
import ListItem from "../components/ListItem";
import Navbar from "../components/Navbar";
function Home() {
  // Protected Routes, only authenticated user can access.
  const isAuthenticated = localStorage.getItem("token");

  return (
    <>
      {isAuthenticated ? (
        <>
          <Navbar />
          <div className="container mx-auto">
            <ListItem />
          </div>
        </>
      ) : (
        <Navigate to="/signin" />
      )}
    </>
  );
}

export default Home;
