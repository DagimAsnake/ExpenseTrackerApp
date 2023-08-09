import { useState } from "react"
import { View, Text, StyleSheet } from "react-native"

import Input from "./Input"
import Button from "../Ui/Button"
import { getFormattedDate } from "../../Utils/Date"
import { GlobalStyles } from "../../Constants/Styles"

function ExpensesForm ({onCancel, submitLabel, onSubmit, defaultValues}) {
    const [inputs, setInputs] = useState({
        amount: {value: defaultValues ? defaultValues.amount.toString() : "", isValid: true},
        date: {value: defaultValues ? getFormattedDate(defaultValues.date) : "", isValid: true},
        description: {value: defaultValues ? defaultValues.description : "", isValid: true}
    })

    function inputChangeHandler (inputIdentifier, enteredValues) {
        setInputs((currentValues) => {
            return {
                ...currentValues,
                [inputIdentifier]: {value: enteredValues, isValid: true}
            }
        })
    }

    function submitHandler () {
        const expensesData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }

        const amountIsValid = !isNaN(expensesData.amount) && expensesData.amount > 0
        const dateIsValid = expensesData.date.toString() !== "Invalid Date"
        const descriptionIsValid = expensesData.description.trim().length > 0

        if(!amountIsValid || !dateIsValid || !descriptionIsValid) {
            setInputs((currentValues) => {
                return {
                    amount: {value: currentValues.amount.value, isValid: amountIsValid},
                    date: {value: currentValues.date.value, isValid: dateIsValid},
                    description: {value: currentValues.description.value, isValid: descriptionIsValid}
                }
            })
            return
        }

        onSubmit(expensesData)
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expenses</Text>
            <View style={styles.inputsRow} >
                <Input 
                    style={styles.rowInput}
                    label={"Amount"}
                    invalid={!inputs.amount.isValid} 
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: inputChangeHandler.bind(this, "amount"),
                        value: inputs.amount.value
                    }}
                />
                <Input
                    style={styles.rowInput}
                    label={"Date"} 
                    invalid={!inputs.date.isValid} 
                    textInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, "date"),
                        value: inputs.date.value
                    }}
                />
            </View>
            <Input 
                label={"Description"} 
                invalid={!inputs.description.isValid} 
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangeHandler.bind(this, "description"),
                    value: inputs.description.value
                }}
            />
            {formIsInvalid && <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>}
             <View style={styles.buttons}>
                <Button style={styles.button} onPress={onCancel} mode={"flat"}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>{submitLabel}</Button>
            </View>
        </View>
    )
}

export default ExpensesForm

const styles = StyleSheet.create({
    form: {
        marginTop: 40
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginVertical: 24,
        textAlign: "center"
    },
    inputsRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    rowInput: {
        flex: 1
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
    errorText: {
        textAlign: "center",
        color: GlobalStyles.colors.error500,
        margin: 8
    }
})