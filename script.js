let signUpbtn = document.getElementById("signUpbtn");
let signInbtn = document.getElementById("signInbtn");
let title = document.getElementById("title");
let namefeild = document.getElementById("namefeild");
let form = document.getElementById("form");
let btnfeild = document.getElementById("btnfeild");
let Accountfeild = document.getElementById("Accountfeild");
let CNICfeild = document.getElementById("CNICfeild");
let getaccount = document.getElementById("getaccount");

getaccount.addEventListener("click", (event) => {
  event.preventDefault();
});

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const nameInput = document.getElementById("Name");
const accountNoInput = document.getElementById("Account-No");
const cnicInput = document.getElementById("CNIC");

// sign-in.........//

signInbtn.onclick = () => {
  title.innerText = "Sign-In";
  form.style.height = "auto";
  form.style.transition = "0.4s all ease";
  form.style.marginTop = "150px";
  btnfeild.style.marginTop = "-90px";
  namefeild.style.maxHeight = "0";
  Accountfeild.style.maxHeight = "0";
  CNICfeild.style.maxHeight = "0";
  signUpbtn.classList.add("disabled");
  signInbtn.classList.remove("disabled");
  getaccount.innerText = "Forgot Password? Click here!";

  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    return;
  }

  // user exists in local storage

  const existingUserData = JSON.parse(localStorage.getItem("user_data"));
  if (!existingUserData) {
    alert("User does not exist. Please sign up to create an account.");
    return;
  }

  //  entered email and password match the stored data

  if (
    existingUserData.email === email &&
    existingUserData.password === password
  ) {
    window.location.href = "portal.html";
  } else {
    alert("Incorrect credentials. Please check your email and password.");
  }
};

// user exists in local storage based on email or password

function checkUserExists(email, password) {
  const existingUserData = JSON.parse(localStorage.getItem("user_data"));
  if (!existingUserData) {
    return false;
  }

  if (
    existingUserData.email === email ||
    existingUserData.password === password
  ) {
    return true;
  }

  return false;
}

//  validate CNIC format

function isValidCNIC(cnic) {
  const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
  return cnicRegex.test(cnic);
}

//  validate account number format

function isValidAccountNumber(accountNo) {
  const accountNoRegex = /^\d{14}$/;
  return accountNoRegex.test(accountNo);
}

// sign-Up............//

signUpbtn.onclick = () => {
  title.innerText = "Sign-Up";
  form.style.height = "auto";
  form.style.transition = "height 0s ease";
  form.style.marginTop = "50px";
  btnfeild.style.marginTop = "0px";
  namefeild.style.maxHeight = "65px";
  Accountfeild.style.maxHeight = "65px";
  CNICfeild.style.maxHeight = "65px";
  signInbtn.classList.add("disabled");
  signUpbtn.classList.remove("disabled");

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const name = nameInput.value.trim();
  const accountNo = accountNoInput.value.trim();
  const cnic = cnicInput.value.trim();

  if (!email || !password || !name || !accountNo || !cnic) {
    getaccount.innerText = "Please fill in all fields.";
    return;
  }

  //  validate CNIC format

  if (!isValidCNIC(cnic)) {
    alert("Please enter a valid CNIC in the format: 12345-6789012-3");
    return;
  }

  //  validate account number format

  if (!isValidAccountNumber(accountNo)) {
    alert("Please enter a valid account number with 14 digits.");
    return;
  }

  //Existing User conformation

  if (checkUserExists(email, password) || checkUserExistsByCNIC(cnic)) {
    alert("User with the provided email or CNIC already exists.");
    return;
  }

  const userData = {
    email: email,
    password: password,
    name: name,
    accountNo: accountNo,
    cnic: cnic,
    balance: 0,
  };
  localStorage.setItem("user_data", JSON.stringify(userData));
  window.location.href = "portal.html";
};

//  user exists in local storage based on CNIC

function checkUserExistsByCNIC(cnic) {
  const existingUserData = JSON.parse(localStorage.getItem("user_data"));
  if (!existingUserData) {
    return false;
  }

  if (existingUserData.cnic === cnic) {
    return true;
  }

  return false;
}



      
      

      
