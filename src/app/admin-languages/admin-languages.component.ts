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
      this.myLanguage = {
        certificacionesOPruebasdeldioma: '',
        idioma: '',
        nivelDeCompetencia: ''
      };
    });
  }

  eliminarLanguage(id?: string) {
    if (!id) return;
    this.languageService.deleteLanguage(id).then(() => {
      console.log('Item eliminado correctamente!');
    });
  }
}
