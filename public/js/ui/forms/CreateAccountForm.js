class CreateAccountForm extends AsyncForm {
  onSubmit(data) {
  Account.create(data, (err, response) => {
      if (response.success) {
      	this.element.querySelector('.form-control').value = '';
        App.getModal('createAccount').close();
        App.update();
      }
    });
  }
}