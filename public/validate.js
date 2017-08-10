// validation of user input
var email = document.getElementById('email');
var password = document.getElementById('password');
var username = document.getElementById('username')
var emailError = document.getElementById('js-email-error');
var passwordError = document.getElementById('js-password-error');
var usernameError =document.getElementById('js-username-error');


//validating username is inputted
function validateUsername(username){
  if(!username.value){
    var noUsername = document.createTextNode("Please enter your username");
    return usernameError.appendChild(noUsername);
  }
}

//  Validating email
function validateEmail(email) {
  if (!email.value) {
    var noEmail = document.createTextNode("Please enter your email");
    return emailError.appendChild(noEmail);
  }
   else if (!email.value.includes('@tinfoild.com')) {
      console.log(!email.value.includes('@tinfoild.com'));
    var badEmail = document.createTextNode("This email doesn't exist");
    return emailError.appendChild(badEmail);
  }
}

function validatePassword(password) {
  var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.[\W]).{8,}$/;
  if (!password.value) {
    var noPassword = document.createTextNode("Please enter your password")
    return passwordError.appendChild(noPassword);
  } else if (password.value.length < 14) {
    var shortPassword = document.createTextNode("Your password is too short")
    return passwordError.appendChild(shortPassword);
  } else if (!password.value.match(regex)) {
    var weakPassword = document.createTextNode("Your password needs at least one uppercase, one symbol and one number!")
    return passwordError.appendChild(weakPassword);
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
