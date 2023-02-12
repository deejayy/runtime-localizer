import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadTranslations } from '@angular/localize';
import { catchError, map, of } from 'rxjs';
import { LanguageDefinition, runtimeLocalizerStorageId } from './runtime-localizer.model';

@Injectable()
export class RuntimeLocalizerService {
  constructor(private http: HttpClient) {}

  public loadTranslations(localeId: string, languageList: LanguageDefinition[]) {
    if (languageList && languageList.length > 0) {
      const langDef = languageList.find((lang) => lang.lang === localeId) ?? languageList.find(Boolean);
      if (langDef) {
        return this.http.get<Record<string, string>>(`${langDef.path}?cache=${new Date().getTime()}`).pipe(
          map((data) => {
            loadTranslations(data);
          }),
          catchError((err) => {
            console.error('Error when loading translations:', err);
            return of();
          }),
        );
      }
    }
    return of();
  }

  public saveLocale(localeId: string, reloadPage: boolean = false) {
    try {
      localStorage.setItem(runtimeLocalizerStorageId, localeId);
      if (reloadPage) {
        window.location.reload();
      }
    } catch (e) {
      console.error('Failed to save new locale id');
    }
  }
}
