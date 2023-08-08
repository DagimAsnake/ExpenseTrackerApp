import React, {useContext} from 'react'

import ExpensesOutput from '../Components/ExpensesOut/ExpensesOutput'
import { ExpensesContext } from '../Store/ExpensesContext'
import { getDateMinusDays } from '../Utils/Date'

const RecentExpensesScreen = () => {

  const expensesCtx = useContext(ExpensesContext)

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