import * as uuid from 'uuid';
import * as path from 'path';
import fs from 'fs';

class FileService {
    saveFile(file) {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve('static', fileName);
            file.mv(filePath);
            return fileName;
        } catch (e) {
            console.log(e)
        }
    }

    deleteFile(fileName) {
        try {
            const filePath = path.resolve('static', fileName);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export default new FileService();