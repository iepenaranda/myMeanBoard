# myMeanBoard
Ejercicio práctico para el desarrollo de una API por medio del marco de trabajo MEAN-stack.
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
## Configuración de Angular
Angular es un framework para aplicaciones web desarrollado en TypeScript (una versión más estricta de JavaScript) desarrollado por Google.

### Creación de Componentes
La estrucutra del frontend generada por Angular se basa en _componentes_, lo que permite separar la ejecución de las diferentes funcionalidades de una aplicación dentro de la misma página sin tener que estar constantemente actualizando la página completa.

La creación de un componentes se puede realizar con: 
* `ng generate component <ubicación del componente>`
* `ng g c <ubicación del componente>`

**Nota: Para mayor orden agrupar los componentes por carpetas**

Los componentes en Angular siempre constan de la misma estructura:
* Un archivo HTML: En este se realiza toda la estructura del modulo en HTML
* Un archivo CSS: Será la hoja de estilos para su correspondiente HTML
* Un archivo TS: 
* Un archivo .spec.ts:

___
### Creación de Servicios
Corresponden a las diferentes funcionalidades que tendrá la aplicación. Estos se crean con: 
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
