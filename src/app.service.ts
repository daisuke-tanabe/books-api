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
    const querySnapshot = await this.db.collection('books').get();
    return querySnapshot.docs.map(doc  => ({ id: doc.id, ...doc.data() }));
  }

  async getBookById(id: string) {
    const bookRef = this.db.collection('books').doc(id);
    const bookDoc = await bookRef.get();
    if (!bookDoc.data()) return {};
    return { id: bookDoc.id, ...bookDoc.data() };
  }

  async createBook(title: string, author: string) {
    await this.db.collection('books').add({
      title,
      author
    });
  }
}
