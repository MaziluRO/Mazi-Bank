'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Andrei Mazilu',
  //movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  movements: [{name: "Matei Ciprian Mazilu", value: 2000}, {name: "Manu Travel & Fun", value: -550}, {name: "Gabriela Mazilu", value: 300}, {name: "Dan Nicolae Mazilu", value: -400}, {name: "Udemy", value: -200}],
  interestRate: 1.2, // %
  pin: 1234,
};

const account2 = {
  owner: 'Matei Ciprian Mazilu',
  //movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  movements: [{name: "Mazi Bank", value: 2000}, {name: "Manu Travel & Fun", value: -550}, {name: "Gabriela Mazilu", value: 300}, {name: "Dan Nicolae Mazilu", value: 200}],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Sandra Ganea',
  movements: [{name: "Claudia Ganea", value: 1180}, {name: "Manu Travel & Fun", value: -250}, {name: "Denisa Hertanu", value: -300}, {name: "Andrei Mazilu", value: 400}, {name: "Udemy", value: -100}, {name: "Claudia Ganea", value: 500}, {name: "Manu Travel & Fun", value: 500}],
  interestRate: 0.7,
  pin: 1234,
};

const account4 = {
  owner: 'Claudia Ganea',
  movements: [{name: "Mazi Bank", value: 1180}, {name: "Manu Travel & Fun", value: -250}, {name: "Denisa Hertanu", value: 500}, {name: "Andrei Mazilu", value: -400}, {name: "Udemy", value: -100}, {name: "Sandra Ganea", value: 1500}, {name: "Manu Travel & Fun", value: -500}],
  interestRate: 1,
  pin: 1234,
};

const account5 = {
  owner: 'Denisa Hertanu',
  movements: [{name: "Sandra Ganea", value: -200}, {name: "Manu Travel & Fun", value: 1250}, {name: "Claudia Ganea", value: 300}, {name: "Andrei Mazilu", value: -400}, {name: "Udemy", value: -100}, {name: "Claudia Ganea", value: 500}, {name: "Manu Travel & Fun", value: 500}],
  interestRate: 1,
  pin: 1234,
};

const account6 = {
  owner: 'Manu Travel & Fun',
  movements: [{name: "Claudia Ganea", value: 1180}, {name: "Manu Travel & Fun", value: -250}, {name: "Denisa Hertanu", value: 300}, {name: "Andrei Mazilu", value: -400}, {name: "Udemy", value: -100}, {name: "Claudia Ganea", value: 500}, {name: "Manu Travel & Fun", value: 500}],
  interestRate: 1,
  pin: 1234,
};

const account7 = {
  owner: 'Mazi Bank',
  movements: [{name: "Sandra Ganea", value: -200}, {name: "Manu Travel & Fun", value: 1250}, {name: "Claudia Ganea", value: 300}, {name: "Andrei Mazilu", value: -400}, {name: "Udemy", value: -100}, {name: "Claudia Ganea", value: 500}, {name: "Manu Travel & Fun", value: 500}],
  interestRate: 1,
  pin: 1234,
};

const account8 = {
  owner: 'Udemy',
  movements: [{name: "Sandra Ganea", value: -200}, {name: "Manu Travel & Fun", value: 1250}, {name: "Claudia Ganea", value: 300}, {name: "Andrei Mazilu", value: -400}, {name: "Udemy", value: -100}, {name: "Claudia Ganea", value: 500}, {name: "Manu Travel & Fun", value: 500}],
  interestRate: 1,
  pin: 1234,
};

const accounts = [account1, account2, account3, account4, account5, account6, account7, account8];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//create usernames of all accounts
const createAccountUsername = function(accountArr) {
  accountArr.forEach(function(account) {
    account.username = account.owner.toLowerCase().split(" ").map(name => name[0]).join("");
  });
}

createAccountUsername(accounts);


let currentAccount;
let sorted = false;

/*
let logOut = false;

var timeMinutes = 0.2;
var timer = 60*timeMinutes;
*/
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;

labelDate.innerHTML = today;






