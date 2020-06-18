# Ferme Web App
Un punto de venta web para una ferretería, escrito con portabilidad de código en mente. Posee un módulo completo para trabajar datos sin conexión, pero es fácil hacer que se conecte a una API REST remota en su lugar.

Este proyecto fue generado usando [la interfaz de comandos de Angular](https://github.com/angular/angular-cli) en la v7.3.9.
Se ha migrado a la v9.1.9 siguiendo [la guía oficial de actualización](https://update.angular.io/).

No se ha puesto énfasis en las pruebas; todas aquellas incluidas en este proyecto fueron generadas por defecto al usar la interfaz de comandos de Angular.

## Visualización y Desarrollo
Con `ng serve` se ejecuta la app en un servidor local de desarrollo. Mientras corra, cualquier cambio que se realice en el código fuente dentro de la carpeta 'src', desencadenará una re-compilación y recarga de la app.

En el directorio `environments\` se encuentra la configuración de la URL de conexión a la API REST.
Si la API REST está en el mismo equipo de la app, deberás configurarle un proxy. Para esto puedes revisar el archivo `proxy.conf.json` y ejecutar el comando anterior con la opción `--proxy-config proxy.conf.json`.

## Compilación
Ejecuta `ng build` para compilar y generar una versión estática del sitio. 
Ésta se almacenará en el directorio `dist/`, en la raíz (junto a `/src`). 
Si le adicionas el parámetro `--prod`, generarás una versión apta para ambientes de producción, con conexión a API REST incluida. Recuerda editar el archivo `enviroments\environment.prod.ts`, y si es pertinente, cambiar el parámetro `<base href>` en el archivo `index.html` (en el link de demostración, se usa el valor `/ferme-web/`).
