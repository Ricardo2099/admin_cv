import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { EducationService } from '../services/education-service/education.service';
import { Education } from '../models/education/education.model';

@Component({
  selector: 'app-admin-education',
  templateUrl: './admin-education.component.html',
  styleUrls: ['./admin-education.component.css']
})
export class AdminEducationComponent {
  itemTitle = 'Agregar';
  btnTxt = 'Agregar';
  isEditing = false;
  editingId: string | null = null;

  myEducation: Education = {
    cursoRelevantes: '',
    gradoAcademico: '',
    institucion: '',
    premiosReconocimientos: '',
    promedio: '',
    proyectosAcademicos: ''
  };

  education?: Education[];

  constructor(public educationService: EducationService) {
    this.educationService.getEducation()
      .snapshotChanges()
      .pipe(
        map((changes: any[]) =>
          changes.map((c: any) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data() as Education
          }))
        )
      )
      .subscribe((data: Education[]) => {
        this.education = data;
      });
  }

  AgregarEducation() {
    this.educationService.createEducation(this.myEducation).then(() => {
      this.resetForm();
    });
  }

  EditarEducation(education: Education) {
    this.isEditing = true;
    this.editingId = education.id || null;
    this.myEducation = { ...education };
    this.btnTxt = 'Actualizar';
  }

  ActualizarEducation() {
    if (!this.editingId) return;
    const confirmacion = window.confirm('¿Estás seguro de guardar los cambios?');
    if (confirmacion) {
      this.educationService.updateEducation(this.editingId, this.myEducation).then(() => {
        this.resetForm();
      });
    }
  }

  AgregarOActualizar() {
    if (this.isEditing) {
      this.ActualizarEducation();
    } else {
      this.AgregarEducation();
    }
  }

  deleteEducation(id?: string) {
    if (!id) return;
    const confirmacion = window.confirm('¿Estás seguro de eliminar esta educación?');
    if (confirmacion) {
      this.educationService.deleteEducation(id).then(() => {
        console.log('Educación eliminada correctamente!');
      });
    }
  }

  resetForm() {
    this.myEducation = {
      cursoRelevantes: '',
      gradoAcademico: '',
      institucion: '',
      premiosReconocimientos: '',
      promedio: '',
      proyectosAcademicos: ''
    };
    this.isEditing = false;
    this.editingId = null;
    this.btnTxt = 'Agregar';
  }
}
