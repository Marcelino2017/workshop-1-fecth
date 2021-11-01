/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

//console.log('Happy hacking :)')
const baseUrl = "https://platzi-avo.vercel.app";

const appNode = document.querySelector("#app");

appNode.addEventListener('click', (event) => {
    if (event.target.nodeName) {
        window.alert('Hola');
    }
});

// Intl (formato de intarnacionalización)
//formato a fecha  y moneda
const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat('en-En', {
        style: 'currency',
        currency: 'USD',
    }).format(price);

    return newPrice;
}

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
        imagen.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"
        
        //crear titulo
        const title = document.createElement('h2');
        title.textContent = item.name;
        //title.style.fontSize = "3rem"
        //segunda opcion 
        title.className = 'text-lg'
        

        //crear price
        const price = document.createElement('div');
        price.className = "text-gray-600";
        price.textContent = formatPrice(item.price);

        const container = document.createElement('div');
        container.append(imagen, title, price);
        container.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300";  

        todosLosItem.push(container)
        
    });

    appNode.append(...todosLosItem);
    appNode.className = "mt-10 grid  grid-cols-2 gap-2"
})