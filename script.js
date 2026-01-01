const balance = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const type = document.getElementById('type');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Add transaction
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const transaction = {
        id: Date.now(),
        text: text.value,
        amount: +amount.value,
        type: type.value
    };

    transactions.push(transaction);
    updateLocalStorage();
    init();

    text.value = '';
    amount.value = '';
});

// Remove transaction
function removeTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    init();
}

// Add transaction to DOM
function addTransactionDOM(transaction) {
    const sign = transaction.type === 'expense' ? '-' : '+';
    const item = document.createElement('li');

    item.classList.add(transaction.type);
    item.innerHTML = `
        ${transaction.text}
        <span>${sign}₹${transaction.amount}</span>
        <button class="dot" onclick="removeTransaction(${transaction.id})"></button>
    `;

    list.appendChild(item);
}

// Update values
function updateValues() {
    let income = 0;
    let expense = 0;

    transactions.forEach(t => {
        if (t.type === 'income') income += t.amount;
        else expense += t.amount;
    });

    incomeEl.innerText = `₹${income}`;
    expenseEl.innerText = `₹${expense}`;
    balance.innerText = `₹${income - expense}`;
}

// Local storage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Initialize app
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();
