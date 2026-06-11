import { createContext } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

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
    )
}

export default ShopContextProvider;