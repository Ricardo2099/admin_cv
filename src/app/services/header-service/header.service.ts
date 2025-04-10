import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Header } from '../../models/header/header.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private dbPath = '/header';
  headerRef: AngularFirestoreCollection<Header>;

  constructor(private db: AngularFirestore) {
    this.headerRef = db.collection(this.dbPath);
  }

  getHeaders(): AngularFirestoreCollection<Header> {
    return this.headerRef;
  }

  createHeader(header: Header): any {
    return this.headerRef.add({ ...header });
  }

  updateHeader(id: string, data: Header): Promise<void> {
    return this.headerRef.doc(id).update({ ...data });
  }

  deleteHeader(id: string): Promise<void> {
    return this.headerRef.doc(id).delete();
  }
}
