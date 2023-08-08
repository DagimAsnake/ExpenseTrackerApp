import React from 'react'

import ExpensesOutput from '../Components/ExpensesOut/ExpensesOutput'

const RecentExpensesScreen = () => {

  return (
      <ExpensesOutput expensePeriod={"Last 7 days"} />
  )
}

export default RecentExpensesScreen