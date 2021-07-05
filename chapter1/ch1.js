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

class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }

    get amount() {
        throw new Error('서브클래스에서 처리하도록 설계되었습니다');
    }

    get volumeCredits() {
        return Math.max(this.performance.audience - 30, 0);
    }
}

class TragedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = 40000;
        if (this.performance.audience > 30) {
            result += 1000 * (this.performance.audience - 30)
        }
        return result;
    }
}

class ComedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = 30000; //변수 초기화
        if (this.performance.audience > 20) {
            result += 10000 + 500 * (this.performance.audience - 20)
        }
        result += 300 * this.performance.audience;
        return result;
    }
    get volumeCredits() {
        return super.volumeCredits+Math.floor(this.performance.audience / 5);
    }
}

function createPerformanceCalculator(aPerformance, aPlay) {
    switch(aPlay.type){
        case "tragedy": return new TragedyCalculator(aPerformance, aPlay);
        case "comedy": return new ComedyCalculator(aPerformance, aPlay);
    }
    return new PerformanceCalculator(aPerformance, aPlay);
}

console.log(statement(invoices, plays));

// console.log(htmlStatement(invoices, plays));


function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD", minimumFractionDigits: 2
    }).format(aNumber / 100);

}

function statement(invoice, plays) {
    return renderPlainText(createStatementData(invoice, plays));
}

function htmlStatement(invoice, plays) {
    return renderHtml(createStatementData(invoice, plays))
}

function renderHtml(data) {
    let result = `<h1>Statement for ${data.customer}</h1>\n`;
    result += "<table>\n";
    result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>";
    for (let perf of data.performances) {
        result += `  <tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
        result += `<td>${usd(perf.amount)}</td></tr>\n`;
    }
    result += "</table>\n";
    result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
    result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
    return result;
}

function createStatementData(invoice, plays) {

    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData)
    // return renderPlainText(statementData, invoice, plays);
    return statementData;

    function enrichPerformance(aPerformance) {
        const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance)); //공연료 계산기 생성
        const result = Object.assign({}, aPerformance); //얕은복사
        result.play = calculator.play;  //class play() 함수 호출
        result.amount = calculator.amount; //class () 함수 호출
        result.volumeCredits = calculator.volumeCredits;
        return result;
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    function amountFor(aPerformance) { //값이 바뀌지 않는 매개 변수 전달
        return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;
    }

    function volumeCreditsFor(aPerformance) {
        let volumeCredits = 0;
        volumeCredits += Math.max(aPerformance.audience - 30, 0);
        //희극 관객 5명마다 추가 포인트를 제공한다
        if ('comedy' === aPerformance.play.type) volumeCredits += Math.floor(aPerformance.audience / 5);
        return volumeCredits;
    }

    function totalAmount(data) {
        // for (let perf of data.performances) {
        //     //포인트를 적립한다
        //     result += perf.amount
        // }
        return data.performances.reduce((total, p) => total + p.amount, 0)
    }

    function totalVolumeCredits(data) {
        // for (let perf of data.performances) {
        //     //포인트를 적립한다
        //     result += perf.volumeCredits
        // }
        return data.performances.reduce((total, p) => total + p.volumeCredits, 0)
    }
}

function renderPlainText(data, invoice, plays) {
    let result = `청구내역( 고객명: ${data.customer})\n`;

    for (let perf of data.performances) {
        //청구 내역을 출시한다
        result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석) \n`;
    }
    result += `총액: ${usd(data.totalAmount)}\n`;
    result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
    return result;

    function usd(aNumber) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD", minimumFractionDigits: 2
        }).format(aNumber / 100);

    }
}

