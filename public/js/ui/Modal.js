class Modal {
  constructor(element){
    if (!element) throw new Error('Элемент не найден');

    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    const button = this.element.getElementsByTagName('button');

    for (let i = 0; i < button.length; i++) {
      if (button.item(i).dataset.dismiss === 'modal') {
        button.item(i).addEventListener('click', (e) => this.onClose(e));
      }
    }
  }

  onClose(e) {
    e.preventDefault();
    this.close();
  }

  open() {
    this.element.style.display = 'block';
  }

  close(){
    this.element.style.display = 'none';
  }
}