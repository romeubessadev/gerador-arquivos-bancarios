import { FileUtil } from '../utils/FileUtil';

import { Movimento } from '@prisma/client';

import LayoutV3 from '../layout/v3/LayoutV3';

import LayoutV6 from '../layout/v6/LayoutV6';

export class LayoutProvider {
    static getRajada = async (movimento: Movimento, contador: number, tpErro?: number) => {
        await FileUtil.createFile(await new LayoutV3().execute(movimento, contador, tpErro), contador.toString(), tpErro);
    }

    static getConsolidado = async (movimentos: Movimento[] , codBanco: string, tpErro?: number) => {
        await FileUtil.createFile(await new LayoutV6().execute(movimentos, codBanco, tpErro));
    }
}