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
    
        return Math.round(balance * 100) / 100;
    },

    getSubBalance (transactions, subcategory_id) {
            
        let balance = 0;
    
        transactions.forEach((transaction) => {
            if(transaction.subcategory_id == subcategory_id){
                if(transaction.category_name == "Credit"){
                    balance -= parseFloat(transaction.amount);
                }
                else{
                    balance += parseFloat(transaction.amount);
                }
            }
        });
        
        return Math.round(balance * 100) / 100;
    },

    filter (transactions, filters) {

        let filteredTransactions = [];

        if (filters.category !== '0' || filters.subCategory == '') {
            transactions.forEach((transaction) => {
                if(transaction.category_id == filters.category){
                    filteredTransactions.push(transaction);
                }
            });
        }

        if (filters.subCategory !== '0' || filters.subCategory == '') {
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
    },
    sort (transactions, key, order) {

        let sortedTransactions = [];
        order = order == 'asc' ? 1 : -1;

        sortedTransactions = transactions.sort((a, b) => {
            switch (key) {
                case 'title':
                    return order * (a.title.localeCompare(b.title));
                case 'transaction_date':
                    return order * (new Date(a.transaction_date) - new Date(b.transaction_date));
                case 'amount':
                    return order * (parseFloat(b.amount) - parseFloat(a.amount));
                case 'category_name':
                    return order * (a.category_name.localeCompare(b.category_name));
                case 'subcategory_name':
                    return order * (a.subcategory_name.localeCompare(b.subcategory_name));
                default:
                    return 0;
            }
        });

        return sortedTransactions;
    }
}

export default transacTools;