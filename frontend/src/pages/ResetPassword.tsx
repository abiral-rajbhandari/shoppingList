import { useState } from "react";
import { Eye, EyeOff, LoaderPinwheel } from "lucide-react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

function ResetPassword() {
  const [isHidden, setIsHidden] = useState(true);
  const [formData, setFormData] = useState({ newPassword: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  //
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:3000/api/auth/reset-password", {newPassword: formData.newPassword, token }); // todo: Put URL
      const successMessage = response.data.message;
      toast.success(successMessage);
      setFormData({ newPassword: "" });
      navigate("/signin");

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error?.response?.data?.message;
        toast.error(errorMessage); // Token expired 
        setTimeout(() => {
          navigate("/forgot-password");
        }, 1500);
      } else {
        toast.error("Unexpected error occured.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  //
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
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
          className: "bg-[#333] text-[#fff]",
        }}
      />
      <div className="form-overlay">
        <div className="form-container">
          <div className="form-header">
            <h1>Create new password</h1>
            <p>Enter a new password for your account.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="input-group">
              <div className="relative flex items-center">
                <input
                  className="form-input"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  type={isHidden ? "password" : "text"}
                  placeholder="New Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setIsHidden(!isHidden)}
                  className="absolute right-0  p-3 text-gray-500 "
                >
                  {isHidden ? <Eye /> : <EyeOff />}
                </button>
              </div>
            </div>
            <button
              className="w-full p-3 bg-btn-primary text-white rounded-lg cursor-pointer flex justify-center items-center"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <LoaderPinwheel className="animate-spin" />
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
