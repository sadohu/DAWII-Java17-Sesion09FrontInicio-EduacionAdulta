import { Usuario } from "./usuario.model";
import { BoletaHasProducto } from "./boletaHasProducto.model";
import { Cliente } from "./cliente.model";

export class Boleta {

    idboleta ?: number;
    cliente ?: Cliente;
    usuario ?: Usuario;
    detallesBoleta ?: BoletaHasProducto[];

}
