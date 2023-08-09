import React, {useLayoutEffect, useContext} from 'react'
import {View, StyleSheet} from 'react-native'

import { GlobalStyles } from '../Constants/Styles'
import IconButton from '../Components/Ui/IconButton'
import Button from '../Components/Ui/Button'
import ExpensesForm from '../Components/ManageExpenses/ExpensesForm'

import { ExpensesContext } from '../Store/ExpensesContext'

const ManageExpensesScreen = ({route, navigation}) => {
  const expenseCtx = useContext(ExpensesContext)

  const expenseId = route.params?.expenseId
  const isEditing = !!expenseId

  const selectedExpense = expenseCtx.expenses.find(expense => expense.id === expenseId)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense"
    })
  }, [navigation, isEditing])

  function deleteExpenseHandler () {
    expenseCtx.deleteExpenses(expenseId)
    navigation.goBack()
  }

  function cancelHandler () {
    navigation.goBack()
  }

  function confirmHandler (expensesData) {
    if(isEditing){
      expenseCtx.updateExpenses( expenseId, expensesData)
    } else {
      expenseCtx.addExpenses(expensesData)
    }
    navigation.goBack()
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