import React, {useContext, useEffect, useState} from 'react'

import ExpensesOutput from '../Components/ExpensesOut/ExpensesOutput'
import { ExpensesContext } from '../Store/ExpensesContext'
import { getDateMinusDays } from '../Utils/Date'
import { fetchExpenses } from '../Utils/Http'
import LoadingOverlay from '../Components/Ui/LoadingOverlay'
import ErrorOverlay from '../Components/Ui/ErrorOverlay'

const RecentExpensesScreen = () => {
  const [isFetching, setIsFetching] = useState(true)
  const expensesCtx = useContext(ExpensesContext)
  const [error, setError] = useState()

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true)
      try{
        const expenses = await fetchExpenses()
        expensesCtx.setExpenses(expenses)
      } catch(error) {
        setError("Couldn't fetch expenses")
      }
      setIsFetching(false) 
    }

    getExpenses()
  }, [])

  function errorCancel () {
    setError(null)
  }

  if(error && !isFetching) {
    return  <ErrorOverlay message={error} onConfirm={errorCancel} />
  }

  if(isFetching) {
    return <LoadingOverlay />
  }

  const recentExpenses = expensesCtx.expenses.filter((expenses) => {
    const today = new Date()
    const date7DaysAgo = getDateMinusDays(today, 7)

    return (expenses.date >= date7DaysAgo) && (expenses.date <= today)
  })

  return (
      <ExpensesOutput expenses={recentExpenses} expensePeriod={"Last 7 days"} fallBackText={"No registered expense found in the last 7 days."} />
  )
}

export default RecentExpensesScreen