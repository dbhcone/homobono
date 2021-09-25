import fs from 'fs';
import config from 'config';
import { Dropbox, Error, files } from 'dropbox'; // eslint-disable-line no-unused-vars
import path from 'path';
import request from 'request';
import axios from 'axios';
const APPROOT = <string> config.get('APPROOT');

const deletePhoto = (fileName?: string) => {
//   const url = new URL(`/public/uploads/${fileName}`, APPROOT);
  
  fs.unlink(`backend/public/uploads/${fileName}`, (err: NodeJS.ErrnoException | null) => {
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
  const options = {
    'method': 'GET',
    'url': `http://localhost:9000/public/uploads/${fileName}`,
    'headers': {}
  };
  const url = `http://localhost:9000/public/uploads/${fileName}`;
  // return request(options, function (error, response) {
  //   if (error) throw new Error(error);
  //   // Do the upload from here
  //   console.log('file uploaded', response.body);
  //   // This uploads basic.js to the root of your dropbox
  //   dbx.filesUpload({ path: `/${fileName}`, contents: response.body })
  //     .then((resp: any) => {
  //       console.log('file upload response', resp);
  //     })
  //     .catch((uploadErr: Error<files.UploadError>) => {
  //       console.log('error uploading file', uploadErr);
  //     });
  // });
  axios.get(url).then((resp) => {
    let data = resp.data;
    console.log('type of data is ', typeof(data));
    dbx.filesUpload({ path: `/${fileName}`, contents: data })
      .then((resp: any) => {
        console.log('file upload response', resp);
      })
      .catch((uploadErr: Error<files.UploadError>) => {
        console.log('error uploading file', uploadErr);
      });
    console.log('response from file save', data)
  });
}

export { deletePhoto, uploadFile };
