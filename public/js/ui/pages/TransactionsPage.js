class TransactionsPage {
  constructor(element) {
    if (!element) throw new Error('Элемент не найден');

    this.element = element;

    this.registerEvents();
  }

  update() {
    if (this.lastOptions) {
      this.render(this.lastOptions);
    } else {
      this.render();
    }
  }

  registerEvents() {
    const buttonDeletingAccount = document.querySelector('.remove-account');
    buttonDeletingAccount.addEventListener('click', () => this.removeAccount());

    this.element.addEventListener('click', (event) => {
      if (event.target.closest('.transaction__remove')) this.removeTransaction(event.target.closest('.transaction__remove').dataset.id);
    });
  }

  removeAccount() {
    if (this.lastOptions) {
      if (confirm('Вы действительно хотите удалить счёт?')) {
        Account.remove({id: this.lastOptions.account_id}, (err, response) => {
          if (response && response.success) {
            App.updateWidgets();
            this.clear();
          }
        });
      }
    }
  }

  removeTransaction(id) {
    if (confirm('Вы действительно хотите удалить эту транзакцию?')) {
      Transaction.remove({id: id}, (err, response) => {
        if (response && response.success) {
          App.update();
        }
      });
    }
  }

  render(options){
    if (options) {
      this.lastOptions = options;

      Account.get(options.account_id, (err, response) => {
        if (response && response.success) {
          this.renderTitle(response.data.name);
        }
      });

      Transaction.list(options, (err, response) => {
        if (response && response.success) {
          this.renderTransactions(response.data);
        }
      });
    }
  }

  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = null;
  }

  renderTitle(name){
    this.element.querySelector('.content-title').textContent = name;
  }

  formatDate(date){
    const optionsDate = {day: 'numeric', month: 'long', year: 'numeric'};
    const optionsTime = {hour: 'numeric', minute: 'numeric'};

    return `${new Date(date).toLocaleString('ru', optionsDate)} в ${new Date(date).toLocaleString('ru', optionsTime)}`;
  }

  getTransactionHTML(item){
    return `<div class="transaction transaction_${item.type} row">
              <div class="col-md-7 transaction__details">
                <div class="transaction__icon">
                  <span class="fa fa-money fa-2x"></span>
                </div>
                <div class="transaction__info">
                  <h4 class="transaction__title">${item.name}</h4>
                  <div class="transaction__date">${this.formatDate(item.created_at)}</div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="transaction__summ">
                  ${item.sum} <span class="currency">₽</span>
                </div>
              </div>
              <div class="col-md-2 transaction__controls">
                <button class="btn btn-danger transaction__remove" data-id="${item.id}">
                  <i class="fa fa-trash"></i>  
                </button>
              </div>
            </div>`
  }

  renderTransactions(data){
    const content = this.element.querySelector('section.content');
    content.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
      content.insertAdjacentHTML('beforeEnd', this.getTransactionHTML(data[i]));
    }
  }
}