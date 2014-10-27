/* 
 Joy Zhang
  Info 343 
 Javascript Challenge - Sign Up Form
  This form will ask user for their information and submit only when the values in the fields are valid.
  */

"use strict"

var form = document.getElementById('signup');

function onReady() {

    //Load the US states in the drop down menu
    var option;
    var statesSelect = form.elements['state'];
    for (var index = 0; index < usStates.length; ++index) {
        option = document.createElement('option');
        option.innerHTML = usStates[index].name;
        option.value = usStates[index].code;
        statesSelect.appendChild(option);
    }

    document.getElementById('occupation').addEventListener('change', otherOccupation);

    document.getElementById('cancelButton').addEventListener('click', onCancel);

    document.getElementById('signup').addEventListener('submit', onSubmit);
}

//Allows users to input a custom occupation not listed in the drop down menu when "other" is selected
function otherOccupation() {
    var inputOtherOccupation = form.elements['occupationOther'];
    if (this.value == 'other') {
        inputOtherOccupation.style.display = 'block';
    } else {
        inputOtherOccupation.style.display = 'none';
    }
}

//Asks te user to confirm whether or not they want to cancel and leave the page
function onCancel() {
    if (confirm('Are you sure you want to leave the page?')) {
        window.location = 'http://google.com';
    }
}

//In order to submit the form (successfully sign up), all the fields must contain valid values
function onSubmit() {
    if (!validateForm(this)) {
        var valid = false;
        event.preventDefault();
        return valid;
    }
}

//Determines if required fields (f/l name, address, city, state & birthday) contain valid values
function validateForm(form) {
    var valid = true;

    var requiredFields = [
        form.elements['firstName'],
        form.elements['lastName'],
        form.elements['address1'],
        form.elements['city'],
        form.elements['state'],
        form.elements['birthdate']
    ];
    var zip = form.elements['zip'];

    //Displays red box around field if required value is empty
    for (var index = 0; index < requiredFields.length; ++index) {
        if (requiredFields[index].value.trim().length == 0) {
            valid = false;
            requiredFields[index].className = requiredFields[index].className + " invalid-field";
        } else {
            requiredFields[index].className = 'form-control';
        }
    }

    //Makes sure that if the occupation's select value is "other", the custom input field must have a value
    if (document.getElementById('occupation').value == 'other') {
        var inputOtherOccupation = form.elements['occupationOther'];
        if (inputOtherOccupation.value.trim().length == 0) {
            valid = false;
            inputOtherOccupation.className = inputOtherOccupation.className + ' invalid-field';
        } else {
            inputOtherOccupation.className = 'form-control';
        }
    }

    //Checks if the zip code is 5 numbers long and prohibits sign-up if zip is invalid
    var zipRegExp = new RegExp('^\\d{5}$');
    if (!zipRegExp.test(zip.value.trim())) {
        valid = false;
        zip.className = zip.className + ' invalid-field';
    } else {
        zip.className = 'form-control';
    }

    //Checks if user is at least 13 years old and prohibits sign-up if they are younger than 13
    if (birthdate.value.trim().length == 0) {
        birthdate.className = birthdate.className + ' invalid-field';
    } else {
        var birthday = new Date(birthdate.value);
        var today = new Date();
        if (today.getUTCFullYear() - birthday.getUTCFullYear() >= 13) {
            document.getElementById('birthdateMessage').style.display = 'none';
        } else {
            valid = false;
            document.getElementById('birthdateMessage').innerHTML = 'Sorry, you must be at least 13 years old to sign up!';
        }
    }
    return valid;
}

document.addEventListener('DOMContentLoaded', onReady);