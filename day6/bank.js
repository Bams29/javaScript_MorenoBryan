class BankAccount {
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    deposit(amount) {
        this.balance += amount;
        console.log(`Deposited $${amount}. New balance: $${this.balance}`);
    }

    withdraw(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrawn $${amount}. New balance: $${this.balance}`);
        } else {
            console.log("Insufficient funds");
        }
    }
}

// Creating instances of BankAccount
const account1 = new BankAccount("123456", 1000);
const account2 = new BankAccount("654321", 500);

// Depositing and withdrawing money
account1.deposit(500);
account1.withdraw(200);
account2.deposit(1000);
account2.withdraw(700);
