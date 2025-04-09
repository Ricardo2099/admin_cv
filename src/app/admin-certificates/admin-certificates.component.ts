import { Component } from '@angular/core';
import { Certificate } from '../models/certificates/certificates.model';
import { map } from 'rxjs/operators';
import { CertificatesService } from '../services/certificates-service/certificate.service';

@Component({
  selector: 'app-admin-certificates',
  templateUrl: './admin-certificates.component.html',
  styleUrls: ['./admin-certificates.component.css']
})
export class AdminCertificatesComponent {
  itemTitle = 'Agregar';
  btnTxt = 'Agregar';
  myCertificate: Certificate = {
    certificacion: '',
    fechaObtencion: '',
    institucion: ''
  };
  certificates?: Certificate[];

  constructor(public certificatesService: CertificatesService) {
    this.certificatesService.getCertificates()
      .snapshotChanges()
      .pipe(
        map((changes: any[]) =>
          changes.map((c: any) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data() as Certificate
          }))
        )
      )
      .subscribe((data: Certificate[]) => {
        this.certificates = data;
      });
  }

  AgregarCertificate() {
    this.certificatesService.createCertificates(this.myCertificate).then(() => {
      this.myCertificate = {
        certificacion: '',
        fechaObtencion: '',
        institucion: ''
      };
    });
  }

  deleteCertificate(id?: string) {
    if (!id) return;
    this.certificatesService.deleteCertificates(id).then(() => {
      console.log('Item eliminado correctamente!');
    });
  }
}
