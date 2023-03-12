// classi 
// campo
class GameField {
  static leftEnd = 1;
  static rightEnd = 2;

  constructor() {
    this.root = document.getElementById("field-container");
    this.nextPieceContainer = document.getElementById("next-piece-container");

    // this.startLeft = 175;
    // this.startTop = 1;

    // array contenente nel indice 0 il pezzo che sta scendendo e nell 1 il prossimo
    this.pieceArray = new Array(2);
    this.fallSpeed = 25;
    this.movementRange = 25;
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

  // metodo per capire se è su un lato del container
  isAtEdge(piece) {
    const rootWidth = +getComputedStyle(this.root).width.replace('px', '');
    const pieceWidth = +getComputedStyle(piece).width.replace('px', '');

    if (piece.x <= 0) return GameField.leftEnd;
    else if (piece.x + pieceWidth >= rootWidth) return GameField.rightEnd;

    return 0;
  }

  // metodo per aggiungere i comandi
  addCommand() {
    window.addEventListener('keyup', (ev) => {
      if (ev.repeat) return;
      switch(ev.key) {
        case "a":
          this.moveLeft()
          break;

        case "d":
          this.moveRight();
          break;

        case "s":
          this.moveDown();
          break;
      }
    })
  }

  // metodi per i comandi
  moveLeft() {
    console.log("movimento a sinistra");

    const piece = this.pieceArray[0];

    if (this.isAtEdge(piece) === GameField.leftEnd) return;

    piece.x -= this.movementRange;
    this.refreshPiece(piece);
    console.log(piece.x);
  }

  moveRight() {
    console.log("movimento a destra");
    console.log(GameField.rightEnd);

    const piece = this.pieceArray[0];

    if (this.isAtEdge(piece) === GameField.rightEnd) return;

    piece.x += this.movementRange;
    this.refreshPiece(piece);

    console.log(piece.x);
  }

  moveDown() {
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

  // comandi
  field.addCommand();

  // inizio della discesa del pezzo
  window.setInterval(function() {field.continueGame()}, 1000);
});