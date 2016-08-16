(function($, validator){

  class FormValidator{

    constructor(container){

      this.$container = $(container);

    }

    displayError(error, element){

      this.clearError(element);

      const $errorMessage = $('<p>', { text:error, class:'error-message' });
      $(element).append($errorMessage);

    }

    clearError(element){

      $(element).find('.error-message').remove();

    }

    validate(){

      const $inputs = this.$container.find('input');
      let hasError = false;

      // loop through all the input fields
      for(var i=0;i<$inputs.length;i++){

        let error = null;

        const $input = $($inputs[i]);

        // get input field value
        const value = $input.val();
        // get input field type
        const type = $input.attr('type');
        const errorMessage = $input.attr('error-message');

        switch(type){
          case 'email':
            if(!validator.isEmail(value)){
              error = {
                type:type,
                value:value
              };
            }
            break;
          case 'password':
            if(!validator.isLength(value, {min:8})){
              error = {
                type:type,
                value:value
              };
            }
            break;
          case 'tel':
            if(!validator.isMobilePhone(value,'cs-CZ')){
              error = {
                type:type,
                value:value
              };
            }
            break;
          case 'date':
            if(!validator.isDate(value)){
              error = {
                type:type,
                value:value
              };
            }
            break;
        }

        if(error){
          this.displayError(errorMessage, $input.parent());
          hasError = true;
          console.log('Error: ',error);
        }else{
          this.clearError($input.parent());
        }

      }

      return !hasError;

    }

  }

  if(window.FormValidator){
    throw new Error('FormValidator already exists');
  }

  window.FormValidator = FormValidator;

})($, validator);