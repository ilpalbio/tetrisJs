// classi 
// campo
class GameField {
  constructor() {
    this.root = document.getElementById("field-container");
    this.nextPieceContainer = document.getElementById("next-piece-container");

    // this.startLeft = 175;
    // this.startTop = 1;

    // array contenente nel indice 0 il pezzo che sta scendendo e nell 1 il prossimo
    this.pieceArray = new Array(2);
    this.fallSpeed = 25;
    this.movementRange = 11;
  }

  // metodo per definire tutti i block custom
  defineCustomBlocks() {
    // const customElements = new CustomElementRegistry();

    customElements.define(
      'single-block-piece',
      SingleBlock,
      {extends: "div"}
      );
  }

  // metodo per creare un pezzo random
  // 0: lungo azzurro
  // 1: l sinistra blue
  // 2: l destra arancione
  // 3: quadrato giallo
  // 4: z verde
  // 5: t viola
  // 6: z contraria rossa

  // metodo per far cominciare il gioco
  startGame() {
    //console.log(getComputedStyle(this.root).top.replace("px", ""));
    // generazione del primo pezzo
    const firstPiece = document.createElement('signle-block-piece');
    this.addPiece(firstPiece);
    this.setInRoot(firstPiece);

    // generazione del prossimo pezzo
    const nextPiece = document.createElement('signle-block-piece');
    this.addNextPiece(nextPiece);
    this.setInNext(nextPiece);
  }

  // metodo per il continuo del gioco
  continueGame() {
    const currentPiece = this.pieceArray[0];
    if (this.isAtEnd(currentPiece)) {
      console.log("pezzo arrivato al fondo");
      return;
    }
    // aggiunta comandi
    this.addCommand(currentPiece);

    this.movePieceDown(currentPiece);
  }

  // metodo per aggiungere un pezzo al root
  addPiece(piece) {
    this.pieceArray[0] = piece;
    this.root.appendChild(piece);
  }

  // metodo per aggiungere il pezzo al next container
  addNextPiece(nextPiece) {
    this.pieceArray[1] = nextPiece;
    this.nextPieceContainer.appendChild(nextPiece);
  }

  // metodo per settare le coordinate giuste nel root
  setInRoot(piece) {
    piece.x = 150;
    piece.y = 0;

    this.refreshPiece(piece);
  }

  // metodo per settare le coordinate giuste nel next container
  setInNext(piece) {
    piece.x = 50;
    piece.y = 50;

    this.refreshPiece(piece);
  }

  // metodo pper refreshare il pezzo
  refreshPiece(piece) {
    piece.style.left = piece.x;
    piece.style.top = piece.y;
  }

  // metodo per muovere un pezzo verso il basso
  movePieceDown(piece) {
    piece.y += this.fallSpeed;

    this.refreshPiece(piece);
  } 

  // metodo per controllare se il pezzo è arrivato al fondo
  isAtEnd(piece) {
    const rootStyle = getComputedStyle(this.root)
    const rootHeight = +rootStyle.height.replace('px', '');
    // console.log(rootHeight);
    // console.log(piece.height);
    const pieceHeight = +getComputedStyle(piece).height.replace('px','');
    if (piece.y + pieceHeight >= rootHeight) return true;

    return false;
  }

  // metodo per aggiungere i comandi
  addCommand(piece) {
    window.addEventListener('keydown', (ev) => {
      // console.log(ev);
      switch(ev.key) {
        case "a":
          this.moveLeft(piece)
          break;

        case "d":
          this.moveRight(piece);
          break;

        case "s":
          this.moveDown(piece);
          break;
      }
    })
  }

  // metodi per i comandi
  moveLeft(piece) {
    console.log("movimento a sinistra");
    piece.x -= this.movementRange;
    this.refreshPiece(piece);
  }

  moveRight(piece) {
    console.log("movimento a destra");
    piece.x += this.movementRange;
    this.refreshPiece(piece);
  }

  moveDown(piece) {
    console.log("pezzo mosso verso il basso");
  }

}

// classe per pezzo singolo
class SingleBlock extends HTMLElement {
  constructor() {
    super();

    this.x = 0;
    this.y = 0;
  }
}


window.addEventListener("load", () => {
  const field = new GameField();
  
  field.defineCustomBlocks();

  field.startGame();

  // inizio della discesa del pezzo
  window.setInterval(function() {field.continueGame()}, 1000);
});