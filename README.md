# Básicamente tenemos 4 formas de leer nodos con JS:

+ document.getElementById(‘id’) => nos permite obtener un elemento a través de su id.

+ document.getElementsByClassName(‘class’) => obtiene un array con todos los elementos hijos que tengan esa clase, ojo “getElementByClassName” no existe, es decir no podremos obtener solo 1 elemento con esa clase.

+ document.getElementsByTagName(‘div’) => con este método obtenemos una lista o “array list” con todos los elementos que tengan esa etiqueta, ejemplo todos los divs. Al igual que con el método anterior no hay posibilidad de usarlo en singular, siempre tendremos que usar getElements

+ document.querySelector() => nos permite buscar de 3 formas, con id, clase o tagName. A diferencia de los 2 anteriores este nos devuelve 1 solo elemento, el primero que contenga el valor que se le paso. Id => (’#id’), class => (’.class’), tagName (‘div’)

+ document.querySelectorAll() => este método retorna una array list con todos los elementos que tengan ese selector (id, class o tagName)

Casi siempre el elemento “padre o parent” es document. ya que estamos haciendo referencia a todo el DOM, todo el documento y esto en ciertos casos nos permite evitar errores.
ejemplo = const button = document.querySelector(’#button)

# Diferencia entre NodeListd y Array

La diferencia entre NodeList y Array, es que el NodeList carece de métodos que si están disponibles en los Arrays, pero podemos pasar esto fácilmente usando el operador de propagación.

// De esta forma pasamos todos los elementos en el NodeList a un arreglo al cual si podremos usar los métodos filter, map, reduce entre otros. 
const nodeList = document.querySelectorAll("selector css");
//..nodeList <- esto se llama express operation
const elementList = [...nodeList];

Recomendación importante cada vez que obtengamos un NodeList pásemelo a Array ya que los motores de javascript como el motor V8 de google están mas optimizados para Arrays que para NodeList.

# Crear Nodos

+ El método document.createElement(): crea un nodo de elemento con el nombre especificado.
+ El método createTextNode () crea un nodo de texto con el texto especificado.

# Agregar Nodos

+ El método ParentNode.appendChild(): agrega un nodo como el último hijo de un nodo.
+ El método append(): inserta el contenido especificado al final de los elementos seleccionados.
+ El método insertBefore(): inserta un nodo como hijo, justo antes de un hijo existente, que usted especifica.
+ El insertAdjacentElement(): método inserta un elemento especificado en una posición especificada.

# Otra Forma de Agregar

+ node.outerHTML: Sirve para leer HTML para leer HTML
+ node.innerHTML: Sirve para escribir HTML

### PEEEEEEERO, tienen un problema de seguridad 👀☝️

+ hack: Cuando en el inspector de elementos seleccionas un elemento y en la consola escribes $0, este te devolverá el elemento tal como si lo hubieses seleccionado con document.querySelector().

+ Aquí les dejo el playground que usó el profesor para hacer las pruebas: https://codepen.io/jonalvarezz/pen/OJXeNab?editors=0110

+ El problema con estas formas de inserciones es que permiten la inserción XSS, es decir, código maligno, y cualquier usuario programador malicioso podría meter scripts molestos, imagina que cada que un usuario llegue a tu página le salga un alert… ¡Sería catastrófico! Siempre sanitiza (remover caracteres especiales) los inputs de tus usuarios

# Atributos y propiedades

### Diferencia entre  Atributos y Propiedad 
Básicamente un atributo es el estado inicial en nuestro HTML, es HTML solo podemos escribir atributos porque es el estado inicial con el que se renderizan y una propiedad es la variable que podemos cambiar a lo largo de la ejecución del programa mediante JavaScript, es decir, podemos acceder a dichos atributos y cambiarlo, haciendo que sean propiedades, aquí un poco más de información sobre ello.

+ Lo genial de JavaScript es que podemos cambiarlas de forma dinámica. Recordemos que JavaScript son en su mayoría objetos, por lo que los nodos HTML dentro de JavaScript son representados como objetos. Teniendo eso en cuenta, podemos acceder a cualquier atributo de dichos nodos desde HTML y cambiar sis propiedades, por ejemplo:

// Al seleccionar el nodo HTML, JavaScript lo convierte en un objeto!
const input = document.querySelector("input")

// Y of course, podemos modificarlo como cualquier otro objeto de JavaScript:
input.placeholder = "Escribe algo"
input.value = 2
input.type = "number"

#Eliminar Nodos

+ parentElement.removeChild: elimina un nodo hijo del DOM y puede devolver el nodo eliminado.
+ document.remove(): método elimina el elemento especificado del DOM.
+ document.replaceChild(): reemplaza un nodo hijo con un nuevo nodo. El nuevo nodo podría ser un nodo existente en el documento o puede crear un nuevo nodo.

# Intl

El Intlobjeto es el espacio de nombres de la API de internacionalización de ECMAScript, que proporciona comparación de cadenas sensible al idioma, formato de números y formato de fecha y hora. El Intlobjeto proporciona acceso a varios constructores, así como una funcionalidad común a los constructores de internacionalización y otras funciones sensibles al lenguaje.

# Eventos que sucede en el DOM

La función addEventListener() nos permite añadir eventos a nuestros elementos, la podemos usar de la siguiente manera:
```
    miElemento.addEventListener("evento", manejador)
```

En este caso, el manejador debe ser una función callback que se ejecutará cuando el evento sea disparado. Es muy común verlo como una función anónima:

``` 
    button.addEventListener("click", () => {
	    alert("Me has clickado 😄")
    })
```

Sin embargo, la mejor práctica es crear funciones por separado, así siempre tendremos una referencia a dicha función (con una función anónima no tenemos nada que la identifique, de ahí su nombre)

```
    const miFuncionManejadora = () => {
        alert("Me has clickado 😄")
    };

    button.addEventListener("click", miFuncionManejadora) // Presta atención como la estamos mandando sin paréntesis, porque de esa forma solo le pasamos la referencia de la función, si le pusieramos paréntesis entonces la estaríamos ejecutando

```
Y esto tiene la ventaja de que podemos remover los eventos cuando queramos ya que tenemos la referencia de la función manejadora 😄

``` 
    const miFuncionManejadora = () => {
        alert("Me has clickado 😄")
    };

    // Agrego el evento
    button.addEventListener("click", miFuncionManejadora)

    // Quito el evento
    button.removeEventListener("click", miFuncionManejadora)

```

También podemos definir funciones de esta otra manera 👀

``` 
    button.onClick = () => {
        alert("Me has clickado 😄")
    }
    Esta sintaxis es onEvento pero no es muy común ^^
    
    //Como dato adicional, esta es otra forma de añadir eventos desde HTML:
    
    // HTML

    <button onclick="miFuncionManejadora">Clicame</button>

    //JavaScript

    const miFuncionManejadora = () => {
        alert("Me has clickado 😄")
    };

    De esta forma, el botón, mediante un atributo estaría llamando a la función 😄
```
# Event propagation

###  Ideas/conceptos claves
Bubbling es la forma en que se propaga desde lo más bajo hasta lo más alto

+ El DOM es un arbol que renderiza nodos de forma jerárquica
++ Cuando un evento sucede se propaga a lo largo de ese nodo
+ Los eventos suceden desde el elemento más interno hacia afuera
++ Propagándose entre cada padre que tiene el elemento escuchado
+ Si deseamos borrar este comportamiento podemos usar el parámetro de evento.

```
    node.addEventListener("click", (event) => {
        event.stopPropagation()
        // Acciones ...
    }); 

```
+ Se debe tener cuidado con este tipo de operaciones por que puede existir códigos de otras personas o de librerías que necesiten este tipo de eventos.
+ Por lo general se debería dejar que los eventos fluyan por su ruta.

RESUMEN: Cuando se tiene eventos estos pueden flotar desde el más específico hasta el más grande, si se desea quitar este comportamiento se puede usar el método del parámetro del evento `event.stopPropagation()` por lo general no es necesario usar este método

# Event delegation

+ La idea principal es delegar un evento global a un solo nodo y desde esa parte poder delegar todos los eventos que sucedan
+ Se debe usar cuando el número de escuchadores es alto
+ Se trata de identificar de donde proviene el evento, según a ello se lo captura con un condicional y se procede a realizar las operaciones

RESUMEN: La técnica event delegation consiste en dejar todos los eventos sucedan en un elemento superior de tal forma que este los identifique y aplique el procedimiento con condicionales


# Snowpack Tailwind

> ✨ Bootstrapped with Create Snowpack App (CSA).

Ready-to-go template to create awesome websites using Tailwind on top of Snowpack and autopublish to GitHub pages using GitHub Actions.

- [Quick start](#quick-start)
- [Features](#features)
- [Available Scripts](#available-scripts)

## Quick start

```sh
# Bootstrap the template into a new folder called `my-app`
npx create-snowpack-app my-app --template snowpack-template-tailwind

# Enable Prettier on git-commit
cd my-app
npm run install:husky

# Start the development server
npm start
```

✨ Optional: [Enable autopublish](#q-how-do-i-enable-auto-publish-to-github-pages) to get your site deployed on GitHub Pages on every commit you push.

#### Optional install using Yarn:

```sh
# Bootstrap the template into a new folder called `my-app`
npx create-snowpack-app my-app --template snowpack-template-tailwind --use-yarn

# Enable Prettier on git-commit
cd my-app
yarn install:husky
```

## Features

- Snowpack, of course.
- Tailwind.
- Prettier.
- Force prettier on git-commit.
- Autopublish on Github Pages.

### Q: How do I enable auto publish to GitHub Pages?

1. Update the value of `homepage` in `package.json`. It should look like `https://<your-username>.github.io/<your-repo-name>` (no trailing slash).
1. Push your changes into a new GitHub repository.
1. You should see an Action running on `https://github.com/<your-username>/<repo-name>/actions`
1. Make sure to [enable GitHub pages for your repo](https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#choosing-a-publishing-source) and select the `gh-pages` branch
1. Give GH Pages some minutes, your site should be live on `https://<your-username>.github.io/<your-repo-name>`
1. Enjoy :)

### Q: How do I disable auto publish to GitHub Pages?

Remove the `.github/workflows/publish.yml` file.

### Q: How do I check my code syntax (Prettier) on git-commit?

Run `npm run install:husky`.

## Available Scripts

### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like [@snowpack/plugin-webpack](https://github.com/snowpackjs/snowpack/tree/master/plugins/plugin-webpack) or [snowpack-plugin-rollup-bundle](https://github.com/ParamagicDev/snowpack-plugin-rollup-bundle) to your `snowpack.config.json` config file.

### Q: What about Eject?

No eject needed! Snowpack guarantees zero lock-in, and CSA strives for the same.
