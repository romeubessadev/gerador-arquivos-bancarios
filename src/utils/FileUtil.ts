import signale from "signale";

import {format} from 'date-fns';

export class FileUtil {
    static createFile(template: string, contador?: string, tpErro?: number, titulo?: string) {
        const fs = require("fs");

        const title = titulo === undefined ? "CF_" + format(new Date(), "ddMMyy")
            + "_" + (contador != null ? ("0".concat(contador)).slice(-2) : '') :
            "CF_" + format(new Date(), "ddMMyy") + "_" + titulo;

        const directory = this.checkDir();

        fs.writeFile(directory + title + ".txt", template, function (error) {
            if (error) {
                return signale.log(error);
            }
        });

        if(tpErro === 5 && contador === "0") {
            this.createFile(template, null, null, "00-1");
        }
    }

    static removeFile(dirPath: string) {
        const fs = require("fs");
        try {
            var files = fs.readdirSync(dirPath);
        } catch (e) {
            return;
        }

        if (files.length > 0) {
            files.forEach(file => {
                const filePath = dirPath + file;
                if (fs.statSync(filePath).isFile()) {
                    fs.unlinkSync(filePath);
                } else {
                    this.removeFile(filePath);
                }
                fs.rmdirSync(dirPath);
            })
        }
    }

    private static checkDir() {
        const fs = require("fs");
        const directory = "/temp/febraban/";

        try {
            fs.statSync(directory);
        } catch (e) {
            try {
                fs.mkdirSync(directory, {recursive: true}, err => {
                });
            } catch (e) {
                return e;
            }
        }

        return directory;
    }
}
