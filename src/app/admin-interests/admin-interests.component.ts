import { Component } from '@angular/core';
import { Interest } from '../models/interests/interests.model';
import { map } from 'rxjs/operators';
import { InterestService } from '../services/interests-service/interest.service';

@Component({
  selector: 'app-admin-interests',
  templateUrl: './admin-interests.component.html',
  styleUrls: ['./admin-interests.component.css']
})
export class AdminInterestsComponent {
  itemTitle = 'Agregar';
  btnTxt = 'Agregar';
  isEditing = false;
  editingId: string | null = null;

  myInterest: Interest = {
    actividadesExtracurriculares: '',
    culturalEventos: '',
    deportes: '',
    hobbiesActividades: '',
    interesesProfesionales: ''
  };

  interests?: Interest[];

  constructor(public interestService: InterestService) {
    this.interestService.getInterests()
      .snapshotChanges()
      .pipe(
        map((changes: any[]) =>
          changes.map((c: any) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data() as Interest
          }))
        )
      )
      .subscribe((data: Interest[]) => {
        this.interests = data;
      });
  }

  AgregarInterest() {
    this.interestService.createInterest(this.myInterest).then(() => {
      this.resetForm();
    });
  }

  EditarInterest(interest: Interest) {
    this.isEditing = true;
    this.editingId = interest.id || null;
    this.myInterest = { ...interest };
    this.btnTxt = 'Actualizar';
  }

  ActualizarInterest() {
    if (!this.editingId) return;
    const confirmacion = window.confirm('¿Estás seguro de guardar los cambios?');
    if (confirmacion) {
      this.interestService.updateInterest(this.editingId, this.myInterest).then(() => {
        this.resetForm();
      });
    }
  }

  AgregarOActualizar() {
    if (this.isEditing) {
      this.ActualizarInterest();
    } else {
      this.AgregarInterest();
    }
  }

  deleteInterest(id?: string) {
    if (!id) return;
    const confirmacion = window.confirm('¿Estás seguro de eliminar este interés?');
    if (confirmacion) {
      this.interestService.deleteInterest(id).then(() => {
        console.log('Interés eliminado correctamente!');
      });
    }
  }

  resetForm() {
    this.myInterest = {
      actividadesExtracurriculares: '',
      culturalEventos: '',
      deportes: '',
      hobbiesActividades: '',
      interesesProfesionales: ''
    };
    this.isEditing = false;
    this.editingId = null;
    this.btnTxt = 'Agregar';
  }
}
