
const userData = JSON.parse(localStorage.getItem("user_data"));

if (userData) {
    const usernameElement = document.getElementById("username");
    const emailElement = document.getElementById("email");
    usernameElement.textContent = userData.name;
    emailElement.textContent = userData.email;
}

  //  logout.............

    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "index.html";
    });

// Get account balance element
const accountBalanceElement = document.getElementById("accountBalance");

// Withdraw.........
const withdrawButton = document.getElementById("withdrawButton");
const withdrawModal = document.getElementById("withdrawModal");
const withdrawModalClose = document.getElementById("withdrawModalClose");

withdrawButton.addEventListener("click", () => {
    withdrawModal.style.display = "block";
});

withdrawModalClose.addEventListener("click", () => {
    withdrawModal.style.display = "none";
});

// Withdraw Modal............
const confirmWithdrawButton = document.getElementById("confirmWithdrawButton");
const withdrawAmountInput = document.getElementById("withdrawAmount");

const depositButton = document.getElementById("depositButton");
const depositModal = document.getElementById("depositModal");
const depositModalClose = document.getElementById("depositModalClose");

//  Withdraw button
withdrawButton.addEventListener("click", () => {
    withdrawModal.style.display = "block";
});

//  Confirm Withdraw button
confirmWithdrawButton.addEventListener("click", () => {
    const amount = parseFloat(withdrawAmountInput.value);
    if (!isNaN(amount) && amount > 0) {
        if (updateAccountBalance(-amount)) {
            withdrawModal.style.display = "none";
            withdrawAmountInput.value = ""; // Clear input field
        }
    }
});

// Close modals when clicking on the close button
withdrawModalClose.addEventListener("click", () => {
    withdrawModal.style.display = "none";
});


// Depossit..............
depositButton.addEventListener("click", () => {
    depositModal.style.display = "block";
});

depositModalClose.addEventListener("click", () => {
    depositModal.style.display = "none";
});

// Deposit Modal..........
const confirmDepositButton = document.getElementById("confirmDepositButton");
const depositAmountInput = document.getElementById("depositAmount");

// Deposit button
depositButton.addEventListener("click", () => {
    depositModal.style.display = "block";
});


// Confirm Deposit button
confirmDepositButton.addEventListener("click", () => {
    const amount = parseFloat(depositAmountInput.value);
    if (!isNaN(amount) && amount > 0) {
        updateAccountBalance(amount);
        depositModal.style.display = "none";
    }
});

// Close modals when clicking on the close button
depositModalClose.addEventListener("click", () => {
    depositModal.style.display = "none";
});



// Closes clicking outside the modal content
window.addEventListener("click", (event) => {
    if (event.target === withdrawModal) {
        withdrawModal.style.display = "none";
    }
    if (event.target === depositModal) {
        depositModal.style.display = "none";
    }
});

// update account balance
function updateAccountBalance(amount) {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    const currentBalance = parseFloat(userData.balance);

    if (currentBalance + amount < 0) {
        alert("Insufficient balance.");
        return false;
    }

    userData.balance = (currentBalance + amount).toFixed(2);
    localStorage.setItem("user_data", JSON.stringify(userData));
    accountBalanceElement.innerText = userData.balance;

    return true;
}

// Initialize account balance on page load
document.addEventListener("DOMContentLoaded", () => {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    if (userData) {
        accountBalanceElement.innerText = userData.balance;
    }
});














