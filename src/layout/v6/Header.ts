import { format } from 'date-fns';

import {GABUtil} from "../../utils/GABUtil";

export class Header {
    codigoRegistro: string = "A";
    codigoRemessa: string = "2";
    codigoConvenio: string;
    nomeEmpresa: string;
    codigoBanco: string;
    nomeBanco: string;
    dataGeracaoArquivo: string;
    numeroSequencial: string;
    versaoLayout: string = '06';
    codigoDeBarras: string;
    reservadoFuturo: string;

    constructor(codBanco: string){
            this.codigoConvenio = GABUtil.rightPadSpace(codBanco,20);
            this.nomeEmpresa = GABUtil.rightPadSpace('EMPRESA TESTE',20);
            this.codigoBanco = GABUtil.leftPadZero(codBanco,3);
            this.nomeBanco = GABUtil.rightPadSpace('BANCO TESTE',20);
            this.dataGeracaoArquivo = format(new Date(), 'yyyyMMdd');
            this.numeroSequencial = GABUtil.leftPadZero("1", 6);
            this.codigoDeBarras = GABUtil.padSpace(17);
            this.reservadoFuturo = GABUtil.padSpace(52);
    }

    getHeader() {
        return this.codigoRegistro + this.codigoRemessa + this.codigoConvenio +
        this.nomeEmpresa + this.codigoBanco + this.nomeBanco + this.dataGeracaoArquivo +
        this.numeroSequencial + this.versaoLayout + this.codigoDeBarras +
        this.reservadoFuturo + '\n';
    }
    
}

export default Header