import { Component } from '@angular/core';
import { Language } from '../models/languages/languages.model';
import { map } from 'rxjs/operators';
import { LanguageService } from '../services/languages-service/language.service';

@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrls: ['./admin-languages.component.css']
})
export class AdminLanguagesComponent {
  itemTitle = 'Agregar';
  btnTxt = 'Agregar';
  isEditing = false;
  editingId: string | null = null;

  myLanguage: Language = {
    certificacionesOPruebasdeldioma: '',
    idioma: '',
    nivelDeCompetencia: ''
  };

  languages?: Language[];

  constructor(public languageService: LanguageService) {
    this.languageService.getLanguages()
      .snapshotChanges()
      .pipe(
        map((changes: any[]) =>
          changes.map((c: any) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data() as Language
          }))
        )
      )
      .subscribe((data: Language[]) => {
        this.languages = data;
      });
  }

  agregarLanguage() {
    this.languageService.createLanguage(this.myLanguage).then(() => {
      this.resetForm();
    });
  }

  editarLanguage(language: Language) {
    this.isEditing = true;
    this.editingId = language.id || null;
    this.myLanguage = { ...language };
    this.btnTxt = 'Actualizar';
  }

  actualizarLanguage() {
    if (!this.editingId) return;
    const confirmacion = window.confirm('¿Estás seguro de guardar los cambios?');
    if (confirmacion) {
      this.languageService.updateLanguage(this.editingId, this.myLanguage).then(() => {
        this.resetForm();
      });
    }
  }

  agregarOActualizar() {
    if (this.isEditing) {
      this.actualizarLanguage();
    } else {
      this.agregarLanguage();
    }
  }

  eliminarLanguage(id?: string) {
    if (!id) return;
    const confirmacion = window.confirm('¿Estás seguro de eliminar este idioma?');
    if (confirmacion) {
      this.languageService.deleteLanguage(id).then(() => {
        console.log('Idioma eliminado correctamente!');
      });
    }
  }

  resetForm() {
    this.myLanguage = {
      certificacionesOPruebasdeldioma: '',
      idioma: '',
      nivelDeCompetencia: ''
    };
    this.isEditing = false;
    this.editingId = null;
    this.btnTxt = 'Agregar';
  }
}
