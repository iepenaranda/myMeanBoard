# myMeanBoard
Ejercicio práctico para el desarrollo de una API por medio del marco de trabajo MEAN-stack conformado por la tecnologías MongoDB, ExpressJS, Angular y NodeJS.
___

## Configuración Github
1. `git init` en la carpeta del proyecto para inicializar el repositorio.
2. `git remote add origin <dirección del repositorio>` para conectar el repositorio local con el repositorio de Github.
3. `git pull oirigin main` para "jalar" los archivos que el repositorio posea para evitar errores.
4. `git fetch origin main` (por si acaso).
Con estos paso ya se tiene iniciado el repositorio local y se puede proceder a trabajar en el proyecto. Ahora los paso para poder actualizar el proyecto en el repositorio son:
1. `git add .` (se usa el . para seleccionar todos los archivos que hayan sufrido cambios desde la ultima actualización, en otro caso se puede especificar los archivos a actualizar).
2. `git commit -m "comentario sobre el push que se va arealizar"`
3. `git push -u origin <rama a la cuál se vaya a subir>`
4. Finalmente para revisar el estado de los archivos localmente se puede usar: `git status`.
___

## Configuración de Node.JS (Backend)
Es un framework diseñado para ejecutar el lenguaje de Javascript en el lado del servidor. 

Entonces, para inicializar los archivos de Node.JS:
* Se usa `npm init`. Con esto se establecera los archivos necesarios para trabajar con Node y solicitara alguna información sobre el proyecto para guardarla.
* Para instalar las librerias se usa: `npm install <nombre de la libreria> --save`. La información de estas librerias se guardara en una carpeta llamada node_modules y se llamaran por medio de los archivos package.json y package-lock.json. El archivo package.json es el necesario para después descargar las librerias en caso de que se borre la carpeta node_modules.

Las librerias usualmente requeridas son:
* __Express:__ Para establecer un servidor y el manejo de rutas dentro del proyecto.
* __Bcrypt:__ Para encriptar contraseñas.
* __Connect-multiparty:__ Para recibir archivos desde el Frontend.
* __Multer:__ Igual que connect-multiparty para recibir archivos, se puede manejar ambas posibilidades dentro de un proyecto.
* __jsonwebtoken:__ Para manejar Token dentro del backend y con esto información encriptada.
* __dotenv:__ Para manejar variables de entorno dentro del proyecto por medio de un archivo llamado `.env`.
* __jwt-simple:__ Para decifrar Jsonwebtoken.
* __moment:__ Para el manejo de fechas dentro del proyecto.
* __cors:__ Para la conexión del Backend con el Frontend.
* __mongoose:__ Para conectar con bases de datos de MongoDB.
* __nodemon:__ Esta se usa en desarrollo, es para que la aplicación se reinicie automaticamente cada vez que se realizan cambios en el codigo. Para instalar esta librerias toca usar el comando: `nodemon --save-dev`.

Una vez creados los archivos package.json es necesario cambiar dentro de este archivo la instrucción `"test"` del bloque `"scripts"` en el archivo package.json y poner: 
*  `"start": "nodemon index.js"` esto para que la aplciación se pueda iniciar usando el comando `npm start`.

### Arquitectura del Backend:
Gracias a la configuración de `npm init`, el archivo que se ejecutara una vez iniciado la aplicación será index.js. Entonces a partir de este archivo se debe hacer las conexiónes a todos los demás archivos del proyecto:
* Establecer el servidor de la app con express.
* Establecer la conexión con las rutas del backend y de las rutas de la API.
* Establecer la conexión con el puerto en el cuál se desplegara el Backend.
* Establecer la conexión con la base de datos.
___
## Configuración de Angular (Frontend)
Angular es un framework para aplicaciones web desarrollado en TypeScript (una versión más estricta de JavaScript) desarrollado por Google.

### Inicialización
Para empezar a trabajar con Angular es necesario crear la carpeta Frontend con toda su estructura:
* `ng new frontend`

