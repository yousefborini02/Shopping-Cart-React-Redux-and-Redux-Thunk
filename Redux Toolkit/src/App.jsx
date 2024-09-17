import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home/Home";
import LuxuriousAnimatedHelloWorld from "./components/LuxuriousAnimatedHelloWorld";
import Cart from "./page/Cart/Cart";
import SingUp from "./page/SingUp/SingUp";
import LogIn from "./page/LogIn/Login";
function App() {
  return (
    <>
      {/* <LuxuriousAnimatedHelloWorld /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/signup" element={<SingUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
