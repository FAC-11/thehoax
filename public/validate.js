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
  if (!username.value) {
    valid = false;
    var noUsername = document.createTextNode("Please enter your username");
    return usernameError.appendChild(noUsername);
    valid = false;
  } else if (typeof usernmae !== 'string') {
    var notStringUsername = document.createTextNode("Please enter valid username");
    return usernameError.appendChild(notStringUsername);
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
  } else if (typeof email !== 'string') {
      valid = false;
    var notStringEmail = document.createTextNode("Please enter valid email");
    return emailError.appendChild(notStringEmail);
  } else if (!email.value.includes('@tinfoild.com')) {
      valid = false;
    console.log(!email.value.includes('@tinfoild.com'));
    var badEmail = document.createTextNode("This email doesn't exist");
    return emailError.appendChild(badEmail);
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
  } else if (typeof password !== 'string') {
    valid = false;
    var notStringpassword = document.createTextNode("Please enter valid password");
    return passwordError.appendChild(notStringPassword);
  } else if (password.value.length < 14) {
    valid = false;
    var shortPassword = document.createTextNode("Your password is too short")
    return passwordError.appendChild(shortPassword);
  } else if (!password.value.match(regex)) {
    valid = false;
    var weakPassword = document.createTextNode("Your password needs at least one uppercase, one symbol and one number!")
    return passwordError.appendChild(weakPassword);
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
if(!valid){
  e.preventDefault();
}
})
