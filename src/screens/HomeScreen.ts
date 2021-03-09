import { terminal as term } from 'terminal-kit';

import {MovimentoScreen} from "./MovimentoScreen";

import {ErroScreen} from "./ErroScreen";

export class HomeScreen {

	static execute = (): void => {
		const items = ['Criar Movimento', 'Consultar Movimento', 'Excluir Movimento', 'Erros',  'Sair'];

		term.clear();

		term.singleLineMenu(items, { y: 0 }, (error, response) => {

			if(response.selectedText === 'Criar Movimento') {
				MovimentoScreen.execute();
			} else if(response.selectedText === 'Consultar Movimento') {
				MovimentoScreen.generateFiles();
			} else if(response.selectedText === 'Excluir Movimento') {
				MovimentoScreen.delete();
			} else if(response.selectedText === 'Erros') {
				ErroScreen.execute();
			} else {
				process.exit();
			}

		});
	};
}
