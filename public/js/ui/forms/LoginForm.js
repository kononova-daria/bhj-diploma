class LoginForm extends AsyncForm {
  onSubmit(data) {
  	User.login(data, (err, response) => {
  	  if (response && response.success) {
  	  	const enteredData = this.element.getElementsByClassName('form-control');
        for (let i = 0; i < enteredData.length; i++) {
          enteredData.item(i).value = '';
        }

        App.setState('user-logged');
        App.getModal('login').close();
      }
    });
  }
}