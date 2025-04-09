import { Component } from '@angular/core';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { WorkExperience } from '../models/work-experience/work-experience.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-workexperience',
  templateUrl: './admin-workexperience.component.html',
  styleUrls: ['./admin-workexperience.component.css']
})
export class AdminWorkexperienceComponent {
  itemTitle = 'Agregar';
  btnTxt = 'Agregar';
  myWorkExperience: WorkExperience = new WorkExperience();
  workExperience?: WorkExperience[];

  constructor(public workExperienceService: WorkExperienceService) {
    this.workExperienceService.getWorkExperience()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data()
          }))
        )
      )
      .subscribe(data => {
        this.workExperience = data;
        console.log(this.workExperience);
      });
  }

  AgregarJob() {
    console.log(this.myWorkExperience);
    this.workExperienceService.createWorkExperience(this.myWorkExperience).then(() => {
      console.log('Created new item successfully!');
      // Reinicia el formulario
      this.myWorkExperience = new WorkExperience();
    });
  }

  deleteJob(id?: string) {
    if (!id) return;
    this.workExperienceService.deleteWorkExperience(id).then(() => {
      console.log('delete item successfully!');
    });
    console.log(id);
  }
}
