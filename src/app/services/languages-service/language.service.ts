import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Language } from '../../models/languages/languages.model';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private dbPath = '/languages';
  languagesRef: AngularFirestoreCollection<Language>;

  constructor(private db: AngularFirestore) {
    this.languagesRef = db.collection(this.dbPath);
  }

  getLanguages(): AngularFirestoreCollection<Language> {
    return this.languagesRef;
  }

  createLanguage(language: Language): any {
    return this.languagesRef.add({ ...language });
  }

  updateLanguage(id: string, data: Language): Promise<void> {
    return this.languagesRef.doc(id).update({ ...data });
  }

  deleteLanguage(id: string): Promise<void> {
    return this.languagesRef.doc(id).delete();
  }
}
