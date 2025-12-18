// import InputForm from "../components/InputForm";
import { Toaster } from "react-hot-toast";
import ListItem from "../components/ListItem";
import Navbar from "../components/Navbar";
function Home() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          className: "bg-[#333] text-[#fff]",
        }}
      />
      <Navbar />
      <div className="container mx-auto">
        <ListItem />
      </div>
    </>
  );
}

export default Home;
