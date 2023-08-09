import { View, Text, StyleSheet } from "react-native"

import Input from "./Input"

function amountChangedHandler () {

}

function ExpensesForm () {
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expenses</Text>
            <View style={styles.inputsRow} >
                <Input 
                    style={styles.rowInput}
                    label={"Amount"} 
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: amountChangedHandler
                    }}
                />
                <Input
                    style={styles.rowInput}
                    label={"Date"} 
                    textInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        onChangeText: () => {}
                    }}
                />
            </View>
            <Input 
                label={"Description"} 
                textInputConfig={{
                    multiline: true
                }}
            />
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
    }
})