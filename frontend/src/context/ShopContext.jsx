// sabhi common or state variables ko yaha define karenge, taki ye variables poore app me available ho jaye. Isse hume baar baar unhe define karne ki zarurat nahi padegi. Ye context API ka use karke kiya jayega, jisme hum ek context create karenge aur usme apne variables ko store karenge. Phir hum apne components me us context ko use karke un variables ko access kar sakte hain.


// `ShopContext` is a global state container for your app.

// Without it, if you need `products` or `currency` in 10 different components, you'd have to pass them as props through every single component manually — that's called **prop drilling** and it gets messy fast.

// With Context:
// - You define `products`, `currency`, `delivery_fee` once here
// - Wrap your entire app with `ShopContextProvider`
// - Any component anywhere in the tree can just do `useContext(ShopContext)` and directly access those values — no prop passing needed

// That's it. It's just a way to share data globally across your entire app.


import { createContext } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();
// export islie taaki ham ise kahi bhi use kr sake

const ShopContextProvider = (props) => {

    // this will be reflected in the entire site -> currency symbol
    const currency = '$';
    const delivery_fee = 10;

    const value = {
        products, currency, delivery_fee
    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider> 

        // createContext() → creates the container
        // ShopContext.Provider → broadcasts the values inside that container to everything wrapped inside it
    )
}

export default ShopContextProvider;