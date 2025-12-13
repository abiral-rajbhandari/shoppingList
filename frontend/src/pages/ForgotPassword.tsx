import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { LoaderPinwheel } from "lucide-react";

function ForgotPassword() {
  const [formData, setFormData] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(false);

  //
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:3000/api/auth/forgot-password", formData); //todo: Put URL
      const successMessage = response.data.message;
      toast.success(successMessage);
      setFormData({ email: "" });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error?.response?.data?.message;
        toast.error(errorMessage);
      } else {
        toast.error("Unexpected error occured.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  //
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
            <h1>Reset your password</h1>
            <p>Enter your email address to receive a password reset link. </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="input-group">
              <input
                className="form-input"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
              />
            </div>
            <button
              className="w-full p-3 bg-btn-primary text-white rounded-lg cursor-pointer flex justify-center items-center"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <LoaderPinwheel className="animate-spin" />
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
