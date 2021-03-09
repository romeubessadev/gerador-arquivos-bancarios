import {add, endOfDay, startOfDay} from 'date-fns';

import {Movimento, PrismaClient} from '@prisma/client';

import {GABUtil} from '../utils/GABUtil';

import {LayoutProvider} from '../providers/LayoutProvider';

import {terminal as term} from "terminal-kit";

import {HomeScreen} from "../screens/HomeScreen";


export class MovimentoDiarioUserStory {
    prismaClient = new PrismaClient();

    execute = async (banco: number, dias?: Date[]): Promise<Date[]> => {

        if (dias && dias.length > 0) {
            this.generate(banco, dias);
            return dias;
        }
        if ((await this.prismaClient.movimento.count()) === 0) {
            const diasGerados = [new Date()];
            this.generate(banco, diasGerados);
            return diasGerados;
        }
        const maximoDia = await this.prismaClient.movimento.findFirst({orderBy: [{createdAt: 'desc'}]});
        const dia = maximoDia ? [add(maximoDia.createdAt, {days: 1})] : [new Date()];
        this.generate(banco, dia);
        return dia;
    };

    private generate = (banco: number, dias: Date[]) => {
        dias.forEach(async dia => {
            const QTD_MOV = GABUtil.randomInt(5,10);
            const movimentos: Movimento[] = [];
            for (let i = 0; i < QTD_MOV; i += 1) {
                const movimento = await this.prismaClient.movimento.create({
                    data: {
                        createdAt: add(dia, {minutes: i * 15}),
                        banco
                    }
                });
                movimentos.push(movimento);
                const QTD_PAGAMENTOS = GABUtil.randomInt(5, 5);
                for (let j = 0; j < QTD_PAGAMENTOS; j += 1) {

                    const valorCobrado = GABUtil.randomFloat(500, 15000);

                    await this.prismaClient.pagamento.create({
                        data: {
                            movimento: {connect: {id: movimento.id}},
                            campoLivre: String(GABUtil.randomInt(90000, 999999)),
                            createdAt: movimento.createdAt,
                            arrecadacao: 4,
                            formaPagamento: GABUtil.randomInt(1, 6),
                            tipoModulacao: 6,
                            valorCobrado: valorCobrado,
                            valorRecebido: valorCobrado,
                            vencimento: movimento.createdAt,
                        },
                    });
                }
            }

            const QTD_ESTORNOS = GABUtil.randomInt(2, 2);
            for (let j = 0; j < QTD_ESTORNOS; j += 1) {
                const indexMovimentoImplantador = GABUtil.randomInt(0, QTD_MOV - 2);
                const pagamentos = await this.prismaClient.pagamento.findMany({
                    where: {movimento: movimentos[indexMovimentoImplantador]},
                    include: {pagamentoEstornador: true, movimento: true}
                });
                let ok = false;
                do {
                    const indexPagamentoImplantador = GABUtil.randomInt(0, pagamentos.length - 1);
                    const pagamento = pagamentos[indexPagamentoImplantador];
                    if (pagamento.pagamentoEstornador.length === 0) {
                        await this.prismaClient.pagamento.create({
                            data: {
                                campoLivre: pagamento.campoLivre,
                                createdAt: pagamento.createdAt,
                                arrecadacao: pagamento.arrecadacao,
                                formaPagamento: pagamento.formaPagamento,
                                tipoModulacao: pagamento.tipoModulacao,
                                valorCobrado: pagamento.valorCobrado,
                                valorRecebido: pagamento.valorCobrado,
                                vencimento: pagamento.vencimento,
                                pagamentoEstornado: {connect: {id: pagamento.id}},
                                movimento: {connect: {id: movimentos[indexMovimentoImplantador + 1].id}},
                            },
                        });
                        ok = true;
                    }
                } while (!ok);
            }
            term.green("\nMovimentos cadastrados com sucesso ;)");

            HomeScreen.execute();
        });
    };

    delete = async (data: Date) => {
        const deletedPagamentos = await this.prismaClient.pagamento.deleteMany({
            where: {
                AND: [{createdAt: {gte: startOfDay(data)}},
                    {createdAt: {lte: endOfDay(data)}}]
            }
        });

        if (deletedPagamentos != null) {
            await this.prismaClient.movimento.deleteMany({
                where: {
                    AND: [{createdAt: {gte: startOfDay(data)}},
                        {createdAt: {lte: endOfDay(data)}}]
                }
            });
        }

        term.red.green('\nArquivos apagados com sucesso!');

        HomeScreen.execute();
    }

    generateFiles = async (data: Date, codBanco: string, tpErro?: number) => {
        const movimentos = await this.prismaClient.movimento.findMany({
            where: {
                AND: [{createdAt: {gte: startOfDay(data)}},
                    {createdAt: {lte: endOfDay(data)}},
                    {banco: parseInt(codBanco)}
                ]
            }
        });

        console.log(startOfDay(data));

        let i = 0;

        if (movimentos && movimentos.length > 0) {
            for (const movimento of movimentos) {
                await LayoutProvider.getRajada(movimento, i, tpErro);
                i++;
            }

            await LayoutProvider.getConsolidado(movimentos, codBanco, tpErro);

            term.red.green('\nArquivos gerados com sucesso!');
        } else {
            term.red.red('\nNenhum movimento encontrado!');
        }

        HomeScreen.execute();
    }


}
