class CreateTransactionForm extends AsyncForm {
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  renderAccountsList() {
    const listExpense = document.getElementById('expense-accounts-list');
    const listIncome = document.getElementById('income-accounts-list');

    Account.list(User.current(), (err, response) => {
      if (response && response.success) {
        listExpense.innerHTML = '';
        listIncome.innerHTML = '';

        response.data.forEach((item) => {
          listExpense.insertAdjacentHTML('beforeEnd', `<option value="${item.id}">${item.name}</option>`);
          listIncome.insertAdjacentHTML('beforeEnd', `<option value="${item.id}">${item.name}</option>`);
        });
      }
    });
  }

  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response && response.success) {
        App.update();

        const enteredData = this.element.getElementsByClassName('form-control');
        for (let i = 0; i < enteredData.length; i++) {
          enteredData.item(i).value = '';
        }

        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
      }
    });
  }
}