import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudStorageService {
  private bucketName: string;

  constructor(
    @Inject('CLOUD_STORAGE') private readonly storage: Storage,
    private readonly configService: ConfigService,
    ) {
        this.bucketName = this.configService.get<string>('GCP_BUCKET_NAME') ?? '';
    if (!this.bucketName) {
      throw new Error('GCP_BUCKET_NAME no está definido en las variables de entorno');
      }
    }


  async uploadFile(file: Express.Multer.File): Promise<string> {
    const bucket = this.storage.bucket(this.bucketName);
    const blob = bucket.file(file.originalname);

    const stream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });

    return new Promise((resolve, reject) => {
      stream.on('finish', async () => {
        const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${blob.name}`;
        resolve(publicUrl);
      });
      stream.on('error', (err) => reject(err));
      stream.end(file.buffer);
    });
  }

  async listFiles(): Promise<string[]> {
    const bucket = this.storage.bucket(this.bucketName);
    const [files] = await bucket.getFiles();
    return files.map(f => `https://storage.googleapis.com/${this.bucketName}/${f.name}`);
  }

  async deleteFile(filename: string): Promise<{ message: string }> {
    try {
      const bucket = this.storage.bucket(this.bucketName);
      await bucket.file(filename).delete();
      return { message: 'Archivo eliminado correctamente' };
    } catch (err) {
      throw new BadRequestException(`No se pudo eliminar el archivo: ${err.message}`);
    }
  }
}
