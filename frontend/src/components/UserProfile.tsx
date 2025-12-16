// Todo: Fix UI and Implement Functionality!
import {
  CircleUserRound,
  PanelRightClose,
  Mail,
  LockKeyhole,
  LogOut,
} from "lucide-react";

interface PropsType {
  setMenuStatus: React.Dispatch<React.SetStateAction<boolean>>;
  menuStatus: boolean;
}

function UserProfile({ setMenuStatus, menuStatus }: PropsType) {
  return (
    <>

      {/* Menu Container: Slide-in Menu */}
      {/* This component will stay in right: -100% will only slide in right: 0% if menuStatus is true */}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 
                    transform transition-transform duration-300 ease-in-out ${
                      menuStatus ? "translate-x-0" : "translate-x-full"
                    }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300 ">
          <h2 id="profile-heading" className="text-xl font-semibold">
            User Profile
          </h2>
          <button
            onClick={() => setMenuStatus(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <PanelRightClose className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* User Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <CircleUserRound className="w-10 h-10 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">
                Abiral Man Rajbhandari
              </h3>
              <p className="text-sm text-gray-500 truncate">
                abiralrajbhandari75@gmail.com
              </p>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-gray-100 transition-colors">
              <Mail className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Edit Profile</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-gray-100 transition-colors">
              <LockKeyhole className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Reset Password</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-red-50 transition-colors text-red-600 mt-4">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign out</span>
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
