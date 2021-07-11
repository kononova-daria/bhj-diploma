class AccountsWidget {
  constructor(element) {
    if (!element) throw new Error('Элемент не найден');

    this.element = element;

    this.registerEvents();
    this.update();
  }

  registerEvents() {
    const buttonNewAccount = document.querySelector('.create-account');
    buttonNewAccount.addEventListener('click', () => {
      const form = App.getModal('createAccount');
      form.open();
    });

    this.element.addEventListener('click', (event) => {
      if (event.target.closest('.account')) this.onSelectAccount(event.target.closest('.account'));
    });
  }

  update() {
    if (User.current()) {
      Account.list(User.current(), (err, response) => {
        if (response && response.success) {
          this.clear();
          response.data.forEach((item) => this.renderItem(item));
        }
      });
    }
  }

  clear() {
    const existingAccounts = document.querySelectorAll('li.account');
    if (existingAccounts.length > 0) {
      for (let i = 0; i < existingAccounts.length; i++) {
        existingAccounts.item(i).remove();
      }
    }
  }

  onSelectAccount(element) {
    const previouslySelected = this.element.querySelector('.active');

    if (previouslySelected) previouslySelected.classList.remove('active');
    element.classList.add('active');

    App.showPage( 'transactions', {account_id: element.dataset.id});
  }

  getAccountHTML(item){
    return `<li class="account" data-id="${item.id}">
              <a href="#">
                <span>${item.name}</span> /
                <span>${item.sum} ₽</span>
              </a>
            </li>`
  }

  renderItem(data){
    let accounts = document.querySelector('.accounts-panel');
    accounts.insertAdjacentHTML('beforeEnd', this.getAccountHTML(data));
  }
}
