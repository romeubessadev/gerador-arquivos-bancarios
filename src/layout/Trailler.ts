import {GABUtil} from "../utils/GABUtil";

export class Trailler {
    codigoRegistro: string = 'Z';
    totalRegistro: string;
    totalRegistroArquivo: string;
    filler: string;

    constructor(totalRegistro: number, totalRegistroArquivo: string) {
        this.totalRegistro = GABUtil.leftPadZero(String(totalRegistro), 6);
        this.totalRegistroArquivo = GABUtil.leftPadZero(totalRegistroArquivo, 17);
        this.filler = GABUtil.padSpace(126);
    }

    getTrailler() {
        return this.codigoRegistro + this.totalRegistro + this.totalRegistroArquivo + this.filler;
    }

}

export default Trailler