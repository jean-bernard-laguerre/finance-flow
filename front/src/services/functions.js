const transacTools = {
    
    getBalance (transactions) {

        let balance = 0;

        transactions.forEach((transaction) => {
            if(transaction.category_name == "Credit"){
                balance += parseFloat(transaction.amount);
            }
            else{
                balance -= parseFloat(transaction.amount);
            }
        });
    
        return balance;
    },

    filterTransactions (transactions, filters) {

        let filteredTransactions = [];

        if (filters.category !== '0') {
            transactions.forEach((transaction) => {
                if(transaction.category_id == filters.category){
                    filteredTransactions.push(transaction);
                }
            });
        }

        if (filters.subCategory !== '0') {
            transactions.forEach((transaction) => {
                if(transaction.subcategory_id == filters.subCategory){
                    filteredTransactions.push(transaction);
                }
            });
        }
        
        if (filters.category == '0' && filters.subCategory == '0') {
            filteredTransactions = transactions;
        }

        return filteredTransactions;
    }
}

export default transacTools;