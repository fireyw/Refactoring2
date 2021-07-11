import assert from 'assert';

let defaultOwnerData = {firstName: '마틴', lastName: '파울러'};

// function defaultOwner() {return Object.assign({},defaultOwnerData);}
function defaultOwner() {return new Person(defaultOwnerData)};

function setDefaultOwner(arg){
    defaultOwner=arg;
}

class Person {
    constructor(data) {
        this._lastName= data.lastName;
        this._firstName= data.firstName;
    }
    get lastName(){return this._lastName};
    get firstName(){return this._firstName};
}




const owner1 = defaultOwner();
assert.equal('파울러',owner1.lastName, '처음값 확인');

const owner2= defaultOwner();
owner2.lastName='파슨스';
console.log(owner1);
assert.equal('파슨스',owner1.lastName, 'own2를 변경한후');
