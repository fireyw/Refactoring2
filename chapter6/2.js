function rating(aDriver) {
    return aDriver.numberOfLateDeliveries > 5 ? 2 : 1;
}

function moreThanFiveLateDeliveries(aDriver) {
    return aDriver.numberOfLateDeliveries > 5;
}

// console.log(rating({
//     driver: 'yw',
//     numberOfLateDeliveries: 51
// }));

function reportLines(aCustomer){
    const lines=[];
    lines.push(["name", aCustomer.name]);
    lines.push(["location", aCustomer.location]);

    // gatherCustomerData(lines, aCustomer);
    return lines;
}

function gatherCustomerData(out, aCustomer){
    out.push(["name", aCustomer.name]);
    out.push(["location", aCustomer.location]);
}

console.log(reportLines({name: 'yw', location: 'seoul'}));