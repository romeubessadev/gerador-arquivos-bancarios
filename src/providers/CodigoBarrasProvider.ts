import { format } from 'date-fns';

import { Pagamento } from '@prisma/client';

import { GABUtil } from '../utils/GABUtil';

export class CodigoBarrasProvider {
	static execute(pagamento: Pagamento): string {
		const semDigito = this.getSemDigitoVerificador(pagamento);
		const digito = pagamento.tipoModulacao === 6 ? GABUtil.calcularMod10(semDigito) : GABUtil.calcularMod11(semDigito);
		return semDigito.substr(0, 3) + digito + semDigito.substr(3);
	}

	private static getSemDigitoVerificador(pagamento: Pagamento) {
		return `81${pagamento.tipoModulacao}${this.getDigitosValor(pagamento)}0868${this.getDigitosDataVencimento(pagamento)}${this.getDigitosCampoLivre(pagamento)}`;
	}

	private static getDigitosCampoLivre = (pagamento: Pagamento): string => {
		return GABUtil.leftPadZero(pagamento.campoLivre, 17);
	};

	private static getDigitosValor = (pagamento: Pagamento): string => {
		return GABUtil.leftPadZero(String(Math.round(pagamento.valorCobrado * 100)), 11);
	};

	private static getDigitosDataVencimento = (pagamento: Pagamento): string => {
		return format(pagamento.vencimento, 'yyyymmdd');
	};
}
