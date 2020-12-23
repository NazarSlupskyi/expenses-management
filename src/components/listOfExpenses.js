import React from 'react';
import { nanoid } from 'nanoid'

const ListOfExpenses = ({expensesList}) => (
    <ul className='expenses-list'>
        {expensesList.map(expense => (
            <li key={nanoid(10)} className='expense'>
                <div className='date-events'>{expense.date}</div>
                {expense.expenseOperationsInfo.map((expenseOperation) =>(
                    <div key={nanoid(11)} className='event-of-expens'>{expenseOperation.operation} {expenseOperation.money} {expenseOperation.currency}</div>
                ))}  
            </li>
        ))}
    </ul>
    
)

export default ListOfExpenses; 