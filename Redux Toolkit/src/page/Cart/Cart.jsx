import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeQuantity, removeFromCart } from '../../Redux/cartSlice';
import { FaTrashAlt } from 'react-icons/fa';
import Navbar from '../../components/NavBar';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto my-10 bg-white shadow-lg rounded-lg overflow-hidden mt-[72px]">
        <h2 className="text-2xl font-bold text-blue-900 px-6 py-4 border-b border-gray-200">Shopping Cart</h2>
        <div className="p-6">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between py-4">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1 ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <div className="text-sm text-gray-600 mb-1">Price: ${parseFloat(item.price).toFixed(2)}</div>
                    <div className="flex items-center">
                      <button 
                        onClick={() => dispatch(changeQuantity({ id: item.id, amount: -1 }))}
                        className="px-2 py-1 text-lg bg-gray-200 rounded hover:bg-gray-300 transition"
                      >
                        -
                      </button>
                      <span className="mx-2 text-lg">{item.quantity}</span>
                      <button 
                        onClick={() => dispatch(changeQuantity({ id: item.id, amount: 1 }))}
                        className="px-2 py-1 text-lg bg-gray-200 rounded hover:bg-gray-300 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-lg font-bold text-blue-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button 
                      onClick={() => dispatch(removeFromCart(item.id))} 
                      className="ml-4 text-red-500 hover:text-red-700 transition"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {cartItems.length > 0 && (
            <div className="mt-6 border-t border-gray-200 pt-4 flex justify-between items-center">
              <span className="text-xl font-bold text-gray-800">Total:</span>
              <span className="text-2xl font-bold text-blue-900">
                ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
