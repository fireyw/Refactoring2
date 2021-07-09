import assert from 'assert';
let spaceship={}
let defaultOwnerData = {firstName: '마틴', lastName: '파울러'};

function defaultOwner() {return Object.assign({},defaultOwnerData);}
function setDefaultOwner(arg){
    defaultOwner=arg;
}


const owner1 = defaultOwner();
assert.equal('파울러',owner1.lastName, '처음값 확인');

const owner2= defaultOwner();
owner2.lastName='파슨스';
console.log(owner1);
assert.equal('파슨스',owner1.lastName, 'own2를 변경한후');
