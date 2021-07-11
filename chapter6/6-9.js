const baseRate = (month, year) => year - 2000 + month

class Reading{
    constructor(data) {
        this._customer=data.customer;
        this._quantity=data.quantity;
        this._month=data.month;
        this._year=data.year;
    }
    get customer(){return this._customer};
    get quantitu(){return this._quantity};
    get month(){return this._month};
    get year(){return this._year};
    get baseCharge(){
        return baseRate(this._month, this._year)*this._quantity;
    }
    get taxableCharge(){
        return Math.max(0, this.baseCharge - (this.year - 2000) * 0.1);
    }
}
const acquireReading = () => ({
    customer: 'ivan',
    quantity: 10,
    month: 5,
    year: 2017,
})
const client2=()=>{
    const aReading = new Reading(acquireReading());
    const base= aReading.baseCharge;
    const taxableCharge= aReading.taxableCharge
    return taxableCharge;
}

const client3= ()=>{
    const aReading = new Reading(acquireReading());
    const basicChargeAmount= aReading.baseCharge;
    return basicChargeAmount
}
[client2,client3].forEach(c=>console.log(c()));