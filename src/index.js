// generazione del campo
const WIDTH = 400;
const HEIGHT = 550;

const generateField = () => {
  const container = document.getElementById("field-container");

  for (let i = 0; i < WIDTH / 25; i++) {
    for (let j = 0; j < HEIGHT / 25; j++) {
      const pixel = document.createElement('div');
      pixel.setAttribute("id", i.toString() + " " + j.toString());
      pixel.setAttribute("class", "field-pixel");

      container.appendChild(pixel);
    }

    //container.appendChild(document.createElement("br"));
  }
}

window.addEventListener("load", () => {
  console.log("pagina caricata");
  generateField();
});