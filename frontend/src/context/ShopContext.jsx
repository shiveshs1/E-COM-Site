// sabhi common or state variables ko yaha define karenge, taki ye variables poore app me available ho jaye. Isse hume baar baar unhe define karne ki zarurat nahi padegi. Ye context API ka use karke kiya jayega, jisme hum ek context create karenge aur usme apne variables ko store karenge. Phir hum apne components me us context ko use karke un variables ko access kar sakte hain.


// `ShopContext` is a global state container for your app.

// Without it, if you need `products` or `currency` in 10 different components, you'd have to pass them as props through every single component manually — that's called **prop drilling** and it gets messy fast.

// With Context:
// - You define `products`, `currency`, `delivery_fee` once here
// - Wrap your entire app with `ShopContextProvider`
// - Any component anywhere in the tree can just do `useContext(ShopContext)` and directly access those values — no prop passing needed

// That's it. It's just a way to share data globally across your entire app.

import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import axios from 'axios'


export const ShopContext = createContext();

const ShopContextWrapper = (props) => {
    // we'll create some global vairables which we can use throughout website , can also change in one click


    // this will be reflected in the entire site -> currency symbol
    const currency = "$";
    const delivery_fee = 10;
    const backendURL = import.meta.env.VITE_BACKEND_URL

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false) //initially it was true.
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [refreshToken, setRefreshToken] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const navigate = useNavigate();


    const addToCart = async (itemId, size) => {
        let cartData = structuredClone(cartItems);

        if (!size) {
            toast.error("Select Product Size");
            return;
        }

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
                // used for prod 1 and M:2
            } else {
                cartData[itemId][size] = 1;
                // used for prod1 and L:1 -> same prod, diff sizes
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);

        if (accessToken) {
            try {
                await axios.post(`${backendURL}/api/cart/add`, { itemId, size }, { headers: { accessToken } })
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }


    // to update cart value 
    const getCartCount = () => {
        let totalCount = 0;
        // 1st loop to iterate the items
        for (const items in cartItems) 
            { // items = product
            // 2nd loop to iterate size of items / product
            for (const item in cartItems[items]) 
                { // item = size
                // const quantity = cartItems[items][item];
                // // Check if the quantity is valid (greater than 0)
                // if (quantity > 0) {
                //     totalCount += quantity
                // }

                try
                {
                    if(cartItems[item][item] > 0)
                    {
                        totalCount += cartItems[item][item];
                    }
                } catch(error) {

                    }
                }
            }
        }
        return totalCount;
    };

    // to update cart  value after deleting the products from there
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        if (!cartData[itemId]) {
            cartData[itemId] = {}
        }

        cartData[itemId][size] = quantity;

        setCartItems(cartData);

        if (accessToken) {

            try {

                await axios.post(`${backendURL}/api/cart/update`, { itemId, size, quantity }, { headers: { accessToken } })

            } catch (error) {
                console.log(error);
                toast.error(error.message)

            }
        }
    };


    const getCartAmount = () => {
        let totalAmount = 0;

        // Create a map for fast product lookup
        // const productMap = products.reduce((map, product) => {
        //     map[product._id] = product;
        //     return map;
        // }, {});

        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items); 


            // let itemInfo = productMap[items];  // Get product info by ID
            // if (itemInfo) {
            //     for (const item in cartItems[items]) {
            //         if (cartItems[items][item] > 0) {
            //             totalAmount += itemInfo.price * cartItems[items][item];  // Add the cost
            //         }
            //     }
            // }

            for (const item in cartItems[items]) {
                try {
                    if(cartItems[items][item] > 0)
                    {
                        totalAmount += itemInfo.price * cartItems[items][item];  // Add the cost
                    }
                } catch(error){

                }
            }
        }
        return totalAmount;
    }


    const getProductsData = async () => {
        try {

            const response = await axios.get(`${backendURL}/api/product/list`);
            // console.log(response.data);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);

        }
    }

    // to make sure cart data is saved even after reloading page
    const getUserCart = async (accessToken) => {
        try {

            const response = await axios.post(`${backendURL}/api/cart/get`, {}, { headers: { accessToken } })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        if (!accessToken && localStorage.getItem('accessToken')) {
            setAccessToken(localStorage.getItem('accessToken'))
        }
    }, [accessToken])

    useEffect(() => {
        // Only try to get the user's cart if the accessToken is available
        if (accessToken) {
            getUserCart(accessToken); // Pass accessToken to fetch cart data
            updateQuantity()
        }
    }, [accessToken]);

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendURL,
        setRefreshToken,
        refreshToken,
        accessToken,
        setAccessToken,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>

        // createContext() → creates the container
        // ShopContext.Provider → broadcasts the values inside that container to everything wrapped inside it
    );
};

export default ShopContextWrapper;