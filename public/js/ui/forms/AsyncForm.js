class AsyncForm {

  constructor(element) {
    if (!element) throw new Error('Элемент не найден');

    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submit();
    });
  }

  getData() {
    const object = {};
    const data = new FormData(this.element);
    const entries = data.entries();

    for (let item of entries) {
      object[item[0]] = item[1];
    }

    return object;
  }

  onSubmit(options){

  }

  submit() {
    this.onSubmit(this.getData());
  }
}