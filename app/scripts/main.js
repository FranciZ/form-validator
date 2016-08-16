

var formValidator = new FormValidator('.container');

$('.submit-button').on('click', function(){

  const isValid = formValidator.validate();

  if(isValid){
    alert('Form is valid');
  }else{
    alert('Form is invalid');
  }

});