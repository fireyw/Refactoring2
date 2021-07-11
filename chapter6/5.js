import assert from 'assert';
class Book {
    _reservation= [];
    constructor(props) {
    }

    addReservation(customer, isPiority){
        assert(isPiority === true || isPiority===false); //매개변수 실제로 사용하는지 확인
        this._reservation.push(customer);
    }
    get reservation(){
        console.log(this._reservation);
    }
}

const bookcafe = new Book();
bookcafe.addReservation({name:'fireyw', age:'38'},false);
bookcafe.reservation;