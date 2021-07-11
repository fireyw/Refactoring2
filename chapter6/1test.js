
const printOwing = invoice => {
    printBanner();

    //미해결 채무 계산
    const outstanding=calculateOutstanding(invoice);
    //
    // for (const o of invoice.orders) {
    //     outstanding += o.amount
    // }
    recordDueDate(invoice);
    printDetail(invoice,outstanding);

    function calculateOutstanding(invoice){
        let outstanding = 0

        for (const o of invoice.orders) {
            outstanding += o.amount
        }
        return outstanding;
    }

    function printDetail(invoice,outstanding){
        console.log(`고객명: ${invoice.customer}`)
        console.log(`채무액: ${outstanding}`)
        console.log(`마감일: ${invoice.dueDate?.toLocaleString()}`)
    }

    function printBanner(){
        console.log('*******************')
        console.log('***** 고객채무 *****')
        console.log('*******************')
    }

    function recordDueDate(invoice){
        const today = new Date()
        invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)
    }
}


printOwing({
    customer: '용우',
    orders: [
        { name: '사채', amount: 100 },
        { name: '대출', amount: 1000 },
    ],
})