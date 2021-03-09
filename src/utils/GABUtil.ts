export class GABUtil {
	static randomInt(min: number, max: number): number {
		return min + Math.floor((max - min) * Math.random());
	}

	static randomFloat(min: number, max: number): number {
		const randomized = min + (max - min) * Math.random();
		return Math.floor(randomized * 100) / 100;
	}

	static calcularMod11(refererencia: string): string {
		let multiplicador = 4;
		let somatorio = 0;
		for (let i = 0; i < refererencia.length; i += 1) {
			somatorio += parseInt(refererencia[i], 10) * multiplicador;
			multiplicador = multiplicador - 1 === 1 ? 9 : multiplicador - 1;
		}
		somatorio %= 11;
		return String(somatorio);
	}

	static calcularMod10(refererencia: string): string {
		let multiplicador = 2;
		let somatorio = 0;
		for (let i = 0; i < refererencia.length; i += 1) {
			const m = parseInt(refererencia[i], 10) * multiplicador;
			if (m >= 10) {
				for (let j = 0; j < String(m).length; j += 1) {
					somatorio += parseInt(String(m)[j], 10);
				}
			} else {
				somatorio += m;
			}

			multiplicador = multiplicador === 2 ? 1 : 2;
		}
		somatorio = 10 - (somatorio % 10);
		return String(somatorio === 10 ? 0 : somatorio);
	}

	static roundFloat(value: string): string {
		return parseFloat(value).toFixed(2).replace('.', '');
	}

	static leftPadZero = (value: string, length: number): string => {
		const len = length - value.length + 1;
		return len > 0 ? Array(len).join('0') + value : value;
	};

	static rightPadZero = (value: string, length: number): string => {
		const len = length - value.length + 1;
		return len > 0 ? value + Array(len).join('0') : value;
	};

	static leftPadSpace = (value: string, length: number): string => {
		const len = length - value.length + 1;
		return len > 0 ? Array(len).join(' ') + value : value;
	};

	static rightPadSpace = (value: string, length: number): string => {
		const len = length - value.length + 1;
		return len > 0 ? value + Array(len).join(' ') : value;
	};

	static padSpace = (spaces: number): string => {
		let string = "";
		for (let i = 0; i < spaces; i++) {
			string += " ";
		}
		return string;
	};

	static padZero = (zeros: number): string => {
		let string = "";
		for (let i = 0; i < zeros; i++) {
			string += "0";
		}
		return string;
	};

}
