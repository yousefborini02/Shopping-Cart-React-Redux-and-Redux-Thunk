import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../../Redux/productSlice";
import { addToCart } from "../../Redux/cartSlice";
import Navbar from "../../components/NavBar";
import { fetchUser } from "../../Redux/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productsStatus = useSelector((state) => state.products.status);
  const productsError = useSelector((state) => state.products.error);

  const user = useSelector((state) => state.user.user);
  const userStatus = useSelector((state) => state.user.status);
  const userError = useSelector((state) => state.user.error);

  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, productsStatus]);

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUser());
    }
  }, [dispatch, userStatus]);

  const handleDelete = async (id, event) => {
    event.preventDefault();
    
    try {
      await dispatch(deleteProduct(id)); // تنفيذ عملية الحذف
      dispatch(fetchProducts()); // إعادة جلب البيانات بعد الحذف
    } catch (error) {
      console.error("Error deleting product:", error); // عرض رسالة الخطأ إذا حدثت مشكلة
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (productsStatus === "loading" || userStatus === "loading") {
    return <div>Loading...</div>;
  }
  if (productsStatus === "failed") {
    return <div>Error fetching products: {productsError}</div>;
  }
  if (userStatus === "failed") {
    return <div>Error fetching user: {userError}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-8 mt-[72px]">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">
          Product Showcase
        </h1>
        {user && user[0] && user[0].isAdmin ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:-translate-y-2 hover:shadow-lg"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-64 w-full object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {product.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-blue-900">
                      ${product.price}
                    </span>
                    <div className="text-yellow-500 flex items-center">
                      <span className="mr-1">{product.rating_rate}</span>
                      <span className="text-sm text-gray-600">
                        ({product.rating_count})
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-md shadow-md hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg transition transform hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add to Cart
                  </button>
                  {user[0].isAdmin && (
                    <div className="mt-4">
                      <button type="button" className="w-[49%] mr-2 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-md shadow-md hover:from-yellow-600 hover:to-yellow-700 hover:shadow-lg transition transform hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                        Edit
                      </button>
                      {product.IsDeleted ? (
                        <button
                        type="button" // هذا يمنع السلوك الافتراضي من كونه submit
                        onClick={(e) => handleDelete(product.id, e)}
                          className="w-[49%] py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-md shadow-md hover:from-green-600 hover:to-green-700 hover:shadow-lg transition transform hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Retrieve
                        </button>
                      ) : (
                        <button
                        type="button" // هذا يمنع السلوك الافتراضي من كونه submit
                        onClick={(e) => handleDelete(product.id, e)}
                        className="w-[49%] py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-md shadow-md hover:from-red-600 hover:to-red-700 hover:shadow-lg transition transform hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Delete
                      </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products
              .filter((product) => !product.IsDeleted) // تصفية المنتجات المحذوفة
              .map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:-translate-y-2 hover:shadow-lg"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-64 w-full object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {product.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold text-blue-900">
                        ${product.price}
                      </span>
                      <div className="text-yellow-500 flex items-center">
                        <span className="mr-1">{product.rating_rate}</span>
                        <span className="text-sm text-gray-600">
                          ({product.rating_count})
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-md shadow-md hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg transition transform hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
