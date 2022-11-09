import { NestFactory } from '@nestjs/core';
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const configService = app.get(ConfigService);
  // const adminConfig = {
  //   projectId: configService.get('FIREBASE_PROJECT_ID'),
  //   privateKey: configService.get('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
  //   clientEmail: configService.get('FIREBASE_CLIENT_EMAIL'),
  // };
  // admin.initializeApp({
  //   credential: admin.credential.cert(adminConfig),
  //   databaseURL: configService.get('FIREBASE_DATABASE_URL')
  // });
  // admin.database
  // const db = getFirestore();
  // const snapshot = await db.collection('users').get();
  // snapshot.forEach((doc) => {
  //   console.log(doc.id, '=>', doc.data());
  // });

  await app.listen(8080);
}

bootstrap();
