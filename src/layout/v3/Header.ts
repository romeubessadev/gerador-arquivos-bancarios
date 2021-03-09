import { format } from 'date-fns';

import { Movimento } from '@prisma/client';
import { GABUtil } from '../../utils/GABUtil';

export class Header {
    codigoRegistro: string = 'A';
    codigoRemessa: string = '2';
    codigoConvenio: string;
    nomeEmpresa: string;
    codigoBanco: string;
    nomeBanco: string;
    dataGeracaoArquivo: string;
    numeroSequencial: string;
    versaoLayout: string = '03';
    formaTransmissao: string = '1';
    reservadoFuturo: string;
    horarioGeracao: string;

    constructor(movimento: Movimento, contador){
            this.codigoConvenio = GABUtil.rightPadSpace(String(movimento.banco),20);
            this.nomeEmpresa = GABUtil.rightPadSpace('EMPRESA TESTE',20);
            this.codigoBanco = GABUtil.leftPadZero(String(movimento.banco),3);
            this.nomeBanco = GABUtil.rightPadSpace('BANCO TESTE',20);
            this.dataGeracaoArquivo = format(movimento.createdAt, 'yyyyMMdd');
            this.numeroSequencial = GABUtil.leftPadZero(String(contador), 6);
            this.reservadoFuturo = GABUtil.padSpace(62);
            this.horarioGeracao =  format(new Date(), 'hhmmss');
    }

    getHeader() {
        return this.codigoRegistro + this.codigoRemessa + this.codigoConvenio +
        this.nomeEmpresa + this.codigoBanco + this.nomeBanco + this.dataGeracaoArquivo +
        this.numeroSequencial + this.versaoLayout + this.formaTransmissao + 
        this.reservadoFuturo + this.horarioGeracao + '\n';
    }
    
}

export default Header