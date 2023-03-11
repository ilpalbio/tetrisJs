// classi 
// campo
class GameField {
  constructor() {
    this.root = document.getElementById("field-container");
    this.nextPieceContainer = document.getElementById("next-piece-container");

    this.startLeft = 175;
    this.startTop = 1;

    // array contenente nel indice 0 il pezzo che sta scendendo e nell 1 il prossimo
    this.pieceArray = new Array(2);
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

  // metodo per creare un nuovo prossimo pezzo
  generateNextPiece() {
    const nextPiece = new SinglePiece();
    this.pieceArray[1] = nextPiece ;

    // aggiunta del pezzo al contenitore
    this.nextPieceContainer.appendChild(nextPiece);
  }

  // metodo per far cominciare il gioco
  startGame() {
    // generazione del primo pezzo
    const firstPiece = new SinglePiece();
    firstPiece.addPiece(this.root);

    this.pieceArray[0] = firstPiece;

    // generazione del prossimo pezzo
    this.generateNextPiece();

    console.log(this.pieceArray);
  }

}

// classe per pezzo singolo
class SinglePiece {
  constructor() {
    this.x = 175;
    this.y = 1;

    this.piece = document.createElement("div");
    this.piece.setAttribute("class", "piece sigle-block-piece");

    this.piece.style.left = this.x.toString() + "px";
    this.piece.style.top = this.y.toString() + "px";
  }

  addPiece(root) {
    root.appendChild(this.piece);
  }

  movePieceDown() {
    this.y += 2;
  }
}


window.addEventListener("load", () => {
  const field = new GameField();
  
  field.startGame();
  // field.addPiece();

  // inizio della discesa del pezzo
  //window.setInterval(, 3000);
});