class Sidebar {
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  static initToggleButton() {
    const button = document.querySelector('.sidebar-toggle');
    const body = document.querySelector('body');

    button.addEventListener('click', () => {
      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');
    });
  }

  static initAuthLinks() {
    const registration = document.querySelector('.menu-item_register');
    registration.addEventListener('click', () => {
      const form = App.getModal('register');
      form.open();
    });

    const entrance = document.querySelector('.menu-item_login');
    entrance.addEventListener('click', () => {
      const form = App.getModal('login');
      form.open();
    });

    const exit = document.querySelector('.menu-item_logout');
    exit.addEventListener('click', () => {
      User.logout(User.current(), (err, response) => {
        if (response.success) {
          User.unsetCurrent();
          App.setState('init');
        }
      });
    });
  }
}