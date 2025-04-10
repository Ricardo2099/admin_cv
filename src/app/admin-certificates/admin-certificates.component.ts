import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { CertificatesService } from '../services/certificates-service/certificate.service';
import { Certificate } from '../models/certificates/certificates.model';

@Component({
  selector: 'app-admin-certificates',
  templateUrl: './admin-certificates.component.html',
  styleUrls: ['./admin-certificates.component.css']
})
export class AdminCertificatesComponent {
  itemTitle = 'Agregar';
  btnTxt = 'Agregar';
  isEditing = false;
  editingId: string | null = null;

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
      this.resetForm();
    });
  }

  EditarCertificate(certificate: Certificate) {
    this.isEditing = true;
    this.editingId = certificate.id || null;
    this.myCertificate = { ...certificate };
    this.btnTxt = 'Actualizar';
  }

  ActualizarCertificate() {
    if (!this.editingId) return;
    const confirmacion = window.confirm('¿Estás seguro de guardar los cambios?');
    if (confirmacion) {
      this.certificatesService.updateCertificates(this.editingId, this.myCertificate).then(() => {
        this.resetForm();
      });
    }
  }

  AgregarOActualizar() {
    if (this.isEditing) {
      this.ActualizarCertificate();
    } else {
      this.AgregarCertificate();
    }
  }

  deleteCertificate(id?: string) {
    if (!id) return;
    const confirmacion = window.confirm('¿Estás seguro de eliminar este certificado?');
    if (confirmacion) {
      this.certificatesService.deleteCertificates(id).then(() => {
        console.log('Certificado eliminado correctamente!');
      });
    }
  }

  resetForm() {
    this.myCertificate = {
      certificacion: '',
      fechaObtencion: '',
      institucion: ''
    };
    this.isEditing = false;
    this.editingId = null;
    this.btnTxt = 'Agregar';
  }
}
