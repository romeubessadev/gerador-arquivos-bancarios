import {Movimento, PrismaClient} from '@prisma/client';

import {GABUtil} from "../../utils/GABUtil";

import Header from './Header';

import Body from './Body';

import Trailler from '../Trailler';

export class LayoutV6 {

    prismaClient = new PrismaClient();

    movimentos: Movimento[];
    codBanco: string;
    totalRecebido: number = 0;
    count: number = 0;
    body: string = "";

    execute = async (movimentos: Movimento[], codBanco: string, tpErro?: number) => {
        this.movimentos = movimentos;
        this.codBanco = codBanco;

        return await this.getHeader() +
            await this.getBody(tpErro) +
            await this.getTrailler(tpErro);
    }

    private getHeader = async () => {
        return new Header(this.codBanco).getHeader();
    }

    private getBody = async (tpErro?: number) => {
        for (const movimento of this.movimentos) {

            const pagamentos = await this.prismaClient.pagamento.findMany({where: {movimentoId: movimento.id}});

            if (pagamentos && pagamentos.length > 0) {
                pagamentos.forEach(pagamento => {
                    if (pagamento.estorna == null || tpErro === 6) {
                        this.body += new Body(pagamento, tpErro).getLine();

                        this.totalRecebido = this.totalRecebido + new Body(pagamento).getValorRecebido();

                        this.count++;
                    }
                });
            }
        }

        return this.body;
    }

    private getTrailler = async (tpErro?: number) => {
        return new Trailler(tpErro === 8 ? this.count : this.count + 2, tpErro === 7 ? GABUtil.roundFloat(String(this.totalRecebido - 1)) : GABUtil.roundFloat(String(this.totalRecebido))).getTrailler();
    }

}

export default LayoutV6