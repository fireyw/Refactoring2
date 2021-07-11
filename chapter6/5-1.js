function inNewEngland(stateCode) {
    // const stateCode = aCustomer.address.state;
    // return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
    return xxNewinNewEngland(stateCode);
}

function xxNewinNewEngland(stateCode){
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

let someCustomers = [
    {
        address: {state: 'MA'},
        national: "Eng"
    },
    {
        address: {state: 'KR'},
        national: "Kor"
    }
];

const newEnglanders = someCustomers.filter(c => inNewEngland(c.address.state));

console.log(newEnglanders);