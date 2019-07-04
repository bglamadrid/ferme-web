import { MatSnackBarConfig } from '@angular/material';

export const USUARIO_PERSONA_ID = 2;

export const REACTIVE_FORMS_ISOLATE = { onlySelf: true, emitEvent: false };

export const VENTA_TIPO_BOLETA: string = "B";
export const VENTA_TIPO_FACTURA: string = "F";

export const ORDEN_COMPRA_ESTADO_SOLICITADA: string = "S";
export const ORDEN_COMPRA_ESTADO_RECEPCIONADA: string = "R";


export const SNACKBAR_PRIMARY: MatSnackBarConfig = {
    duration: 5000,
    panelClass: "bg-ng-primary"
};

export const SNACKBAR_WARNING: MatSnackBarConfig = {
    duration: 7500,
    panelClass: "bg-ng-warn"
};