import { Component } from '@angular/core';
import { Skill } from '../models/skills/skills.model';
import { map } from 'rxjs/operators';
import { SkillService } from '../services/skills-service/skill.service';

@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrls: ['./admin-skills.component.css']
})
export class AdminSkillsComponent {
  itemTitle = 'Agregar';
  btnTxt = 'Agregar';
  mySkill: Skill = {
    skillsPrograming: '',
    socialSkills: ''
  };
  skills?: Skill[];

  constructor(public skillService: SkillService) {
    this.skillService.getSkills()
      .snapshotChanges()
      .pipe(
        map((changes: any[]) =>
          changes.map((c: any) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data() as Skill
          }))
        )
      )
      .subscribe((data: Skill[]) => {
        this.skills = data;
      });
  }

  agregarSkill() {
    this.skillService.createSkill(this.mySkill).then(() => {
      this.mySkill = {
        skillsPrograming: '',
        socialSkills: ''
      };
    });
  }

  eliminarSkill(id?: string) {
    if (!id) return;
    this.skillService.deleteSkill(id).then(() => {
      console.log('Item eliminado correctamente!');
    });
  }
}
