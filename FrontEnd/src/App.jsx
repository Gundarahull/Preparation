import { useEffect, useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Post from "./components/Post";
import ProductDetail from "./components/ProductEdit";

function App() {
  return (
    <>    
    
    <BrowserRouter>
      <nav>
        <Link to="/"> Home </Link> ||
        <Link to="/about"> About</Link>
        <Link to="/post"> Post</Link>
        <Link to="/dashboard"> DashBoard </Link> ||
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About  />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<Post />} />
        <Route
          path="/edit/:id"
          element={<ProductDetail arr={[{ id: 1, name: "puhul" }]} />}
        />
        {/* //Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
