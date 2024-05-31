import * as fs from 'node:fs';
import * as path from 'node:path';

export const deleteImage = (imgName: string) => {
    const src = path.join(__dirname, '..', '..', '..', 'uploads', imgName);

    if (fs.existsSync(src)) {
        fs.unlink(src, (err) => {
            if (err) throw err;
            console.log(`uploads/${imgName} was deleted`);
        });
    } else {
        console.log('File not found');
    }
};
