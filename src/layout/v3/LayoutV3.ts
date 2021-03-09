import {Pagamento, Movimento, PrismaClient} from '@prisma/client';

import {GABUtil} from "../../utils/GABUtil";

import Header from './Header';

import Body from './Body';

import Trailler from '../Trailler';

export class LayoutV3 {
    prismaClient = new PrismaClient();
    movimento: Movimento;
    pagamentos: Pagamento[];

    totalRecebido: number = 0.0;
    body: string = "";

    execute = async (movimento: Movimento, contador: number, tpErro?: number) => {
        this.movimento = movimento;

        this.pagamentos = await this.prismaClient.pagamento.findMany({where: {movimentoId: this.movimento.id}});

        return await this.getHeader(contador) +
                   await this.getBody(tpErro) +
                      await this.getTrailler();
    }

    private getHeader = async (contador: number) => {
        return new Header(this.movimento, contador).getHeader();
    }

    private getBody = async (tpErro?: number) => {
        this.pagamentos.forEach(pagamento => {
            this.body += new Body(pagamento, tpErro).getLine();
            this.totalRecebido = this.totalRecebido + new Body(pagamento, tpErro).getValorRecebido();
        });
        return this.body;
    }

    private getTrailler = async () => {
        return new Trailler(this.pagamentos.length + 2, GABUtil.roundFloat(String(this.totalRecebido))).getTrailler();
    }

}

export default LayoutV3