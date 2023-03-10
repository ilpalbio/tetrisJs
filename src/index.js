// classi 
// campo
class GameField {
  static leftEnd = 1;
  static rightEnd = 2;
  static maxPiece = 2;

  constructor() {
    this.root = document.getElementById("field-container");
    this.nextPieceContainer = document.getElementById("next-piece-container");

    // this.startLeft = 175;
    // this.startTop = 1;

    // dimensioni
    this.rootWidth = +getComputedStyle(this.root).width.replace('px', '');
    this.rootHeight = +getComputedStyle(this.root).height.replace('px', '');

    // array contenente nel indice 0 il pezzo che sta scendendo e nell 1 il prossimo
    this.pieceArray = new Array(2);
    
    // impostazioni sul gioco
    this.fallSpeed = 25;
    this.movementRange = 25;
  }

  // metodo per definire tutti i block custom
  defineCustomBlocks() {
    // const customElements = new CustomElementRegistry();

    // customElements.define(
    //   SingleBlock.name,
    //   SingleBlock,
    //   {extends: "div"}
    //   );

      customElements.define(
        LongPiece.name,
        LongPiece,
        {extends: "div"}
      );

      customElements.define(
        SquarePiece.name,
        SquarePiece,
        {extends: "div"},
      );

      customElements.define(
        TwoBlockPiece.name,
        TwoBlockPiece,
        {extends: "div"}
      );
  }

  // metodo per far cominciare il gioco
  startGame() {
    //console.log(getComputedStyle(this.root).top.replace("px", ""));
    // generazione del primo pezzo
    // console.log(this.createRandomPiece());
    // const firstPiece = document.createElement(LongPiece.name);
    this.addPiece(this.createRandomPiece());
    // this.setInRoot(firstPiece);

    // generazione del prossimo pezzo
    // const nextPiece = document.createElement(SquarePiece.name);
    this.addNextPiece(this.createRandomPiece());
    // this.setInNext(nextPiece);
  }

  // metodo per il continuo del gioco
  continueGame() {
    const currentPiece = this.pieceArray[0];

    // console.log(currentPiece);

    // controllo sulla posizione verticale del blocco
    if (this.isAtEnd(currentPiece)) {
      // console.log("freeze del blocco");
      // this.freeezePiece(currentPiece);
      this.createNewPiece();
      return;
    }

    this.movePieceDown(currentPiece);
  }

  // metodo per creare un pezzo random
  // 0: lungo azzurro
  // 1: quadrato giallo
  // 2: l sinistra blue
  // 3: l destra arancione
  // 4: z verde
  // 5: t viola
  // 6: z contraria rossa
  createRandomPiece() {
    const randomNumber = Math.round(Math.random() * GameField.maxPiece);
    // console.log(randomNumber);
    switch(randomNumber) {
      case 0:
        return document.createElement(LongPiece.name);
        break;
      case 1:
        return document.createElement(SquarePiece.name);
        break;

      case 2:
        return document.createElement(LLeftPiece.name);
        break;
    }
  }

  // metodo per aggiungere un pezzo al root
  addPiece(piece) {
    this.pieceArray[0] = piece;
    this.root.appendChild(piece);

    this.setInRoot(piece);
  }

  // metodo per aggiungere il pezzo al next container
  addNextPiece(nextPiece) {
    this.pieceArray[1] = nextPiece;
    //console.log(this.nextPieceContainer.firstChild);
    // rimozione del vecchio figli
    //this.nextPieceContainer.removeChild(this.nextPieceContainer.firstChild)
    this.nextPieceContainer.appendChild(nextPiece);

    this.setInNext(nextPiece);
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

  // metodo per controllare se il pezzo ?? arrivato al fondo
  isAtEnd(piece) {
    // console.log(rootHeight);
    // console.log(piece.height);
    const pieceHeight = +getComputedStyle(piece).height.replace('px','');
    if (piece.y + pieceHeight >= this.rootHeight) return true;

    return false;
  }

  // metodo per capire se ?? su un lato del container
  isAtEdge(piece) {
    const pieceWidth = +getComputedStyle(piece).width.replace('px', '');

    if (piece.x <= 0) return GameField.leftEnd;
    else if (piece.x + pieceWidth >= this.rootWidth) return GameField.rightEnd;

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
    // console.log("movimento a sinistra");

    const piece = this.pieceArray[0];

    if (this.isAtEdge(piece) === GameField.leftEnd) return;

    piece.x -= this.movementRange;
    this.refreshPiece(piece);
    // console.log(piece.x);
  }

  moveRight() {
    //console.log("movimento a destra");
    //console.log(GameField.rightEnd);

    const piece = this.pieceArray[0];

    if (this.isAtEdge(piece) === GameField.rightEnd) return;

    piece.x += this.movementRange;
    this.refreshPiece(piece);

    // console.log(piece.x);
  }

  moveDown() {
    console.log("pezzo mosso verso il basso");
  }

  // meotodo per controllare se il pezzo ha toccato qualcosa
  hasReachEnd(piece) {
    // tocco del fondo del campo
    if (this.isAtEdge(piece)) return true;

    // il blocco ?? sopra un altro
    //else if ()

    return false;
  }

  // metodo per frizzare il blocco
  // freeezePiece() {

  // }

  // metodo per creare un nuovo blocco
  createNewPiece() {
    // estrazione del blocco dal next container
    const piece = this.pieceArray[1];
    this.addPiece(piece);

    // creazione di un nuovo elemento next
    // const newNextPiece = document.createElement(SingleBlock.name);
    this.addNextPiece(this.createRandomPiece());
  }

}

// pezzi custom
class Piece extends HTMLElement {
  constructor() {
    super();

    this.x = 0;
    this.y = 0;
  }
}

class TwoBlockPiece extends Piece {
  static name = "two-block-piece";
  constructor() {
    super();

    this.width = 2;
  }

  connectedCallback() {
    if (this.isConnected) {
      for (let i = 0; i < this.width; i++) {
        this.appendChild(document.createElement("div"));
      }
    }
  }
}

// class SingleBlock extends Piece {
//   static name = 'single-block-piece';
//   constructor() {
//     super();
//   }
// }

class LongPiece extends Piece {
  static name = "long-piece";
  constructor() {
    super();

    this.width = 1;
    this.height = 4;
  }

  // metodo chiamato quando l elemento viene aggiunto al DOM
  connectedCallback() {
    if (this.isConnected) { // connesso
      // aggiunta dei figli al div
      for (let i = 0; i < this.height; i++) {
        const pixel = document.createElement("div");
        // pixel.setAttribute("class", "pixel");

        this.appendChild(pixel);
      }
    }
  }
}

class SquarePiece extends Piece {
  static name = "square-piece";
  constructor() {
    super();

    this.width = 2;
    this.height = 2;
  }

  connectedCallback() {
    if (this.isConnected) {
      for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < this.width; j++) {
          this.appendChild(document.createElement("div"));
        }
      }
    }
  }
}

class LLeftPiece extends Piece {
  static name = "l-left-piece";
  constructor() {
    super();

    this.height = 2;
    this.color = (86, 86, 167);
  }

  connectedCallback() {
    if (this.isConnected) {
      const topPiece = document.createElement(TwoBlockPiece.name);
      topPiece.style.backgroundColor = this.color;

      this.appendChild(topPiece);

      for (let i = 0; i < this.height; i++) {
        const singlePiece = document.createElement("div");
        singlePiece.style.backgroundColor = this.color;
        
        this.appendChild(singlePiece);
      }

    }
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