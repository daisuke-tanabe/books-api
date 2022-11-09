import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import firebaseAdmin from 'firebase-admin';
import admin from "firebase-admin";

@Injectable()
export class FirebaseService {
    constructor(private configService: ConfigService) {
        const firebaseDatabaseURL = this.configService.get('FIREBASE_DATABASE_URL');
        const adminConfig = {
            projectId: configService.get('FIREBASE_PROJECT_ID'),
            privateKey: configService.get('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
            clientEmail: configService.get('FIREBASE_CLIENT_EMAIL'),
        };

        firebaseAdmin.initializeApp({
            credential: admin.credential.cert(adminConfig),
            databaseURL: firebaseDatabaseURL,
        });
    }

    async Firestore(): Promise<firebaseAdmin.firestore.Firestore> {
        return firebaseAdmin.firestore();
    }
}
