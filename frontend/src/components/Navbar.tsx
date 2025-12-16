import { UserRoundCog } from "lucide-react";
import UserProfile from "./UserProfile";
import { useState } from "react";

function Navbar() {
  const [menuStatus, setMenuStatus] = useState(false);
  return (
   <>
    <nav className="sticky top-0 z-20 bg-blue-600 text-white">
      {/* container: set max-width then mx-auto to center div horizontally. */}
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold ">
          Shopping List
        </a>
        <button className="cursor-pointer" >
          <UserRoundCog onClick={() => setMenuStatus(!menuStatus)} />
        </button>
      </div>
    </nav>
    {/* Remove the conditional - always render */}
    <UserProfile menuStatus={menuStatus} setMenuStatus={setMenuStatus} /> 
    </>
  );
}

export default Navbar;