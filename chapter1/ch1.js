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

function statement(invoice, plays) {
    const statementData = {};
    statementData.customer=invoice.customer;
    statementData.performances=invoice.performances;
    return renderPlainText(statementData, invoice, plays);
}

function renderPlainText(data, invoice, plays) {
    let result = `청구내역( 고객명: ${data.customer})\n`;

    for (let perf of data.performances) {
        //청구 내역을 출시한다
        result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석) \n`;
    }
    result += `총액: ${usd(totalAmount())}\n`;
    result += `적립 포인트: ${totalVolumeCredits()}점\n`;
    return result;

    function totalAmount() {
        let result = 0;
        for (let perf of data.performances) {
            //포인트를 적립한다
            result += amountFor(perf)
        }
        return result;

    }

    function totalVolumeCredits() {
        let result = 0;
        for (let perf of data.performances) {
            //포인트를 적립한다
            result += volumeCreditsFor(perf)
        }
        return result;

    }

    function usd(aNumber) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD", minimumFractionDigits: 2
        }).format(aNumber / 100);

    }

    function volumeCreditsFor(aPerformance) {
        let volumeCredits = 0;
        volumeCredits += Math.max(aPerformance.audience - 30, 0);
        //희극 관객 5명마다 추가 포인트를 제공한다
        if ('comedy' === playFor(aPerformance).type) volumeCredits += Math.floor(aPerformance.audience / 5);
        return volumeCredits;

    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    function amountFor(aPerformance) { //값이 바뀌지 않는 매개 변수 전달

        let result = 0; //변수 초기화
        switch (playFor(aPerformance).type) {
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
                throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
        }
        return result;
    }
}


