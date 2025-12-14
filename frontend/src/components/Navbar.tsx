import { UserRoundCog } from "lucide-react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50  shadow-md ">
      {/* max-width set and margin-x: auto to center content*/}
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        <a href="/" className="text-xl font-bold hover:text-gray-700">
          Shopping List
        </a>
        <button>
          <UserRoundCog />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
