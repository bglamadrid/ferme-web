# Ferme Web App
Una aplicación pensada para la administración de los datos de una ferretería.

Este proyecto ha sido generado y construido usando [Angular CLI](https://github.com/angular/angular-cli) v7.3.9.
Para seguir las instrucciones descritas, debes poseer los binarios de Node.JS y Angular CLI en un ambiente de línea de comandos.

## Visualización y Desarrollo
Con `ng serve` se ejecuta la app en un servidor local de desarrollo. 
Sin embargo, es muy posible que necesites un "proxy" para que la aplicación pueda conectarse efectivamente a los servicios REST que consume.
Para esto, en su lugar puedes ejecutar `npm start`. Esto abrirá el mismo servidor, pero configurado para reescribir las URL llamadas de la API externa que la aplicación consulta. Esta configuración la puedes ver en el archivo `proxy.conf.json`.

Navega a `http://localhost:4200/` para ver la app en funcionamiento.
Cualquier cambio que se realice en el código fuente dentro de la carpeta 'src', desencadenará una re-compilación y recarga de la app en el navegador en que se esté viendo.

## Compilación
Ejecuta `ng build` para compilar y generar una versión estática del sitio. 
Ésta se almacenará en el directorio `dist/`, en la raíz (junto a `/src`). 
Si le adicionas el parámetro `--prod`, generarás una versión apta para ambientes de producción.

## Pruebas Unitarias
Ejecuta `ng test` para que [Karma](https://karma-runner.github.io) ejecute las pruebas configuradas.

## Pruebas "Frente a Frente"
Ejecuta `ng e2e` para que [Protractor](http://www.protractortest.org/) ejecute las pruebas End-to-End configuradas.

## Ayuda
Si necesitas ayuda con Angular CLI, ejecuta `ng help` o revisa el [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
