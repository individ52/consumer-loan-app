export default class LoanDto {
    amount;
    term;
    name;
    borrowerId;
    addedDate;
    monthlyInterestRate;
    amountBack;
    dateBack;

    constructor(model) {
        this.amount = model.amount;
        this.term = model.term;
        this.name = model.name;
        this.borrowerId = model.borrowerId;
        this.addedDate = model.addedDate;
        this.monthlyInterestRate = model.monthlyInterestRate;
        this.setAmountBack();
        this.setDateBack();
    }
    setAmountBack() {
        const amountBack = this.amount * Math.pow(1 + this.monthlyInterestRate, this.term);
        this.amountBack = Math.round(amountBack * 100) / 100;
    }
    setDateBack() {
        const endDateMonthCount = this.addedDate.getMonth() + this.term;
        const newDate = new Date(this.addedDate).setMonth(endDateMonthCount);
        this.dateBack = new Date(newDate);
    }
}
