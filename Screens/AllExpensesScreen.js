import React, {useContext} from 'react'

import ExpensesOutput from '../Components/ExpensesOut/ExpensesOutput'
import { ExpensesContext } from '../Store/ExpensesContext'

const AllExpensesScreen = () => {

  const expensesCtx = useContext(ExpensesContext)

  return (
    <>
      <ExpensesOutput expenses={expensesCtx.expenses} expensePeriod={"Total"} fallBackText={"No registerd expenses found."} />
    </>
  )
}

export default AllExpensesScreen