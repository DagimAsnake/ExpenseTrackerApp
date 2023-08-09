import React, {useContext, useEffect, useState} from 'react'

import ExpensesOutput from '../Components/ExpensesOut/ExpensesOutput'
import { ExpensesContext } from '../Store/ExpensesContext'
import { fetchExpenses } from '../Utils/Http'
import LoadingOverlay from '../Components/Ui/LoadingOverlay'
import ErrorOverlay from '../Components/Ui/ErrorOverlay'

const AllExpensesScreen = () => {
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState()

  const expensesCtx = useContext(ExpensesContext)

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true)
      try {
        const expenses = await fetchExpenses()
        expensesCtx.setExpenses(expenses)
      } catch(error) {
        setError("Couldn't fetch expenese")
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

  return (
    <>
      <ExpensesOutput expenses={expensesCtx.expenses} expensePeriod={"Total"} fallBackText={"No registerd expenses found."} />
    </>
  )
}

export default AllExpensesScreen