import {terminal as term} from "terminal-kit";

import {MovimentoScreen} from "./MovimentoScreen";

import {HomeScreen} from "./HomeScreen";

import ErroEnum from "../enum/ErroEnum";

export class ErroScreen {

    static execute() {
        term.clear();

        const items = ['Ambos', 'Consolidado', 'Rajada', 'Voltar'];

        term.singleLineMenu(items, {y: 0}, (error, response) => {
            if (response.selectedIndex === 0) {
                this.errosDeAmbos();
            } else if (response.selectedIndex === 1) {
                this.errosConsolidado();
            } else if (response.selectedIndex === 2) {
                this.errosRajada();
            } else {
                HomeScreen.execute();
            }
        });
    }

    private static errosDeAmbos() {
        term.clear();

        const items = ['Valor recebido zero', 'Data pagamento menor', 'Código de barras inválido', 'Valor pagamento diferente', 'Voltar'];

        term.singleLineMenu(items, {y: 0}, (error, response) => {
            if (response.selectedIndex === 0) {
                MovimentoScreen.generateFiles(ErroEnum.getERROS_AMBOS().VALOR_RECEBIDO_ZERO);
            } else if (response.selectedIndex === 1) {
                MovimentoScreen.generateFiles(ErroEnum.getERROS_AMBOS().DATA_PAGAMENTO_MENOR);
            } else if (response.selectedIndex === 2) {
                MovimentoScreen.generateFiles(ErroEnum.getERROS_AMBOS().CODIGO_DE_BARRAS_INVALIDO);
            } else if (response.selectedIndex === 3) {
                MovimentoScreen.generateFiles(ErroEnum.getERROS_AMBOS().VALOR_PAGAMENTO_DIFERENTE);
            } else {
                this.execute();
            }
        });
    }

    private static errosRajada() {
        const items = ['Existir operações anteriores', 'Existir linha igual em outro arquivo', 'Voltar'];

        term.singleLineMenu(items, {y: 0}, (error, response) => {
            if (response.selectedIndex === 0) {
                MovimentoScreen.generateFiles(ErroEnum.getERROS_RAJADA().EXISTIR_OPERACOES_ANTERIORES);
            } else if (response.selectedIndex === 1) {
                MovimentoScreen.generateFiles(ErroEnum.getERROS_RAJADA().LINHA_IGUAL_OUTRO_ARQUIVO);
            } else {
                this.execute();
            }
        });
    }

    private static errosConsolidado() {
        const items = ['Existe rajada de efeitvação e rajada de estorno', 'Soma total de arquivos menor', 'Qtd. total de registros menor', 'Voltar'];

        term.singleLineMenu(items, {y: 0}, (error, response) => {
            if (response.selectedIndex === 0) {
                MovimentoScreen.generateFiles(ErroEnum.getERROS_CONSOLIADDO().EXISTE_RAJADA_EFETIVACAO);
            } else if (response.selectedIndex === 1) {
                MovimentoScreen.generateFiles(ErroEnum.getERROS_CONSOLIADDO().SOMA_TOTAL_DIFERENTE);
            } else if (response.selectedIndex === 2) {
                MovimentoScreen.generateFiles(ErroEnum.getERROS_CONSOLIADDO().TOTAL_REGISTRO_MENOR);
            } else {
                this.execute();
            }
        });
    }
}