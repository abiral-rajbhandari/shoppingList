import { useState } from "react";
import { Eye, EyeOff, LoaderPinwheel } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

interface FormData {
  email: string;
  password: string;
}

function Login() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [isHidden, setIsHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(formData);
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData
      );
      const token = response.data.token;
      const successMessage = response.data.message;
      localStorage.setItem("token", token);
      toast.success(successMessage);
      setTimeout(() => {
        navigate("/");
      }, 1500);
      setFormData({ email: "", password: "" });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error?.response?.data?.message;
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
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
            <h1>Welcome Back!</h1>
            <p>Sign in to continue to your account</p>
          </div>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="form-label" htmlFor="email">
                Email Address
              </label>
              <input
                className="form-input"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>
            <div className="input-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  className="form-input"
                  id="password"
                  type={isHidden ? "password" : "text"}
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  value={formData.password}
                  required
                />
                <button
                  type="button"
                  onClick={() => setIsHidden(!isHidden)}
                  className="absolute right-0 h-full p-2  text-gray-500 cursor-pointer "
                >
                  {isHidden ? <Eye /> : <EyeOff />}
                </button>
              </div>
              <p className="text-right text-sm text-blue-600 cursor-pointer">
                Forgot password?
              </p>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full p-3 bg-background hover:bg-blue-600 text-white rounded-lg cursor-pointer flex justify-center items-center"
            >
              {isLoading ? (
                <LoaderPinwheel className="animate-spin" />
              ) : (
                "Sign in"
              )}
            </button>
          </form>
          <p className=" text-center text-gray-600 text-sm mt-5">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 cursor-pointer">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
