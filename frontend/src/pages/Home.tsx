import ListItem from "../components/ListItem";
import Navbar from "../components/Navbar";
function Home() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <ListItem />
      </div>
    </>
  );
}

export default Home;
