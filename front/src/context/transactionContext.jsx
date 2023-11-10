import { createContext } from "react";

const TransactionContext = createContext({
    transactions: null,
    categories: null,
    subCategories: null
})

export default TransactionContext;