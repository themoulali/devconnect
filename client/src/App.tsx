import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login.tsx"
import Register from "./pages/Register.tsx"
import Profile from "./pages/Profile.tsx"
import ProtectedRoute from "./routes/ProtectedRoute.tsx"

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          DevConnect
        </h1>

        <p className="mt-4">
          Welcome to DevConnect
        </p>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App