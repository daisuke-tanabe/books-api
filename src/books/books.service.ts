import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class BooksService {
  constructor(private firebaseService: FirebaseService) {}

  async getBooks() {
    const querySnapshot = await this.firebaseService.firestore
      .collection('books')
      .get();
    return {
      books: querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    };
  }

  async getBookById(id: string) {
    const bookRef = this.firebaseService.firestore.collection('books').doc(id);
    const bookDoc = await bookRef.get();
    if (!bookDoc.data()) return {};
    return { id: bookDoc.id, ...bookDoc.data() };
  }

  async createBook(title: string, author: string) {
    await this.firebaseService.firestore.collection('books').add({
      title,
      author,
    });
  }
}
