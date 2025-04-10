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
      this.myInterest = {
        actividadesExtracurriculares: '',
        culturalEventos: '',
        deportes: '',
        hobbiesActividades: '',
        interesesProfesionales: ''
      };
    });
  }

  deleteInterest(id?: string) {
    if (!id) return;
    this.interestService.deleteInterest(id).then(() => {
      console.log('Interés eliminado correctamente!');
    });
  }
}
