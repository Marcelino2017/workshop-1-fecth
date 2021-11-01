/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

//console.log('Happy hacking :)')
const baseUrl = "https://platzi-avo.vercel.app";
const appNode = document.getElementById("app");

//web api
//conectar al serve
window.fetch(`${baseUrl}/api/avo`)
//Procesar a respuesta, y convertirla en JSON
.then((repuesta) => repuesta.json())
//JSON -> data -> Renderizarla en JSON
.then((resposeJson) => {
    const todosLosItem = [];
    resposeJson.data.forEach(item => {
        //console.log(item.name);
        //crear imagen
        console.log(item);
        const imagen = document.createElement('img');
        //URL de la imagen
        imagen.src = `${baseUrl}${item.image}`;
        //crear titulo
        const title = document.createElement('h2');
        title.textContent = item.name

        //crear price
        const price = document.createElement('div');
        price.textContent = item.price;

        const container = document.createElement('div');
        container.append(imagen, title, price);

        todosLosItem.push(container)
        
    });

    appNode.append(...todosLosItem);
})