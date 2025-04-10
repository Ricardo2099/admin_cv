import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Skill } from '../../models/skills/skills.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private dbPath = '/skills';
  skillsRef: AngularFirestoreCollection<Skill>;

  constructor(private db: AngularFirestore) {
    this.skillsRef = db.collection(this.dbPath);
  }

  getSkills(): AngularFirestoreCollection<Skill> {
    return this.skillsRef;
  }

  createSkill(skill: Skill): any {
    return this.skillsRef.add({ ...skill });
  }

  deleteSkill(id: string): Promise<void> {
    return this.skillsRef.doc(id).delete();
  }
}
