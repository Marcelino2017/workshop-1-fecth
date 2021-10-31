/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

//console.log('Happy hacking :)')
const url = "https://platzi-avo.vercel.app/api/avo";

//web api
//conectar al serve
window.fetch(url)
//Procesar a respuesta, y convertirla en JSON
.then((repuesta) => repuesta.json())
//JSON -> data -> Renderizarla en JSON
.then((resposeJson) => {
    const todosLosItem = [];
    resposeJson.data.forEach(item => {
        //console.log(item.name);
        //crear imagen
        const imagen = document.createElement('img');
        
        //crear titulo
        const title = document.createElement('h2');

        //crear price
        const price = document.createElement('div');

        const container = document.createElement('div');
        container.append(imagen, title, price);

        todosLosItem.push(container)
        
    });

    document.body.append(todosLosItem);
})