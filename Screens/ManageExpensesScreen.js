import React, {useLayoutEffect, useContext, useState} from 'react'
import {View, StyleSheet} from 'react-native'

import { GlobalStyles } from '../Constants/Styles'
import IconButton from '../Components/Ui/IconButton'
import ExpensesForm from '../Components/ManageExpenses/ExpensesForm'
import { storeExpenses, updateExpense, deleteExpense } from '../Utils/Http'
import LoadingOverlay from '../Components/Ui/LoadingOverlay'
import ErrorOverlay from '../Components/Ui/ErrorOverlay'

import { ExpensesContext } from '../Store/ExpensesContext'

const ManageExpensesScreen = ({route, navigation}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isError, setIsError] = useState()
  const expenseCtx = useContext(ExpensesContext)

  const expenseId = route.params?.expenseId
  const isEditing = !!expenseId

  const selectedExpense = expenseCtx.expenses.find(expense => expense.id === expenseId)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense"
    })
  }, [navigation, isEditing])

  async function deleteExpenseHandler () {
    setIsSubmitting(true)
    try {
      await deleteExpense(expenseId)
      expenseCtx.deleteExpenses(expenseId)
      navigation.goBack()
    } catch(error) {
      setIsError("Couldn't delete this expenese")
      setIsSubmitting(false)
    }
  }

  function cancelHandler () {
    navigation.goBack()
  }

  async function confirmHandler (expensesData) {
    setIsSubmitting(true)
    try{
      if(isEditing){
        expenseCtx.updateExpenses( expenseId, expensesData)
        await updateExpense(expenseId, expensesData)
      } else {
        const id = await storeExpenses(expensesData)
        expenseCtx.addExpenses({...expensesData, id: id})
      }
      navigation.goBack()
    } catch(error) {
      setIsError("Couldn't save data, please try again")
      setIsSubmitting(false)
    }
  
  }

  function errorCancel () {
    setIsError(null)
  }

  if(isError && !isSubmitting) {
    return <ErrorOverlay message={isError} onConfirm={errorCancel} />
  }

  if(isSubmitting) {
    return <LoadingOverlay />
  }

  return (
    <View style={styles.container}>
      <ExpensesForm defaultValues={selectedExpense} onSubmit={confirmHandler} onCancel={cancelHandler} submitLabel={isEditing ? "Update" : "Add"} />
        {isEditing && (
          <View style={styles.deleteContainer}>
            <IconButton name={"trash"} color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler} />
          </View>
        )}
    </View>
  )
}

export default ManageExpensesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center"
  }
})