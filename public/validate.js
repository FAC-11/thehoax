// validation of user input
var email = document.getElementById('email');
var password = document.getElementById('password');
var username = document.getElementById('username')
var emailError = document.getElementById('js-email-error');
var passwordError = document.getElementById('js-password-error');
var usernameError = document.getElementById('js-username-error');
var submit = document.getElementById('submit');
var valid = false;

//validating username is inputted
function validateUsername(username) {
  var regex = /^[_A-z0-9]((-|\s)[_A-z0-9])*$/g;
  if (!username.value) {
    valid = false;
    var noUsername = document.createTextNode("Please enter your username");
    return usernameError.appendChild(noUsername);
  } else if (!username.value.match(regex)) {
    var symbolsUsername = document.createTextNode("Your username should not contain any symbols");
    return usernameError.appendChild(symbolsUsername);
  } else if (username.value.length >= 100) {
    var longUsername = document.createTextNode("Your username is too long!");
    return usernameError.appendChild(longUsername);
  } else {
    valid = true;
  }
}

//  Validating email
function validateEmail(email) {
  valid = false;
  if (!email.value) {
    var noEmail = document.createTextNode("Please enter your email");
    return emailError.appendChild(noEmail);
  } else if (!email.value.includes('@tinfoild.com')) {
    valid = false;
    var badEmail = document.createTextNode("This email doesn't exist");
    return emailError.appendChild(badEmail);
  } else if (email.value.length >= 100) {
    var longEmail = document.createTextNode("Your email is too long!");
    return usernameError.appendChild(longEmail);
  } else {
    valid = true;
  }
}

// validating password in put
function validatePassword(password) {
  var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.[\W]).{8,}$/;
  if (!password.value) {
    valid = false;
    var noPassword = document.createTextNode("Please enter your password")
    return passwordError.appendChild(noPassword);
  } else if (password.value.length < 14) {
    valid = false;
    var shortPassword = document.createTextNode("Your password is too short")
    return passwordError.appendChild(shortPassword);
  } else if (!password.value.match(regex)) {
    valid = false;
    var weakPassword = document.createTextNode("Your password needs at least one uppercase, one symbol and one number!")
    return passwordError.appendChild(weakPassword);
  } else if (password.value.length >= 100) {
    var longPassword = document.createTextNode("Your password is too long!");
    return usernameError.appendChild(longPassword);
  } else {
    valid = true;
  }
}

username.addEventListener('blur', function(e) {
  e.preventDefault();
  while (usernameError.firstChild) {
    usernameError.removeChild(usernameError.firstChild);
  }
  validateUsername(username);
})

email.addEventListener('blur', function(e) {
  e.preventDefault();
  while (emailError.firstChild) {
    emailError.removeChild(emailError.firstChild);
  }
  validateEmail(email);
})

password.addEventListener('blur', function(e) {
  e.preventDefault();
  while (passwordError.firstChild) {
    passwordError.removeChild(passwordError.firstChild);
  }
  validatePassword(password);
})

submit.addEventListener('click', function(e) {
  if (!valid) {
    e.preventDefault();
  }
})
