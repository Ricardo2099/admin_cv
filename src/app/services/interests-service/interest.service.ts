// interest.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Interest } from '../../models/interests/interests.model';

@Injectable({
  providedIn: 'root'
})
export class InterestService {
  private dbPath = '/interests';
  interestsRef: AngularFirestoreCollection<Interest>;

  constructor(private db: AngularFirestore) {
    this.interestsRef = db.collection(this.dbPath);
  }

  getInterests(): AngularFirestoreCollection<Interest> {
    return this.interestsRef;
  }

  createInterest(interest: Interest): any {
    return this.interestsRef.add({ ...interest });
  }

  deleteInterest(id: string): Promise<void> {
    return this.interestsRef.doc(id).delete();
  }

  updateInterest(id: string, interest: Interest): Promise<void> {
    return this.interestsRef.doc(id).update({ ...interest });
  }
}
