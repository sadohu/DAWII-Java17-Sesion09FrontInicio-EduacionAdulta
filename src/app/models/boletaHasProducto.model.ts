import { BoletaHasProductoPK } from "./boletaHasProductoPK.model";
import { Producto } from "./producto.model";

export class BoletaHasProducto {

    precio ?: number;
    cantidad ?: number;
    producto ?: Producto;
    boletaHasProductoPK ?: BoletaHasProductoPK; 
}
