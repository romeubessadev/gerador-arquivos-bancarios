import { Pagamento } from '@prisma/client';

import { GABUtil } from '../../utils/GABUtil';

import { format } from 'date-fns';

import { CodigoBarrasProvider } from '../../providers/CodigoBarrasProvider';

export class Body {
    codigoRegistro: string = "G";
    identificacaoBancaria: string;
    dataPagamento: string;
    dataCredito: string;
    codigoBarras: string;
    valorRecebido: string;
    valorTarifa: string;
    numeroSequencial: string;
    codigoAgenciaArrecadadora: string;
    formaArrecadacao: string;
    codigoTransacao: string;
    formaPagamento: string;
    reservadoFuturo: string;

    constructor(pagamento: Pagamento, tpErro?: number) {
        this.identificacaoBancaria = GABUtil.rightPadSpace("237 73 0718 80001 5",20);
        this.dataPagamento = format(tpErro === 1 ? pagamento.createdAt.setDate(pagamento.createdAt.getDate() - 2) : pagamento.createdAt, 'yyyyMMdd');
        this.dataCredito = format(pagamento.createdAt, "yyyyMMdd");
        this.codigoBarras = tpErro === 2 ? GABUtil.leftPadZero("1234", 44) : CodigoBarrasProvider.execute(pagamento);
        this.valorRecebido = GABUtil.leftPadZero(tpErro === 0 ? "0" : tpErro === 3 ? String(GABUtil.randomFloat(5,999)).replace(".", "") : String(pagamento.valorCobrado).replace(".", ""), 10);
        this.valorTarifa = GABUtil.padZero(5);
        this.numeroSequencial = GABUtil.leftPadZero(String(pagamento.id), 8);
        this.codigoAgenciaArrecadadora = GABUtil.rightPadSpace("1979",8);
        this.formaArrecadacao = String(pagamento.arrecadacao);
        this.codigoTransacao = GABUtil.rightPadSpace("000743625",23);
        this.formaPagamento = String(pagamento.formaPagamento);
        this.reservadoFuturo = GABUtil.padSpace(12);
    }

    getLine() {
        return this.codigoRegistro + this.identificacaoBancaria + this.dataPagamento +
        this.dataCredito + this.codigoBarras + this.valorRecebido +
        this.valorTarifa + this.numeroSequencial + this.codigoAgenciaArrecadadora +
        this.formaArrecadacao + this.codigoTransacao + this.formaPagamento +
        this.reservadoFuturo + "\n";
    }

    getValorRecebido() {
        return parseFloat(this.valorRecebido);
    }
}

export default Body