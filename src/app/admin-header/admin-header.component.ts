import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Header } from '../models/header/header.model';
import { HeaderService } from '../services/header-service/header.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  itemTitle = 'Agregar';
  btnTxt = 'Agregar';
  isEditing = false;
  editingId: string | null = null;

  myHeader: Header = {
    email: '',
    goalLife: '',
    location: '',
    name: '',
    phoneNumber: '',
    photoUrl: '',
    socialNetwork: ''
  };

  headers?: Header[];

  constructor(public headerService: HeaderService) {
    this.headerService.getHeaders()
      .snapshotChanges()
      .pipe(
        map((changes: any[]) =>
          changes.map((c: any) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data() as Header
          }))
        )
      )
      .subscribe((data: Header[]) => {
        this.headers = data;
      });
  }

  AgregarHeader() {
    this.headerService.createHeader(this.myHeader).then(() => {
      this.resetForm();
    });
  }

  EditarHeader(header: Header) {
    if (confirm('¿Estás seguro de que deseas editar este encabezado?')) {
      this.isEditing = true;
      this.editingId = header.id || null;
      this.myHeader = { ...header };
      this.btnTxt = 'Actualizar';
    }
  }

  ActualizarHeader() {
    if (!this.editingId) return;
    if (confirm('¿Estás seguro de que deseas guardar los cambios?')) {
      this.headerService.updateHeader(this.editingId, this.myHeader).then(() => {
        this.resetForm();
      });
    }
  }

  AgregarOActualizar() {
    if (this.isEditing) {
      this.ActualizarHeader();
    } else {
      this.AgregarHeader();
    }
  }

  deleteHeader(id?: string) {
    if (!id) return;
    if (confirm('¿Estás seguro de que deseas eliminar este encabezado?')) {
      this.headerService.deleteHeader(id).then(() => {
        console.log('Header eliminado correctamente!');
      });
    }
  }

  resetForm() {
    this.myHeader = {
      email: '',
      goalLife: '',
      location: '',
      name: '',
      phoneNumber: '',
      photoUrl: '',
      socialNetwork: ''
    };
    this.isEditing = false;
    this.editingId = null;
    this.btnTxt = 'Agregar';
  }
}
