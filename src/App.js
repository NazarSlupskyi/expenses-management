import React from 'react'
import { connect } from 'react-redux';
import { addExpense, clearExpenses, listOfExpenses } from './actions';
import './App.css'; 
import ListOfExpenses from './components/listOfExpenses'

const App = ({add, expensesList, clear, list}) => {
  
  const handelSendComand = () => {
    let inputValue = document.querySelector('.command-input').value
    const enteryValue = inputValue.split(' ')
    let regxToFindStrWithQuotes = /("|')([^"']+)/
    const resaltOfRegx = inputValue.match(regxToFindStrWithQuotes)
    
    if (resaltOfRegx !== null) {
      enteryValue[4] = resaltOfRegx[2]
    }

    switch (enteryValue[0]) {
      case 'add':
        return add({expenseOperation: enteryValue[4], expenseDate: enteryValue[1], amountOfMoney: enteryValue[2], expenseCurrency: enteryValue[3]})
      case 'list': 
        return list()
      case 'clear':
        return clear(enteryValue[1])
      case 'total':
        return getExchangeRates(enteryValue[1])
      default: 
        return
    }
    
  } 

  const getExchangeRates = async (exchangeCurrency) => {
    const promis = await fetch('http://data.fixer.io/api/latest?access_key=b5377d57f387a7e0101c31b5c9d49e70')
    const exchangeRates = await promis.json()
    let totalAmount = 0

    if (!exchangeCurrency) return
    
    expensesList.map((expense) => expense.expenseOperationsInfo.map(element => (
          totalAmount += element.money / exchangeRates.rates[element.currency] * exchangeRates.rates[exchangeCurrency.toUpperCase()]
        )));
    
    alert(`Total currency ${totalAmount.toFixed(2)} ${exchangeCurrency.toUpperCase()}`)
  }

  return (
    <>
      <header className='header-conteiner'>
        <h1 className='header-title'>Expenses List</h1>
        <input className='command-input'></input>
        <button className='enter-command-btn' onClick={handelSendComand}>Enter</button>
      </header>
      <section className='main-conteuner'>
        <ListOfExpenses expensesList={expensesList}/>
      </section>
    </>
  )
}

const mapStateToProps = (state) => ({
  expensesList: [...state]
});

const mapDispatchToProps = (dispatch) => ({
  add: (expense) => dispatch(addExpense(expense)),
  clear: (date) => dispatch(clearExpenses(date)),
  list: () => dispatch(listOfExpenses())
});

export default connect(mapStateToProps, mapDispatchToProps)(App)

