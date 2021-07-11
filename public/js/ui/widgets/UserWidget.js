class UserWidget {
  constructor(element){
    if (!element) throw new Error('Элемент не найден');

    this.element = element;
  }

  update(){
    const userData = document.querySelector('.user-name');
    
    if (User.current()) userData.textContent = User.current().name;
  }
}
