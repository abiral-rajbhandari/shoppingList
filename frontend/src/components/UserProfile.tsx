import { Home, Lock, LogOut, User, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
interface PropsType {
  menuStatus: boolean;
  setMenuStatus: (value: boolean) => void;
}

function UserProfile({ menuStatus, setMenuStatus }: PropsType) {
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem("token");
    toast.success("Signed out successfully.")
    navigate("/signin");
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
        duration: 3000,
        className: "bg-[#333] text-[#fff]",
        }}
      />
      {/* Menu Overlay */}
      <div
        onClick={() => setMenuStatus(false)}
        className={`bg-black/40 fixed inset-0 z-30 ${
          menuStatus
            ? "opacity-100 pointer-events-auto "
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Menu Container */}
        <div
          onClick={(event) => event.stopPropagation()}
          className={`fixed top-0 right-0 w-84 bg-white z-40 h-full transform transition-transform duration-300 ease-in-out ${
            menuStatus ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Menu Header */}
          <div className="flex justify-start items-center h-20  gap-4 px-6 bg-blue-600 text-white">
            <X
              onClick={() => setMenuStatus(false)}
              className="hover:bg-blue-700 cursor-pointer "
            />
            <h2 className="text-2xl ">Settings</h2>
          </div>
          {/* Profile Image & Name, Email */}
          <div className="p-6 ">
            <div className="flex gap-4 justify-center items-center border-b border-gray-300 pb-6">
              <div className="bg-blue-600 w-14 h-14 flex justify-center items-center rounded-full">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 text-lg truncate">
                  Abiral Man Rajbhandari
                </h3>
                <p className="text-gray-500 text-sm truncate">
                  abiralrajbhandari75@gmail.com
                </p>
              </div>
            </div>
          </div>
          {/* Menu Body */}
          <nav className="space-y-2">
            <div
              onClick={() => {
                setMenuStatus(false);
                window.location.reload();
              }}
              className="flex items-center gap-3 w-full px-6 py-3 hover:bg-gray-100 cursor-pointer"
            >
              <span className="bg-gray-200 p-2 rounded-full">
                <Home className="text-gray-500 w-5 h-5" />
              </span>
              Home
            </div>
            <Link
              to="reset-password"
              className="flex items-center gap-3 w-full px-6 py-3 hover:bg-gray-100 cursor-pointer"
            >
              <span className="bg-gray-200 p-2 rounded-full">
                <Lock className="text-gray-500 w-5 h-5" />
              </span>
              Reset Password
            </Link>
            <div
              onClick={handleSignout}
              className="flex items-center gap-3 w-full px-6 py-3 hover:bg-gray-100 cursor-pointer"
            >
              <span className="bg-gray-200 p-2 rounded-full">
                <LogOut className="h-5 w-5 text-gray-500" />
              </span>
              Sign out
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
