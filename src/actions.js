import { ADD, CLEAR, LIST } from './constans.js'

export const addExpense = expenseAction => ({type: ADD, expense: expenseAction});
export const clearExpenses = date => ({type: CLEAR, date});
export const listOfExpenses = () => ({type: LIST});