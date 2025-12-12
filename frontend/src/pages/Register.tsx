import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoaderPinwheel, Eye, EyeOff } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

interface FormData {
  name: string;
  email: string;
  password: string;
}

function Register() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const navigate = useNavigate();

  // Handle Submit
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData
      );
      setFormData({ name: "", email: "", password: "" });
      toast.success(response.data.message);
      navigate("/signin");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error?.response?.data?.message || "An unexpected error occured.";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occured.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          className: "bg-[#333] text-[#fff] ",
        }}
      />
      <div className="form-overlay">
        <div className="form-container">
          <div className="form-header">
            <h1>Create Account</h1>
            <p>Sign up to get started and join us!</p>
          </div>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="form-label" htmlFor="name">
                Full Name
              </label>
              <input
                className="form-input"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="John Mahom"
                required
              />

              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter your email"
                required
              />

              <label className="form-label" htmlFor="password">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  className="form-input"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={isHidden ? "password" : "text"}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setIsHidden(!isHidden)}
                  className="absolute right-0 p-3 cursor-pointer text-gray-500"
                >
                  {isHidden ? <Eye /> : <EyeOff />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#42b628] hover:bg-green-600 w-full p-3 rounded-lg text-white cursor-pointer flex items-center justify-center"
            >
              {isLoading ? (
                <LoaderPinwheel className="animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <p className="text-center text-gray-600 text-sm mt-5">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600 cursor-pointer">
              {" "}
              Sign in
            </Link>{" "}
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;