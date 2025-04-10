import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { WorkExperience } from '../../models/work-experience/work-experience.model';

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService {
  private dbPath = '/work-experience';
  workExperienceRef: AngularFirestoreCollection<WorkExperience>;

  constructor(private db: AngularFirestore) {
    this.workExperienceRef = db.collection(this.dbPath);
  }

  getWorkExperience(): AngularFirestoreCollection<WorkExperience> {
    return this.workExperienceRef;
  }

  createWorkExperience(workExperience: WorkExperience): any {
    return this.workExperienceRef.add({ ...workExperience });
  }

  updateWorkExperience(id: string, data: WorkExperience): Promise<void> {
    return this.workExperienceRef.doc(id).update({ ...data });
  }

  deleteWorkExperience(id: string): Promise<void> {
    return this.workExperienceRef.doc(id).delete();
  }
}
