// Author: Ahmed Kamal

//////////////Catch Seletors//////////////

// Form Selectors

let budgetInput = document.querySelector(".b-input");
let calcBudgetBtn = document.querySelector(".add-budget");

let expenseNameInput = document.querySelector("#expense");
let expenseAmountInput = document.querySelector("#amount");
let addExpenseBtn = document.querySelector(".add-expense");

// Displayes Selectors

let budgetDisplay = document.querySelector("#budget-amount");
let expenseDisplay = document.querySelector("#expenses-amount");
let balanceDisplay = document.querySelector("#balance-amount");

let balanceSpan = document.querySelector(".balance span");

// lists Selctors 

let expenseNames = document.querySelector("#expenses-list");
let expenseValues = document.querySelector("#expenses-value");
let actionsList = document.querySelector("#actions");

// CalcBtn Function

let handleBalancecolor = function () {
    if (balanceDisplay.innerHTML >= 0){
        balanceSpan.style.color = "green";
        balanceDisplay.style.color = "green"
    }
    else {
        balanceSpan.style.color = "rgb(188 4 4)";
        balanceDisplay.style.color = "rgb(188 4 4)";
    }

}

calcBudgetBtn.addEventListener("click", function () {
    let budget = budgetInput.value;
    if (budget > 0) {
        budgetDisplay.innerHTML = budget;
        balanceDisplay.innerHTML = budget - expenseDisplay.innerHTML;
        handleBalancecolor();
        budgetInput.value = "";
    }
    else {
        let invalidDiv = document.createElement("div");
        invalidDiv.className = "alert alert-danger";
        invalidDiv.innerHTML = "Please Enter a Valid Budget";
        document.querySelector(".budget-form").after(invalidDiv);
        setTimeout(() => {
            invalidDiv.remove();
        }, 2000)
    }
});

// Add Expense Function

let expenseArray = [];

addExpenseBtn.addEventListener("click", function () {
    let expenseName = expenseNameInput.value;
    let expenseAmount = expenseAmountInput.value;

    if (expenseName !== "" && expenseAmount > 0){
        expenseNames.innerHTML += `<li data-id="${expenseArray.length}">-${expenseName}</li>`;
        expenseValues.innerHTML += `<li data-id="${expenseArray.length}">${expenseAmount} EGP</li>`;
        actionsList.innerHTML += `<div class="actions-div row" data-id="${expenseArray.length}">
                                            <button type="button"
                                                class="btn btn-info">Edit</button>
                                            <button type="button"
                                                class="btn btn-danger">Delete</button>
                                        </div>`
        expenseArray.push({name: expenseName, amount: expenseAmount, id: expenseArray.length});
        expenseDisplay.innerHTML = Number(expenseDisplay.innerHTML) + Number(expenseAmount);
        balanceDisplay.innerHTML = budgetDisplay.innerHTML - expenseDisplay.innerHTML;
        handleBalancecolor();
        expenseNameInput.value = "";
        expenseAmountInput.value = "";
    }
    else {
        let invalidDiv = document.createElement("div");
        invalidDiv.className = "alert alert-danger";
        invalidDiv.innerHTML = "Please Enter Valid data";
        document.querySelector(".expenses-form").after(invalidDiv);
        setTimeout(() => {
            invalidDiv.remove();
        }, 2000)
    }
})

// Delete Expense Function

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-danger")){
        let id = e.target.parentElement.getAttribute("data-id");
        let expense = document.querySelector(`#expenses-list li[data-id="${id}"]`);
        let expenseValue = document.querySelector(`#expenses-value li[data-id="${id}"]`);
        let action = document.querySelector(`#actions div[data-id="${id}"]`);
        expenseDisplay.innerHTML = Number(expenseDisplay.innerHTML) - parseInt(expenseValue.innerHTML);
        balanceDisplay.innerHTML = budgetDisplay.innerHTML - expenseDisplay.innerHTML;
        handleBalancecolor();
        expense.remove();
        expenseValue.remove();
        action.remove();
    }
})

// Edit Expense Function

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-info")){
        let id = e.target.parentElement.getAttribute("data-id");
        let expense = document.querySelector(`#expenses-list li[data-id="${id}"]`);
        let expenseValue = document.querySelector(`#expenses-value li[data-id="${id}"]`);
        let action = document.querySelector(`#actions div[data-id="${id}"]`);
        expenseNameInput.value = expense.innerHTML.slice(1);
        expenseAmountInput.value = expenseValue.innerHTML.slice(0, -4);
        expenseDisplay.innerHTML = Number(expenseDisplay.innerHTML) - parseInt(expenseValue.innerHTML);
        balanceDisplay.innerHTML = budgetDisplay.innerHTML - expenseDisplay.innerHTML;
        handleBalancecolor();
        expense.remove();
        expenseValue.remove();
        action.remove();
    }
})


