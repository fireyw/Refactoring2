function printOwing(invoice){
    let outstanding =0 ;
    console.log("**********");
    console.log("**고객 채무**");
    console.log("**********");

    //미해결 채무(outstanding) 계산
    for(const o of invoice.orders){
        outstanding+=o.amount;
    }

    /*const today= Clock.today;  //시스템 시계를 감싸는 객체
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()+30);
*/
    const today = new Date()
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)

    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
    console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
}

printOwing({
    customer: '재남',
    orders: [
        { name: '사채', amount: 100 },
        { name: '대출', amount: 1000 },
    ],
});