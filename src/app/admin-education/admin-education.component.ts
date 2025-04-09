import { Component } from '@angular/core';
import { EducationService } from '../services/education-service/education.service';
import { Education } from '../models/education/education.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-education',
  templateUrl: './admin-education.component.html',
  styleUrls: ['./admin-education.component.css']
})
export class AdminEducationComponent {
  itemTitle = 'Agregar';
  btnTxt = 'Agregar';
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
        map(changes =>
          changes.map(c => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data() as Education
          }))
        )
      )
      .subscribe(data => {
        this.education = data;
      });
  }

  AgregarEducation() {
    this.educationService.createEducation(this.myEducation).then(() => {
      this.myEducation = {
        cursoRelevantes: '',
        gradoAcademico: '',
        institucion: '',
        premiosReconocimientos: '',
        promedio: '',
        proyectosAcademicos: ''
      };
    });
  }

  deleteEducation(id?: string) {
    if (!id) return;
    this.educationService.deleteEducation(id).then(() => {
      console.log('Item eliminado correctamente!');
    });
  }
}
