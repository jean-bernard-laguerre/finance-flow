const finances = {
    
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

    getBudgetExpense (transactions, subcategory_id) {
            
        let balance = 0;
    
        transactions.forEach((transaction) => {
            if(transaction.subcategory_id == subcategory_id){
                if(transaction.category_name == "Debit"){
                    balance += parseFloat(transaction.amount);
                }
            }
        });
        
        return Math.round(balance * 100) / 100;
    },

    getTotalByCategory (transactions ) {
        let total = {};

        transactions.forEach((transaction) => {
            total[transaction.subcategory_name] ? 
                total[transaction.subcategory_name] += parseFloat(transaction.amount) 
                : 
                total[transaction.subcategory_name] = parseFloat(transaction.amount);
        });

        return total;
    },

    getPerDayReport (transactions) {
            
        let perDayReport = {};
        transactions.forEach((transaction) => {

            if(!perDayReport[transaction.transaction_date]){
                perDayReport[transaction.transaction_date] = {
                    "Credit": 0,
                    "Debit": 0
                };
            }

            perDayReport[transaction.transaction_date][transaction.category_name] += parseFloat(transaction.amount);
            
        });
        
        // order by date
        let sortedPerDayReport = Object.keys(perDayReport).sort().reduce(
            (obj, key) => { 
                obj[key] = perDayReport[key]; 
                return obj;
            }, 
            {}
        );

        return sortedPerDayReport;
    },

    filter (transactions, filters) {

        let filteredTransactions = [];

        (filters.category !== '0' || filters.category == '') ? (
            filteredTransactions = transactions.filter((transaction) => {
                if(transaction.category_id == filters.category){
                    return transaction;
                }
            })
        ) : filteredTransactions = transactions;

        if (filters.subCategory !== '0' || filters.subCategory == '') {

            filteredTransactions = filteredTransactions.filter((transaction) => {
                if(transaction.subcategory_id == filters.subCategory){
                    return transaction;
                }
            })
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
                case 'description':
                    return order * (a.description.localeCompare(b.description));
                case 'place':
                    return order * (a.place.localeCompare(b.place));
                default:
                    return 0;
            }
        });

        return sortedTransactions;
    }
}

export default finances;