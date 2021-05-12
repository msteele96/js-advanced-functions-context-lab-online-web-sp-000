/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function (array) {
    const employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

let createEmployeeRecords = function (array) {
    return array.map(createEmployeeRecord)
}

let createTimeInEvent = function (timeStamp) {
    const time = timeStamp.split(" ")[1]
    const date = timeStamp.split(" ")[0]
    const timeInObj = {}

    timeInObj.type = "TimeIn"
    timeInObj.hour = parseInt(time)
    timeInObj.date = date
    
    this.timeInEvents.push(timeInObj)
    
    return this
}

let createTimeOutEvent = function (timeStamp) {
    const time = timeStamp.split(" ")[1]
    const date = timeStamp.split(" ")[0]
    const timeOutObj = {}

    timeOutObj.type = "TimeOut"
    timeOutObj.hour = parseInt(time)
    timeOutObj.date = date
    
    this.timeOutEvents.push(timeOutObj)
    
    return this
}

let hoursWorkedOnDate = function (date) {
    const timeIn = this.timeInEvents.find(element => element.date === date).hour
    const timeOut = this.timeOutEvents.find(element => element.date === date).hour

    return (timeOut - timeIn) / 100
}

let wagesEarnedOnDate = function (date) {
    const hours = hoursWorkedOnDate.call(this, date)
    const rate = this.payPerHour

    return rate * hours
}

function findEmployeeByFirstName(employeeObjs, firstName) {
    return employeeObjs.find(info => info.firstName === firstName)    
}

let calculatePayroll = function (employees) {
    return employees.reduce(function(wages, employee){
        return wages + allWagesFor.call(employee)
    }, 0)
}
