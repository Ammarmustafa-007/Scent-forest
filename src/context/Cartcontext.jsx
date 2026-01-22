import { createContext, useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const cartContext = createContext(null);

export const CartContext = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [deviceId, setDeviceId] = useState(null);

  // ---- Setup deviceId once ----
  useEffect(() => {
    let storedId = localStorage.getItem("deviceId");
    if (!storedId) {
      storedId = uuidv4(); // generate once
      localStorage.setItem("deviceId", storedId);
    }
    setDeviceId(storedId);

    // Fetch existing cart for this device
    const fetchCart = async () => {
      try {
        const res = await fetch(
          `http://192.168.18.41:5001/carts?deviceId=${storedId}`
        );
        const data = await res.json();
        if (data.length > 0) {
          setCart(data[0]); // load existing cart
        }
      } catch (err) {
        console.error("❌ Error fetching cart:", err);
      }
    };

    fetchCart();
  }, []);

  // ---- Add item to cart ----
  const addtocart = async (product) => {
    try {
      if (!cart) {
        // Create new cart
        const newCart = {
          id: uuidv4(),
          deviceId,
          userId: null, // no auth yet
          items: [
            {
              productId: product.id,
              name: product.name,
              price: Number(product.price),
              photo: product.photo,
              quantity: 1,
            },
          ],
        };

        const res = await fetch("http://192.168.18.41:5001/carts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCart),
        });

        const savedCart = await res.json();
        setCart(savedCart);
        console.log("🆕 Cart created:", savedCart);
        return;
      }

      // Update existing cart
      const existing = cart.items.find((p) => p.productId === product.id);

      let updatedItems;
      if (existing) {
        updatedItems = cart.items.map((p) =>
          p.productId === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      } else {
        updatedItems = [
          ...cart.items,
          {
            productId: product.id,
            name: product.name,
            price: Number(product.price),
            photo: product.photo,
            quantity: 1,
          },
        ];
      }

      const updatedCart = { ...cart, items: updatedItems };
      await syncCart(updatedCart);
    } catch (err) {
      console.error("❌ Error adding to cart:", err);
    }
  };

  // ---- Increase qty ----
  const increaseQty = async (productId) => {
    if (!cart) return;
    const updatedItems = cart.items.map((p) =>
      p.productId === productId ? { ...p, quantity: p.quantity + 1 } : p
    );
    await syncCart({ ...cart, items: updatedItems });
  };

  // ---- Decrease qty ----
  const decreaseQty = async (productId) => {
    if (!cart) return;
    const updatedItems = cart.items
      .map((p) =>
        p.productId === productId ? { ...p, quantity: p.quantity - 1 } : p
      )
      .filter((p) => p.quantity > 0);
    await syncCart({ ...cart, items: updatedItems });
  };

  // ---- Remove item ----
  const removeFromCart = async (productId) => {
    if (!cart) return;
    const updatedItems = cart.items.filter((p) => p.productId !== productId);
    await syncCart({ ...cart, items: updatedItems });
  };

  // ---- Sync cart with DB ----
  const syncCart = async (updatedCart) => {
    await fetch(`http://192.168.18.41:5001/carts/${cart.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCart),
    });
    setCart(updatedCart);
    console.log("✅ Cart synced:", updatedCart);
  };

  const clearCart = async () => {
  if (!cart) return;
  await fetch(`http://192.168.18.41:5001/carts${cart.id}`, {
    method: "DELETE",
  });
  setCart(null);
  console.log("🗑️ Cart deleted from DB");
};


  return (
    <cartContext.Provider
      value={{
        cart,
        addtocart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export const usecart = () => useContext(cartContext);
