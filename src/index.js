// classi 
// campo
class GameField {
  constructor() {
    this.width = 16;
    this.height = 22;
    this.root = document.getElementById("field-container");
    this.nextPiece = document.getElementById("next-piece-container");
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

  // metodo per aggiungere un pezzo al campo
  addPiece() {
    const piece = SinglePiece.createPiece();
    // aggiunta del pezzo con cordinate cetrali al campo
    // piece.style.
    this.root.appendChild();
  }
}

// classe per pezzo singolo
class SinglePiece {
  static createPiece() {
    const piece = document.createElement("div");
    piece.setAttribute("class", "sigle-block-piece");

    return piece;
  }
}


window.addEventListener("load", () => {
  const field = new GameField();
});