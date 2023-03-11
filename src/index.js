// classi 
// campo
class GameField {
  constructor() {
    this.width = 16;
    this.height = 22;
    this.root = document.getElementById("field-container");
    this.nextPiece = document.getElementById("next-piece-container");
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

  // metodo per generare il display per mostrare il prossimo pezzo
  generateNextMoveField() {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const pixel = document.createElement('div');
        pixel.setAttribute('id', `${i}-${j}`);
        pixel.setAttribute('class', 'next-piece-container-pixel');

        this.nextPiece.appendChild(pixel);
      }
    }
  }

  // metodo per creare un pezzo random
  // 0: lungo azzurro
  // 1: l sinistra blue
  // 2: l destra arancione
  // 3: quadrato giallo
  // 4: z verde
  // 5: t viola
  // 6: z contraria rossa
  createNextPiece() {
    const number = Math.round(Math.random() * 6);
    let piece = null;
    
    switch(number) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        break;
    }

    return piece;
  }

  // metodo per aggiungere un pezzo
  addPiece() {
    const piece = this.createNextPiece();
    
  }
}


window.addEventListener("load", () => {
  const field = new GameField();
  field.generateField();
  field.generateNextMoveField();
});