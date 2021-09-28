import fs from 'fs';
import config from 'config';
import { Dropbox, Error, files } from 'dropbox'; // eslint-disable-line no-unused-vars
import path from 'path';
import request from 'request';
import axios from 'axios';
import { UPLOADPATH } from '../../const';
const APPROOT = <string> config.get('APPROOT');

const deletePhoto = (fileName?: string) => {
  fs.unlink(path.join(UPLOADPATH, `/${fileName}`), (err: NodeJS.ErrnoException | null) => {
    if (err) {
      console.log(err.name, err.code, err.message);
      return false;
    } else {
      return true;
    }
  });
};

const uploadFile = (fileName: string) => {
  const dbx = new Dropbox({ accessToken: 'hoOHxRjEi_MAAAAAAAAAAcIr6Vcc3VS-4xBdtTwuD0bWwpcxRsNLxpU0SUSV-Lb-' });
  
  fs.readFile(path.join(UPLOADPATH, `/${fileName}`), async (err, contents) => {
    if (err) {
      console.log('Error reading file: ', err);
    }
    try {
      const response = await dbx.filesUpload({ path: `/${fileName}`, contents });
      console.log('upload response', response);
      
    } catch (uploadErr: any) {
      console.log('upload error', uploadErr);
    }
  });
}


export { deletePhoto, uploadFile };
