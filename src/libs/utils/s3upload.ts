import aws from 'aws-sdk';
import fs from 'fs';
import moment from 'moment';
import { FileType, UploadResponse } from '../../types/global';

const s3upload = async ({
  fileName,
  filePath,
  fileType,
}: FileType): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    aws.config.update({
      region: 'ap-northeast-2',
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    });

    const s3 = new aws.S3({
      apiVersion: '2006-03-01',
    });

    const stream = fs.createReadStream(filePath);
    const saveTime = `${moment().format('YYMMDD_HHmmdd')}`;
    const newFilename = `${saveTime}_${fileName.replace(/(\s*)/g, '')}`;

    stream.on('error', function (err) {
      reject(err);
    });

    s3.upload(
      {
        Bucket: 'image.dnkdream.com',
        Body: stream,
        Key: newFilename,
        ContentType: fileType,
      },
      function (err, data) {
        if (err) {
          reject(err);
        } else if (data) {
          resolve({
            key: data.Key,
            url: data.Location,
          });
        }
      }
    );
  });
};

export default s3upload;
