import cloneDeep from 'lodash/cloneDeep.js'
const baseRate = (month, year) => year - 2000 + month
const calculateBaseCharge = aReading => baseRate(aReading.month, aReading.year) * aReading.quantity
const taxThreshold = year => (year - 2000) * 0.1
class Reading{
    constructor(data) {
        this._customer=data.customer;
        this._quantity=data.quantity;
        this._month=data.month;
        this._year=data.year;
    }
    get customer(){return this._customer};
    get quantity(){return this._quantity};
    get month(){return this._month};
    get year(){return this._year};

}
const acquireReading = () => ({
    customer: 'ivan',
    quantity: 10,
    month: 5,
    year: 2017,
})

const client1=()=>{
    const rawReading = new Reading(acquireReading());
    const aReading= enrichReading(rawReading);
    const baseCharge= aReading.baseCharge;
    return baseCharge;
}

const client2=()=>{
    const rawReading = new Reading(acquireReading());
    const aReading= enrichReading(rawReading);
    const base= aReading.baseCharge;
    const taxableCharge= aReading.taxableCharge;
    return taxableCharge;
}

const client3= ()=>{
    const rawReading = new Reading(acquireReading());
    const aReading= enrichReading(rawReading);
    const basicChargeAmount = aReading.baseCharge;
    return basicChargeAmount
}


function enrichReading(original){
    const result = cloneDeep(original);
    result.baseCharge = calculateBaseCharge(result);
    result.taxableCharge = Math.max(0, result.baseCharge - taxThreshold(result.year))
    return result;
}

[client1,client2,client3].forEach(c=>console.log(c()));