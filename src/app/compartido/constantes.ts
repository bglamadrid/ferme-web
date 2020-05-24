import { MatSnackBarConfig } from '@angular/material/snack-bar';

export const USUARIO_PERSONA_ID = 2;

export const REACTIVE_FORMS_ISOLATE = { onlySelf: true, emitEvent: false };

export const VENTA_TIPO_BOLETA = 'B';
export const VENTA_TIPO_FACTURA = 'F';

export const ORDEN_COMPRA_ESTADO_SOLICITADA = 'S';
export const ORDEN_COMPRA_ESTADO_RECEPCIONADA = 'R';

export const MSJ_ERROR_COMM_SRV = 'Hubo un problema de comunicación con el servidor. Por favor, inténtelo nuevamente.';

export const SNACKBAR_CONFIRM: MatSnackBarConfig = {
  duration: -1
};

export const SNACKBAR_PRIMARY: MatSnackBarConfig = {
  panelClass: 'bg-ng-primary'
};

export const SNACKBAR_WARNING: MatSnackBarConfig = {
  panelClass: 'bg-ng-warn'
};
