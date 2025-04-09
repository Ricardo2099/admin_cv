import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Certificate } from '../../models/certificates/certificates.model';

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {
  private dbPath = '/certificates';
  certificatesRef: AngularFirestoreCollection<Certificate>;

  constructor(private db: AngularFirestore) {
    this.certificatesRef = db.collection(this.dbPath);
  }

  getCertificates(): AngularFirestoreCollection<Certificate> {
    return this.certificatesRef;
  }

  createCertificates(certificate: Certificate): any {
    return this.certificatesRef.add({ ...certificate });
  }

  deleteCertificates(id: string): Promise<void> {
    return this.certificatesRef.doc(id).delete();
  }
}
