import { View, StyleSheet, Text } from "react-native"

import ExpensesList from "./ExpensesList"
import ExpensesSummary from "./ExpensesSummary"
import { GlobalStyles } from "../../Constants/Styles"

function ExpensesOutput ({expenses, expensePeriod, fallBackText}) {

    let content = <Text style={styles.infoText}>{fallBackText}</Text>

    if(expenses.length > 0) {
        content = <ExpensesList expenses={expenses} />
    }

    return (
    <View style={styles.container}>
        <ExpensesSummary expenses={expenses} periodName={expensePeriod} />
        {content}
    </View>
    )
}

export default ExpensesOutput

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 24,
        paddingHorizontal: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    infoText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
        marginTop: 32
    }
})