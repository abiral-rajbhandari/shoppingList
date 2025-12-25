import { Settings } from "lucide-react";
import UserProfile from "./UserProfile";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuStatus, setMenuStatus] = useState(false);
  return (
   <>
    <nav className="sticky top-0 z-20 bg-blue-600 text-white">
      {/* container: set max-width then mx-auto to center div horizontally. */}
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold ">
          Shopping List
        </Link>
        <button className="cursor-pointer" >
          <Settings onClick={() => setMenuStatus(!menuStatus)} />
        </button>
      </div>
    </nav>
    {/* Not conditional -> always render, just hide and slide back */}
    <UserProfile menuStatus={menuStatus} setMenuStatus={setMenuStatus} /> 
    </>
  );
}

export default Navbar;