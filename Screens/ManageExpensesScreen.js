import React, {useLayoutEffect} from 'react'
import {View, StyleSheet} from 'react-native'

import { GlobalStyles } from '../Constants/Styles'
import IconButton from '../Components/Ui/IconButton'
import Button from '../Components/Ui/Button'

const ManageExpensesScreen = ({route, navigation}) => {
  const expenseId = route.params?.expenseId
  const isEditing = !!expenseId

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense"
    })
  }, [navigation, isEditing])

  function deleteExpenseHandler () {

  }

  function cancelHandler () {
    navigation.goBack()
  }

  function confirmHandler () {

  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={cancelHandler} mode={"flat"}>Cancel</Button>
        <Button style={styles.button} onPress={confirmHandler}>{isEditing ? "Update" : "Add"}</Button>
      </View>
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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center"
  }
})