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
  isEditing = false;
  editingId: string | null = null;

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
      this.resetForm();
    });
  }

  editarSkill(skill: Skill) {
    this.isEditing = true;
    this.editingId = skill.id || null;
    this.mySkill = { ...skill };
    this.btnTxt = 'Actualizar';
  }

  actualizarSkill() {
    if (!this.editingId) return;
    this.skillService.updateSkill(this.editingId, this.mySkill).then(() => {
      this.resetForm();
    });
  }

  agregarOActualizar() {
    if (this.isEditing) {
      this.actualizarSkill();
    } else {
      this.agregarSkill();
    }
  }

  eliminarSkill(id?: string) {
    if (!id) return;
    this.skillService.deleteSkill(id).then(() => {
      console.log('Habilidad eliminada correctamente!');
    });
  }

  resetForm() {
    this.mySkill = {
      skillsPrograming: '',
      socialSkills: ''
    };
    this.isEditing = false;
    this.editingId = null;
    this.btnTxt = 'Agregar';
  }
}
