import React, { useState , useEffect} from "react";
import { usecart } from "../context/Cartcontext";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Checkout = () => {
  const { cart, clearCart } = usecart();
   const [showLoader, setShowLoader] = useState(true);

  const itemCount = cart?.items?.length || 0;
  

  const [formData, setFormData] = useState({
    email: "",
    country: "Pakistan",
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    postalcode: "",
    phone: "",
    whatsapp: "",
    paymentMethod: "COD",
    Totalamount:"",
  });

    useEffect(() => {
          // Show loader for 1 second on mount
          const timer = setTimeout(() => {
            setShowLoader(false);
          }, 500);
      
          return () => clearTimeout(timer); // cleanup
        }, []);
  
    

  const deliveryFee = 250;
  const subtotal = (cart?.items || []).reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const total = subtotal + deliveryFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // complete order
 const navigate = useNavigate();


   if (showLoader) {
      return (
        <div className="flex flex-col justify-center items-center  h-screen">
  
      <img className="h-30 w-27 animate-spin mr-3 " src="/logo.jpg" alt="" />
  
      <div className="m-5 animate-pulse" >Loading . . .</div>
      </div>
      );
    }

const handleCompleteOrder = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.firstname || !formData.address || !formData.phone) {
    toast.warn("⚠️ Please fill all required fields before proceeding!" ,{position: "top-center",} );
    return;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    toast.error("🛒 Your cart is empty!" ,
      {position: "top-center",
      theme: "colored",
    });
    return;
  }

  const newOrder = {
    "order id": Date.now(),
    Email: formData.email,
    delivery: {
      country: formData.country,
      firstname: formData.firstname,
      lastname: formData.lastname,
      address: formData.address,
      city: formData.city,
      postalcode: formData.postalcode,
      phone: formData.phone,
      whatsapp: formData.whatsapp,
    },
    "Shipping method": {
      "Standard delivery": "Rs 250.00",
      "Bank Transfer": "easypaisa",
    },
    payment: {
      "cash On Delivery": formData.paymentMethod === "COD" ? "COD" : "",
      "Bank Transfer":
        formData.paymentMethod === "BANK" ? "Easypaisa / JazzCash" : "",
    },
    orderDetails: {
      products: (cart?.items || []).map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      })),
    },
    "COMPLETE TOTAL": subtotal + deliveryFee,
    createdAt: new Date().toISOString(),
  };

  try {
    const response = await fetch("http://192.168.18.41:5002/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder),
    });

    if (!response.ok) throw new Error(`Server returned ${response.status}`);

    // Clear cart
    await clearCart();

    // Fancy toast 🎉
    toast.success("🎉 Thank you! Your order was placed successfully 💚", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    // Redirect after 1.5 sec
    setTimeout(() => {
      navigate("/invoice", { state: { order: newOrder } });
    }, 2000);
  } catch (error) {
    console.error("❌ Error completing order:", error);
    toast.error("❌ Something went wrong while processing your order. Please try again later." ,{position: "top-center",} );
  }
};


 return (
  <div className="bg-gray-50 min-h-screen">
    {/* Top navbar for small screens */}
    <div className="lg:hidden bg-black text-white flex justify-between items-center px-4 py-3 shadow-md">
     <Link to="/" > <img src="/forest.jpg" alt="Logo" className="h-15" /></Link>
      <Link
        to="/cart"
        className="relative border px-3 py-2 rounded-md hover:scale-110 transition"
      >
        <IoCartOutline className="h-7 w-7 md:h-8 md:w-8" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-semibold rounded-full px-1.5">
            {itemCount}
          </span>
        )}
      </Link>
    </div>

    {/* ✅ WRAPPER FOR LEFT + RIGHT CONTENT */}
    <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-10 px-6 lg:px-16 py-10">
      
      {/* LEFT FORM SECTION */}
      <div className="flex-1 max-w-2xl mx-auto">
        <form
          onSubmit={handleCompleteOrder}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <h2 className="text-2xl font-semibold mt-1 col-span-2">Contact</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-3 rounded-md col-span-2"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <h2 className="text-2xl font-semibold col-span-2">Delivery</h2>
          <select
            name="country"
            className="border p-3 rounded-md col-span-2"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">Select Country / Region</option>
            <option value="Pakistan">Pakistan</option>
            <option value="UAE">United Arab Emirates</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="USA">USA</option>
            <option value="UK">United Kingdom</option>
          </select>

          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            className="border p-3 rounded-md"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            className="border p-3 rounded-md"
            value={formData.lastname}
            onChange={handleChange}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            className="border p-3 rounded-md col-span-2"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            className="border p-3 rounded-md"
            value={formData.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="postalcode"
            placeholder="Postal Code"
            className="border p-3 rounded-md"
            value={formData.postalcode}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="border p-3 rounded-md col-span-2"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <div className="col-span-2 relative">
            <FaWhatsapp className="absolute left-3 top-4 text-green-600 text-xl" />
            <input
              type="text"
              name="whatsapp"
              placeholder="WhatsApp Number"
              className="border p-3 pl-10 rounded-md w-full"
              value={formData.whatsapp}
              onChange={handleChange}
            />
          </div>

          <div className="col-span-2 border p-4 rounded-md bg-gray-100">
            <h4 className="font-medium mb-2 text-gray-800">Shipping Method</h4>
            <label className="flex items-center space-x-2 text-gray-700">
              <input type="radio" checked readOnly />
              <span>Standard Delivery — Rs 250.00</span>
            </label>
          </div>

          <div className="col-span-2">
            <h4 className="text-lg mb-2 text-gray-800">Payment Method</h4>
            <div className="flex flex-col md:flex-row gap-4">
              <label
                className={`flex-1 border-2 rounded-lg p-4 cursor-pointer text-center transition ${
                  formData.paymentMethod === "COD"
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  className="hidden"
                  checked={formData.paymentMethod === "COD"}
                  onChange={handleChange}
                />
                <span className="font-medium block">Cash on Delivery</span>
              </label>

              <label
                className={`flex-1 border-2 rounded-lg p-4 cursor-pointer text-center transition ${
                  formData.paymentMethod === "BANK"
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="BANK"
                  className="hidden"
                  checked={formData.paymentMethod === "BANK"}
                  onChange={handleChange}
                />
                <span className="font-medium block">
                  Bank Transfer (Easypaisa / JazzCash)
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
   
            className="col-span-2 bg-gradient-to-r from-teal-400 to-emerald-500 text-white py-3 rounded-md mt-4 hover:scale-105 transition"
        >
            Complete Order
          </button>
        </form>
      </div>

      {/* RIGHT SUMMARY SECTION */}
      <div className="flex-1 lg:w-[40%] bg-black text-white shadow-md p-6 rounded-lg mt-10 lg:mt-0">
        <div className="hidden lg:flex justify-between items-center mb-10">
            <Link to="/" > <img src="/forest.jpg" alt="Logo" className="h-20" /></Link>
          <Link
            to="/cart"
            className="relative border px-3 py-2 rounded-md hover:scale-110 transition"
          >
            <IoCartOutline className="h-7 w-7 md:h-8 md:w-8" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-semibold rounded-full px-1.5">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        <h3 className="text-lg font-semibold mb-6">Your Items</h3>
        <div className="space-y-4 mb-6">
          {!cart || (cart.items || []).length === 0 ? (
            <p className="text-gray-400">No items in cart</p>
          ) : (
            cart.items.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b pb-3"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <span>{item.name}</span>
                </div>
                <span>Rs {item.price}</span>
              </div>
            ))
          )}
        </div>

        <div className="border-t pt-4 text-gray-200 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>Rs {subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee:</span>
            <span>Rs {deliveryFee}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>Rs {total}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

};
