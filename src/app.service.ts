import { Injectable } from '@nestjs/common';
import { FirebaseService } from "./firebase/firebase.service";

@Injectable()
export class AppService {
  constructor(private firebaseService: FirebaseService) {
    const db = firebaseService.Firestore();
    console.log(db);
  }

  getHello(): string {
    return 'Hello World!';
  }
}