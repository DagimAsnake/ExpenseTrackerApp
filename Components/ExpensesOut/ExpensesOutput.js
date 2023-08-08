import { View, StyleSheet } from "react-native"

import ExpensesList from "./ExpensesList"
import ExpensesSummary from "./ExpensesSummary"
import { GlobalStyles } from "../../Constants/Styles"

const DUMMY_EXPENSES = [
    {
        id: "e1",
        description: "A book",
        amount: 18.56,
        date: new Date('2020-02-18')
    },
    {
        id: "e2",
        description: "Another book",
        amount: 14.22,
        date: new Date('2021-12-04')
    },
    {
        id: "e3",
        description: "A pair of shoes",
        amount: 32.99,
        date: new Date('2023-08-05')
    },
    {
        id: "e4",
        description: "A phone",
        amount: 999.99,
        date: new Date('2022-06-11')
    },
    {
        id: "e5",
        description: "A Tv",
        amount: 100.25,
        date: new Date('2023-08-04')
    },
    {
        id: "e6",
        description: "A book",
        amount: 18.56,
        date: new Date('2020-02-18')
    },
    {
        id: "e7",
        description: "Another book",
        amount: 14.22,
        date: new Date('2021-12-04')
    },
    {
        id: "e8",
        description: "A pair of shoes",
        amount: 32.99,
        date: new Date('2023-08-05')
    },
    {
        id: "e9",
        description: "A phone",
        amount: 999.99,
        date: new Date('2022-06-11')
    },
    {
        id: "e10",
        description: "A Tv",
        amount: 100.25,
        date: new Date('2023-08-04')
    }
]


function ExpensesOutput ({expensePeriod}) {
    return (
    <View style={styles.container}>
        <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensePeriod} />
        <ExpensesList expenses={DUMMY_EXPENSES} />
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
    }
})