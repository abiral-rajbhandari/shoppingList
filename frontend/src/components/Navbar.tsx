import { UserRoundCog } from "lucide-react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-blue-600 text-white shadow-md ">
      {/* max-width set and margin-x: auto to center content*/}
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold ">
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