//displays the movements of the current account
const displayMovements = function(account, sort = false) {
  
  containerMovements.innerHTML = "";
  //const movementsValues = account.movements.map(mov => mov.value);
  const movements = sort ? account.movements.slice().sort((a,b) => a.value-b.value) : account.movements;

  movements.forEach(function(movement) {
    const type = movement.value > 0 ? "deposit" : "withdrawal";
    const senderType = movement.value > 0 ? "received from" : "sent to";
    const html = `
    <div class = "movements__row">
      <div class = "movements__type
      movements__type--${type}"> ${senderType}</div>
      <div class="movements__receiver">${movement.name}</div>
      <div class = "movements__value">${movement.value}€</div>
    </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });

  btnSort.innerHTML = sort ? "&downarrow; SORT" : "&uparrow; SORT";
}

const displayBalance = function(account) {
  const inBalance = account.movements.filter(movement => movement.value > 0).map(movement => movement.value).reduce((acc, current) => acc + current);
  labelSumIn.textContent = `${inBalance}€`;
  

  const outBalance = account.movements.filter(movement => movement.value < 0).map(movement => movement.value).reduce((acc, current) => acc + current);
  labelSumOut.textContent = `${Math.abs(outBalance)}€`;
  

  //const interestBalance = account.movements.filter(movement => movement > 0).map(deposit => (deposit * account.interestRate) / 100).reduce((acc, current) => acc + current);
  const interestBalance = account.movements.filter(movement => movement.value > 0).map(movement => movement.value).map(function(deposit) {
    
    return (deposit * account.interestRate) / 100;
  }).reduce(function(acc, current) {
    
    return acc + current;
  }, 0);


  labelSumInterest.textContent = `${(Math.round(interestBalance * 100) / 100).toFixed(2)}€`;
  
  const totalBalance = inBalance + outBalance;
  account.balance = totalBalance;
  labelBalance.textContent = `${totalBalance}€`;
}

//updates the user interface
const updateUI = function(account) {
  //displayGreetings(account);
    displayMovements(account);
    displayBalance(account);
}



//event handlers

//Log in button
btnLogin.addEventListener("click", function(e) {
  e.preventDefault();
  if(labelWelcome.textContent === "Mazi Bank") {
    currentAccount = accounts.find(account => account.username === inputLoginUsername.value)
    if(currentAccount?.pin === Number(inputLoginPin.value)) {

      labelWelcome.textContent = `Welcome, ${
        currentAccount.owner.split(' ')[0]
      }`;

       

      containerApp.style.opacity = 1;
      console.log(currentAccount);
      inputLoginUsername.value = inputLoginPin.value = "";
      inputLoginPin.blur();
      
      updateUI(currentAccount);
    
    //starts the 5 minute countdown
    
      btnLogin.textContent = "Log Out";
    }
  }

  else {
    containerApp.style.opacity = 0;
    btnLogin.textContent = "Log In";
    labelWelcome.textContent = "Mazi Bank";
  }
  

  
  



});

//transfer button
btnTransfer.addEventListener("click", function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(account => account.username === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = "";
  
  if(amount > 0 && currentAccount.balance >= amount && receiverAccount?.username !== currentAccount.username) {

    //doing the transfer
    currentAccount.movements.push({name:`${receiverAccount.owner}` ,value: -amount});
    receiverAccount.movements.push({name:`${currentAccount.owner}` ,value: amount});

    //update the user interface
    updateUI(currentAccount);
  }
});



//close account button
btnClose.addEventListener("click", function(e) {
  e.preventDefault();

  const closeAccount = accounts.find(account => account.username === inputCloseUsername.value);
  const closePin = accounts.find(account => account.pin === Number(inputClosePin.value));

  console.log(closeAccount.username);
  console.log(inputClosePin.value);
  console.log(closePin);

  if(closeAccount && closePin) {
    console.log(`Account ${closeAccount.username} with the pin ${closePin.pin} has been deleted`);
    const index = accounts.findIndex(account => account.username === currentAccount.username);
    
    //delete account
    accounts.splice(index, 1);
    inputCloseUsername.value = inputClosePin.value = "";

    //hide UI
    containerApp.style.opacity = 0;
  }
  else {
    console.log("we couldn't find the account");
  }
});

//request a loan
btnLoan.addEventListener("click", function(e) {
  e.preventDefault();
  const loanAmount =  Number(inputLoanAmount.value);

  if(loanAmount > 0 && currentAccount.movements.some(movement => movement.value >= loanAmount * 0.1)) {

    //add movement
    currentAccount.movements.push({name:"Mazi Bank", value: loanAmount});
    console.log(currentAccount);

    //update UI
    updateUI(currentAccount);
  }

  inputLoanAmount.value = "";
});

//sort button

btnSort.addEventListener("click", function(e) {
  e.preventDefault();
  sorted = !sorted;
  displayMovements(currentAccount, sorted);
});








/*


function startTimer() {
    var minutes, seconds;
    var startCountdown = setInterval(function () {
        console.log(timer);
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        labelTimer.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            console.log("Kaboom");
            clearInterval(startCountdown);
        }
    }, 1000);
}

function resetTimer() {
  timer = 60 * timeMinutes;
}



function myFn() {console.log('idle');}

var myTimer = setInterval(myFn, 4000);

*/