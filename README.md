# Ferme Web App

Este proyecto ha sido generado y construido usando [Angular CLI](https://github.com/angular/angular-cli) v7.3.9.
Para seguir de las instrucciones descritas, debes disponer de los binarios de Node.JS y Angular CLI en un ambiente de línea de comandos.

## Visualización y Desarrollo

Ejecuta `ng serve` para ejecutar la app en un servidor local de desarrollo. 
Sin embargo, es muy posible que necesites un "proxy" para que la aplicación pueda conectarse efectivamente a los servicios REST que consume.
Puedes ejecutar `npm start` para abrir el mismo servidor configurado para redirigir las llamadas a la API externa que la aplicación consulta. La configuración de éste proxy la puedes ver en el archivo `proxy.conf.json`.

La primera es la opción comúnmente usada en cualquier aplicación Angular.
Navega a `http://localhost:4200/` para ver la app en funcionamiento.
Cualquier cambio que se realice en el código fuente dentro de la carpeta 'src', desencadenará una re-compilación y recarga de la app en el navegador.

## Compilación

Ejecuta `ng build` para compilar y generar  binarios. 
Éstos se almacenarán en el directorio `dist/`, en la raíz de la app. 
Si le adicionas el parámetro `--prod`, generarás una versión apta para ambientes de producción.

## Pruebas Unitarias

Ejecuta `ng test` para que [Karma](https://karma-runner.github.io) ejecute las pruebas.

## Pruebas "Frente a Frente"

Ejecuta `ng e2e` para que [Protractor](http://www.protractortest.org/) ejecute las pruebas.

## Ayuda
s
Si necesitas ayuda con Angular CLI, ejecuta `ng help` o revisa el [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
