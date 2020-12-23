const initState = []

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'add':
            let {expenseOperation, expenseDate, amountOfMoney, expenseCurrency} = action.expense
            const simularDateOperation = state.find((operation) => operation.date === expenseDate)
            const newExpense = {date: expenseDate, expenseOperationsInfo: [{operation: expenseOperation, money: amountOfMoney, currency: expenseCurrency}]}
            
            if (simularDateOperation !== undefined) {
                simularDateOperation.expenseOperationsInfo.push({operation: expenseOperation, money: amountOfMoney, currency: expenseCurrency})
                return ([...state])
            } else {
                return ([...state, newExpense])
            }
 
        case 'list':
            const sortedListOfExpenses = state.sort((a, b) => a.date.split('-').join('') - b.date.split('-').join(''))
            return ([...sortedListOfExpenses])
        case 'clear':
            const filteredListOfExpenses = state.filter((expense) => expense.date !== action.date)
            return ([...filteredListOfExpenses]) 
        default: 
            return state
    }
}

export default reducer; 