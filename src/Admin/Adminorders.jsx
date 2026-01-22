import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Edit, Trash2 } from "lucide-react"; 

export const Adminorders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
 

  // ✅ Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://192.168.18.41:5002/orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("❌ Failed to fetch orders!");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  
          useEffect(() => {
                // Show loader for 1 second on mount
                const timer = setTimeout(() => {
                  setShowLoader(false);
                }, 500);
            
                return () => clearTimeout(timer); // cleanup
              }, []);
        

  // ✅ Delete order


const handleDelete = (id) => {
  toast(
    ({ closeToast }) => (
      <div>
        <p>Are you sure you want to delete this order?</p>
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={async () => {
              try {
                 const url = "http://192.168.18.41:5002/orders/" + id;
                 let response = await fetch(url, { method: "DELETE" });
                 response = await response.json();
                 if (response) {
                 toast.success("🗑️ Order deleted!");
                 }
                 } catch {
                toast.error("❌ Failed to delete order!");
                 }
                 closeToast();
                 }}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Yes
          </button>
          <button
            onClick={closeToast}
            className="bg-gray-400 text-white px-3 py-1 rounded"
          >
            No
          </button>
        </div>
      </div>
    ),
    { autoClose: false }
  );
};


  const handleShowDetails = (id) => {
    setSelectedOrderId((prev) => (prev === id ? null : id));
  };



 if (showLoader) {
    return (
      <div className="flex  flex-col mt-40 items-center  h-screen">

    <img className="h-30 w-27 animate-spin mr-3 " src="/logo.jpg" alt="" />

    <div className="m-5 animate-pulse" >Loading . . .</div>
    </div>
    );
  }
  return (
    <>
    <div className="fade-in-up">
      <ToastContainer position="top-right" autoClose={2000} />
      </div>
      <div className="p-4 sm:p-6 bg-black rounded-3xl min-h-screen fade-in-up">
        <h1 className="text-2xl text-gray-200 font-bold mb-6 text-center mr-3">
          🧾 Customer / Order Details 
        </h1>

        <div className="bg-white shadow-lg rounded-2xl border border-gray-200 p-4">
          {loading ? (
            <div className="text-center py-10 text-gray-500">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-10 text-gray-500">No orders found.</div>
          ) : (
            <div className="overflow-x-auto rounded-2xl">
              <table className="w-full border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="bg-gray-800 text-gray-200 uppercase text-sm">
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Time</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {orders.map((order) => (
                    <React.Fragment key={order.id}>
                      <tr className="bg-white hover:bg-gray-100 transition">
                        <td className="p-3 break-all">{order["order id"]}</td>
                        <td className="p-3">
                          {order.delivery?.firstname} {order.delivery?.lastname}
                        </td>
                        <td className="p-3">
                          {new Date(order.createdAt).toLocaleString()}
                        </td>

                        {/* ✅ Responsive button group */}
                        <td className="p-3 text-center">
                         <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
  {/* 👁️ Show / Hide Details Button */}
  <button
    onClick={() => handleShowDetails(order.id)}
    className="bg-teal-400 cursor-pointer text-white px-3 py-1 rounded hover:bg-teal-700 transition w-full sm:w-auto flex items-center justify-center gap-1"
    title={selectedOrderId === order.id ? "Hide Details" : "Show Details"}
  >
    {selectedOrderId === order.id ? (
      <EyeOff size={18} />
    ) : (
      <Eye size={18} />
    )}
  </button>

  {/* ✏️ Edit Button */}
  <button
    onClick={() => toast.info("✏️ Edit functionality coming soon!")}
    className="bg-yellow-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-yellow-600 transition w-full sm:w-auto flex items-center justify-center"
    title="Edit Order"
  >
    <Edit size={18} />
  </button>

  {/* 🗑️ Delete Button */}
  <button
    onClick={() => handleDelete(order.id)}
    className="bg-red-600 cursor-pointer text-white px-3 py-1 rounded hover:bg-red-700 transition w-full sm:w-auto flex items-center justify-center"
    title="Delete Order"
  >
    <Trash2 size={18} />
  </button>
</div>
                        </td>
                      </tr>

                      {/* ✅ Inline Invoice (only one open at a time) */}
                      <AnimatePresence>
                        {selectedOrderId === order.id && (
                          <motion.tr
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            <td colSpan="4" className="bg-white p-4">
                              <AdminInvoice orderId={order.id} />
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// ✅ Independent Invoice Component
const AdminInvoice = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true); // start loader
      try {
        const res = await fetch(`http://192.168.18.41:5002/orders/${orderId}`);
        const data = await res.json();
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        // add a small delay for smooth transition
        setTimeout(() => setLoading(false), 500);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  // ✅ Show logo loader while fetching
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-10">
        <img
          className="h-20 w-20 animate-spin mb-3"
          src="/logo.jpg"
          alt="Loading"
        />
        <p className="animate-pulse text-gray-600">Loading Details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-4 text-red-500">
        No order details found!
      </div>
    );
  }

  // ✅ Once loaded, render invoice
  return (
    <div className="bg-white border-2 border-gray-300 rounded-lg p-4 sm:p-6 shadow overflow-x-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
        Invoice
      </h2>

      {/* Header */}
      <div className="flex justify-between items-start  border-b pb-3 mb-4 gap-3">
        <div>
          <p className="text-gray-600 break-all">
            Order ID: {order["order id"]}
          </p>
          <p className="text-gray-600">
            Date: {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <img src="/logo.jpg" alt="Logo" className="h-18 sm:h-25 -mt-8" />
      </div>
      

      {/* Billing Info */}
      <div className="mb-4 text-sm sm:text-base">
        <h3 className="font-semibold text-gray-800 mb-2">
          Billing Information
        </h3>
        <p>
          {order.delivery.firstname} {order.delivery.lastname}
        </p>
        <p>{order.delivery.address}</p>
        <p>
          {order.delivery.city}, {order.delivery.country}
        </p>
        <p>Phone: {order.delivery.phone}</p>
        <p>Email: {order.Email}</p>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left p-2">Product</th>
              <th className="text-right p-2">Price</th>
              <th className="text-right p-2">Qty</th>
              <th className="text-right p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.orderDetails.products.map((p, i) => (
              <tr key={i} className="border-b">
                <td className="p-2">{p.name}</td>
                <td className="p-2 text-right">Rs {p.price}</td>
                <td className="p-2 text-right">{p.quantity}</td>
                <td className="p-2 text-right">Rs {p.price * p.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-4 border-t pt-3 text-sm sm:text-base">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>
            Rs{" "}
            {order.orderDetails.products.reduce(
              (sum, p) => sum + p.price * p.quantity,
              0
            )}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Delivery:</span>
          <span>Rs 250</span>
        </div>
        <div className="flex justify-between font-semibold mt-2">
          <span>Total:</span>
          <span>
            Rs{" "}
            {order.orderDetails.products.reduce(
              (sum, p) => sum + p.price * p.quantity,
              0
            ) + 250}
          </span>
        </div>
      </div>

      <p className="text-center text-gray-500 text-xs sm:text-sm mt-4">
        Thank you for shopping with{" "}
        <span className="font-semibold">Scent Forest 🌿</span>
      </p>
    </div>
  );
};

