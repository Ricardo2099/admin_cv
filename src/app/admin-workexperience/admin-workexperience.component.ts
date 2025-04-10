import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { WorkExperience } from '../models/work-experience/work-experience.model';

@Component({
  selector: 'app-admin-workexperience',
  templateUrl: './admin-workexperience.component.html',
  styleUrls: ['./admin-workexperience.component.css']
})
export class AdminWorkexperienceComponent {
  itemTitle = 'Agregar';
  btnTxt = 'Agregar';
  isEditing = false;
  editingId: string | null = null;

  myWorkExperience: WorkExperience = {
    startDate: '',
    endDate: '',
    location: '',
    position: '',
    company: '',
    accomplishments: ''
  };

  workExperienceList?: WorkExperience[];

  constructor(public workExperienceService: WorkExperienceService) {
    this.workExperienceService.getWorkExperience()
      .snapshotChanges()
      .pipe(
        map((changes: any[]) =>
          changes.map((c: any) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data() as WorkExperience
          }))
        )
      )
      .subscribe((data: WorkExperience[]) => {
        this.workExperienceList = data;
      });
  }

  AgregarWorkExperience() {
    this.workExperienceService.createWorkExperience(this.myWorkExperience).then(() => {
      this.resetForm();
    });
  }

  EditarWorkExperience(workExperience: WorkExperience) {
    this.isEditing = true;
    this.editingId = workExperience.id || null;
    this.myWorkExperience = { ...workExperience };
    this.btnTxt = 'Actualizar';
  }

  ActualizarWorkExperience() {
    if (!this.editingId) return;
    const confirmacion = window.confirm('¿Estás seguro de guardar los cambios?');
    if (confirmacion) {
      this.workExperienceService.updateWorkExperience(this.editingId, this.myWorkExperience).then(() => {
        this.resetForm();
      });
    }
  }

  AgregarOActualizar() {
    if (this.isEditing) {
      this.ActualizarWorkExperience();
    } else {
      this.AgregarWorkExperience();
    }
  }

  deleteWorkExperience(id?: string) {
    if (!id) return;
    const confirmacion = window.confirm('¿Estás seguro de eliminar esta experiencia laboral?');
    if (confirmacion) {
      this.workExperienceService.deleteWorkExperience(id).then(() => {
        console.log('Work experience eliminado correctamente!');
      });
    }
  }

  resetForm() {
    this.myWorkExperience = {
      startDate: '',
      endDate: '',
      location: '',
      position: '',
      company: '',
      accomplishments: ''
    };
    this.isEditing = false;
    this.editingId = null;
    this.btnTxt = 'Agregar';
  }
}
