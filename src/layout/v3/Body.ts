import { Pagamento } from '@prisma/client';

import { GABUtil } from '../../utils/GABUtil';

import { format } from 'date-fns';

import { CodigoBarrasProvider } from '../../providers/CodigoBarrasProvider';

export class Body {
    codigoRegistro: string = 'G';
    branco: string;
    dataHoraTransacao: string;
    dataPagamento: string;
    oitoZeros: string;
    codigoBarras: string;
    valorRecebido: string;
    seteZeros: string;
    numeroSequencial: string;
    codigoAgenciaArrecadadora: string;
    formaArrecadacao: string;
    codigoTransacao: string;
    formaPagamento: string;
    reservadoFuturo: string;
    tipoTransacao: string;

    constructor(pagamento: Pagamento, tpErro?: number) {
        this.branco = GABUtil.padSpace(6);
        this.dataHoraTransacao = format(pagamento.createdAt, "yyyyMMddhhmmss");
        this.dataPagamento = format(tpErro === 1 ? pagamento.createdAt.setDate(pagamento.createdAt.getDate() - 2) : pagamento.createdAt, "yyyyMMdd");
        this.oitoZeros = GABUtil.padZero(8);
        this.codigoBarras = tpErro === 2 || tpErro === 4 ? GABUtil.leftPadZero(GABUtil.randomInt(0,9999999999).toString(), 44) : CodigoBarrasProvider.execute(pagamento);
        this.valorRecebido = GABUtil.leftPadZero(tpErro === 0 ? "0" : tpErro === 3 ? String(GABUtil.randomFloat(5,999)).replace(".", "") : String(pagamento.valorCobrado).replace(".", ""), 12);
        this.seteZeros = GABUtil.padZero(7);
        this.numeroSequencial = GABUtil.leftPadZero(String(pagamento.id), 8);
        this.codigoAgenciaArrecadadora = GABUtil.rightPadSpace("1979",8);
        this.formaArrecadacao = String(pagamento.arrecadacao);
        this.codigoTransacao = GABUtil.rightPadSpace("000743625",23);
        this.formaPagamento = String(pagamento.formaPagamento);
        this.reservadoFuturo = GABUtil.padSpace(8);
        this.tipoTransacao = tpErro === 4 || pagamento.estorna != null ? "2" : "0";
    }

    getLine() {
        return this.codigoRegistro + this.branco + this.dataHoraTransacao +
        this.dataPagamento + this.oitoZeros + this.codigoBarras + this.valorRecebido +
        this.seteZeros + this.numeroSequencial + this.codigoAgenciaArrecadadora + 
        this.formaArrecadacao + this.codigoTransacao + this.formaPagamento +
        this.reservadoFuturo + this.tipoTransacao + '\n';
    }

    getValorRecebido() {
        return parseFloat(this.valorRecebido);
    }
    
}

export default Body