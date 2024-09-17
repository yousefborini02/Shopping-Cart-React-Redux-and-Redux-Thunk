import React, { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "../page/Cart/Cart";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchUser } from "../Redux/userSlice";
const Navbar = () => {
  // عدد العناصر في السلة (يمكن ربطها بالحالة الفعلية لاحقًا)
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItemCount = cartItems.length; // كمثال، يمكنك استبدالها بحالة فعلية لاحقًا

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUser());
    }
  }, [dispatch, status]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* شعار الموقع */}
        <div className="flex items-center">
          <img
            src="https://t4.ftcdn.net/jpg/03/32/31/65/360_F_332316530_ofa4oQA3ZGWxd4tRLDqKuADfy2hnpWuU.jpg"
            alt="Logo"
            className="h-10 w-10 rounded-full"
          />
          <span className="text-xl font-bold text-blue-900 ml-3">My Shop</span>
        </div>

        {/* الروابط */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-900 font-semibold transition"
          >
            Home
          </Link>
        </div>

        <div className="flex items-center">
          {/* أيقونة السلة */}
          <Link to="/Cart" className="relative cursor-pointer mr-3">
            <FaShoppingCart className="text-gray-700 hover:text-blue-900 text-2xl transition" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>
          {user ? (
            <Link
              to="/Signup"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Log out
            </Link>
          ) : (
            <Link
              to="/Signup"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Signup
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
