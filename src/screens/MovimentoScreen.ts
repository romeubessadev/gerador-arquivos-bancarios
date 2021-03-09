import {terminal as term} from 'terminal-kit';

import {MovimentoDiarioUserStory} from '../userStories/MovimentoDiarioUserStory';

import {DateUtil} from '../utils/DateUtil';

export class MovimentoScreen {

    static execute = (): void => {
        term.clear();

        term('Código do banco: ');

        term.inputField(
            function (error, banco) {
                if (error) {
                    term.red.bold('\nCódigo do banco inválido!');
                }

                term.green("\nCadastrando movimentos... Aguarde um instante!");

                new MovimentoDiarioUserStory().execute(parseInt(banco));
            }
        );
    }

    static delete = (): void => {
        term.clear();

        term('\nData do movimento: ');

        term.inputField(
            function (error, data) {
                if (error) {
                    term.red.bold('\nData inválida!');
                }

                term.green("\nExcluindo movimentos... Aguarde um instante!");

                new MovimentoDiarioUserStory().delete(DateUtil.formatDate(data));
            }
        );
    }

    static generateFiles = (tpErro?: number): void => {
        term.clear();

        term('Código do banco: ');
        term.inputField(
            function (error, banco) {
                if (error) {
                    term.red.bold('\nCódigo do banco inválido!');
                }

                term('\nData do movimento: ');
                term.inputField(
                    function (error, data) {
                        if (error) {
                            term.red.bold('\nData inválida!');
                        }

                        term.green("\nGerando arquivos... Aguarde um instante!");

                        new MovimentoDiarioUserStory().generateFiles(DateUtil.formatDate(data), banco, tpErro);
                    }
                )
            }
        );
    }

}