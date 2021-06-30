// import playData from "./plays";
// import invoiceData from "./invoices";
const plays = {
    'hamlet': {'name': 'Hamlet', 'type': 'tragedy'},
    'as-like': {'name': 'As You Like it', 'type': 'comedy'},
    'othello': {'name': 'Othello', 'type': 'tragedy'}
}
const invoices =
    {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 55
            },
            {
                'playID': 'as-like',
                'audience': 35
            },
            {
                'playID': 'othello',
                'audience': 40
            },
        ]
    }

console.log(statement(invoices, plays));

function amountFor(aPerformance, play){ //값이 바뀌지 않는 매개 변수 전달
    let result =0; //변수 초기화

    switch (play.type) {
        case "tragedy": //비극
            result = 40000;
            if (aPerformance.audience > 30) {
                result += 1000 * (aPerformance.audience - 30)
            }
            break;
        case "comedy":
            result = 30000;
            if (aPerformance.audience > 20) {
                result += 10000 + 500 * (aPerformance.audience - 20)
            }
            result += 300 * aPerformance.audience;
            break;
        default:
            throw new Error(`알 수 없는 장르: ${play.type}`);
    }
    return result;
}

function playFor(aPerformance){
    return plays[aPerformance.playID];
}

function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구내역( 고객명: ${invoice.customer})\n`;
    const format = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD", minimumFractionDigits: 2
    }).format;

    for (let perf of invoice.performances) {
        // const play = playFor(perf);

        let thisAmount = 0;

        thisAmount= amountFor(perf, playFor(perf))

        //포인트를 적립한다
        volumeCredits += Math.max(perf.audience-30, 0);
        //희극 관객 5명마다 추가 포인트를 제공한다
        if('comedy'=== playFor(perf).type) volumeCredits += Math.floor(perf.audience/5);

        //청구 내역을 출시한다
        result += `${playFor(perf).name}: ${format(thisAmount/100)} (${perf.audience}석) \n`;
        totalAmount += thisAmount;
    }
    result += `총액: ${format(totalAmount/100)}\n`;
    result += `적립 포인트: ${volumeCredits}점\n`;
    return result;
}