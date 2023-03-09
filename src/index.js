// classi 
// campo
class GameField {
  constructor() {
    this.width = 16;
    this.height = 22;
    this.root = document.getElementById("field-container");
  }

  generateField() {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        const pixel = document.createElement('div');
        pixel.setAttribute('id', `${i}-${j}`);
        pixel.setAttribute('class', 'root-pixel');

        this.root.appendChild(pixel);
      }
    }
  }
}


window.addEventListener("load", () => {
  const field = new GameField();
  field.generateField();
});