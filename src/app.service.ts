import { Injectable } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';
import { FirebaseService } from "./firebase/firebase.service";

@Injectable()
export class AppService {
  private db: Firestore;

  constructor(private firebaseService: FirebaseService) {
    this.db = firebaseService.Firestore();
  }

  async getBooks() {
    // firebase-admin なのでライブラリによっては書き方が異なるはず

    // 単一ドキュメントならこう
    // const booksRef = this.db.collection('books').doc('5AOzIZWtuGLzB4Icc3g3');
    // const booksDoc = await booksRef.get();
    // return booksDoc;

    // 複数ドキュメントならこう
    const querySnapshot = await this.db.collection('books').get();
    return querySnapshot.docs.map(doc  => ({ id: doc.id, ...doc.data() }));
  }
}