La ejecución de este comando tomara tiempo segú la conexión a internet y pedira la selección de algunas opciones para la configuración de la carpeta.

### Creación de Componentes
La estrucutra del frontend generada por Angular se basa en _componentes_, lo que permite separar la ejecución de las diferentes funcionalidades de una aplicación dentro de la misma página sin tener que estar actualizando la página completa.

La creación de un componentes se puede realizar con: 
* `ng generate component <ubicación del componente>`
* `ng g c <ubicación del componente>`

**Nota: Para mayor orden agrupar los componentes por carpetas**

Los componentes en Angular siempre constan de la misma estructura:
* Un archivo HTML: En este se realiza toda la estructura del modulo en HTML.
* Un archivo CSS: Será la hoja de estilos para su correspondiente HTML.
* Un archivo TS: Estos archivos realizaran la inicialización y conexión con el backend de la información.
* Un archivo .spec.ts: Estos archivos son para realizar pruebas con los archivos.

___
### Creación de Servicios
Corresponden a las diferentes funcionalidades que tendrá la aplicación en el Frontend y los encargados de conectar el Frontend (componentes) con el Backend. Estos se crean con: 
* `ng generate service service/<nombre del servicio>`
* `ng g s service/<nombre del servicio>`

La estructura de los servicios consta de dos archivos TS.
___
### Creación de Guards
Cumple con hacer que los archivos middleware creados en el backend puedan funcionar con el frontend. Estos se crean con: 
* `ng generate guard guard/<nombre del servicio>`

La estructura de los guards consta de dos archivos TS.
___
Con los compónentes, servicios y guards generados aahora es necesario actualizar algunos archivos para su correcto funcionamiento:
1. Los archivos generados por los componentens, los servicios y los guards toca importarlos en el archivo `app.module.ts`. Usualmente los archivos de los componentes se importan automaticamente al generar sus carpetas, a diferencia de los servicios y los guards que toca agregar su importación al archivo. Para ello puede utilizar el siguiente statement:

`import {} from './<ubicación del componente, servicio o guard>'`.

2. Después de importarlos toca agregar los nombres de sus variables a las estructuras de `@NgModules` del mismo archivo. Los llamados de los componentes se guardaran en el arreglo `declarations` mientrás que el llamado de los servicios y los guards se hará en el arreglo `providers`.
3. Finalmente se generan sus rutas en el archivo `app-routing.module.ts`, en la estrcutura `routes: Routes[]`. Acá se agregaran las rutas que tendra la aplicación.
___

### Estructura de los componentes en Angular, parte 2:
El archivo TS poseen los elementos OnInit y su Constructor.
* En la clase se estanciaran las variables necesarias
* El constructor se encargara de iniciar los elementos necesarios una vez se ejecute el servidor. Acá se inicializan las variables previamente instanciadas.
___

### Librerias Frontend:
Para Angular de ha desarrollado una libreria de Frontend llamada Angular Material, su funcionamiento es similar al de Bootstrap para a diferencia de este último, Material debe ser instalado en el proyecto, junto co esta también hay otro complemenentos utiles como flex-layout y cdk para su funcionamiento correcto.
* `ng add @angular/material`
* `npm i @angular/flex-layout @angular/cdk`
___
#### 10/06/2021
     
* [] Es para enviar datos desde el frontend por medio de la variable a la cual este asignado.
* ( ) Es para recibir datos desde el backend y asignarlos a alguna variable a la cuál este asignados.

Necesitaremos __httpclient__ para poder utilizar servicios dentro de la aplicación y forms para usar los formularios de Angular y los llamamos en la estrcutura `import[]` de app.module.ts
* `import { HttpClientModule } from "@angular/common/http";`
* `import { FormsModule, ReactiveFormsModule } from "@angular/forms";`
* `*ngIf="<nombre de la variable>"` es una forma de crear un if statement dentro de html, lo que implicará que la visibilidad del elemento al que pertenezca dependerá si el resultado del if es true o false.
* 
