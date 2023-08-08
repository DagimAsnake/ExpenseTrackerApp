import { createContext, useReducer} from "react"

const DUMMY_EXPENSES = [
    {
        id: "e1",
        description: "A book",
        amount: 18.56,
        date: new Date('2020-02-18')
    },
    {
        id: "e2",
        description: "Another book",
        amount: 14.22,
        date: new Date('2021-12-04')
    },
    {
        id: "e3",
        description: "A pair of shoes",
        amount: 32.99,
        date: new Date('2023-08-05')
    },
    {
        id: "e4",
        description: "A phone",
        amount: 999.99,
        date: new Date('2022-06-11')
    },
    {
        id: "e5",
        description: "A Tv",
        amount: 100.25,
        date: new Date('2023-08-04')
    },
    {
        id: "e6",
        description: "A book",
        amount: 18.56,
        date: new Date('2020-02-18')
    },
    {
        id: "e7",
        description: "Another book",
        amount: 14.22,
        date: new Date('2021-12-04')
    },
    {
        id: "e8",
        description: "A pair of shoes",
        amount: 32.99,
        date: new Date('2023-08-05')
    },
    {
        id: "e9",
        description: "A phone",
        amount: 999.99,
        date: new Date('2022-06-11')
    },
    {
        id: "e10",
        description: "A Tv",
        amount: 100.25,
        date: new Date('2023-08-04')
    }
]

export const ExpensesContext = createContext({
    expenses : [],
    addExpenses: ({description, amount, date}) => {},
    deleteExpenses: (id) => {},
    updateExpenses: (id, {description, amount, date}) => {}
})

function expensesReducer(state, action) {
    switch(action.type) {
        case"ADD":
            const id = new Date().toString() + Math.random().toString()
            return [{...action.payload, id: id}, ...state]
        case "UPDATE":
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            )
            const updatableExpense = state[updatableExpenseIndex]
            const updatedItem = {...updatableExpense, ...action.payload.data}
            const updatedExpenses = [...state]
            updatedExpenses[updatableExpenseIndex] = updatedItem
            return updatedExpenses
        case "DELETE":
            return state.filter((expense) => expense.id !== action.payload)
        default:
            return state
    }
}

function ExpensesContextProvider({children}) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES)

    function addExpenses(expensesData) {
        dispatch({type: "ADD", payload: expensesData})
    }

    function deleteExpenses(id) {
        dispatch({type: "DELETE", payload: id})
    }

    function updateExpenses(id, expensesData) {
        dispatch({type: "UPDATE", payload: {id: id, data: expensesData}})
    }

    const value = {
        expenses: expensesState,
        addExpenses: addExpenses,
        deleteExpenses: deleteExpenses,
        updateExpenses: updateExpenses
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider