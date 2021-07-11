class TransactionsWidget {
  constructor( element ) {
    if (!element) throw new Error('Элемент не найден');

    this.element = element;

    this.registerEvents();
  }

  registerEvents() {
    const buttonNewIncome = document.querySelector('.create-income-button');
    buttonNewIncome.addEventListener('click', () => {
      const form = App.getModal('newIncome');
      form.open();
    });

    const buttonNewExpense = document.querySelector('.create-expense-button');
    buttonNewExpense.addEventListener('click', () => {
      const form = App.getModal('newExpense');
      form.open();
    });
  }
}
