import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <>
    <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          className: "bg-[#333] text-[#fff] ",
        }}
      />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signin" element={<Login/>}/>
      <Route path="/signup" element={<Register/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/reset-password" element={<ResetPassword/>}/>
    </Routes>
    </>
  )
}

export default App