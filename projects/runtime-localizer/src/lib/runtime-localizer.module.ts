import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';
import { LanguageDefinition, runtimeLocalizerStorageId } from './runtime-localizer.model';
import { RuntimeLocalizerService } from './runtime-localizer.service';

export const DEFAULT_LOCALE_ID = 'en-US';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [RuntimeLocalizerService],
})
export class RuntimeLocalizerModule {
  public static forRoot(languageList: LanguageDefinition[]): ModuleWithProviders<RuntimeLocalizerModule> {
    return {
      ngModule: RuntimeLocalizerModule,
      providers: [
        {
          provide: LOCALE_ID,
          deps: [],
          useFactory: () => {
            let newLocale;
            try {
              newLocale = localStorage.getItem(runtimeLocalizerStorageId);
            } catch (e) {
              console.error('Failed to get locale id from localstorage');
            }
            return newLocale ?? DEFAULT_LOCALE_ID;
          },
        },
        {
          provide: APP_INITIALIZER,
          multi: true,
          deps: [RuntimeLocalizerService, LOCALE_ID],
          useFactory: (runtimeLocalizerService: RuntimeLocalizerService, locale: string) => {
            return () => {
              return runtimeLocalizerService.loadTranslations(locale, languageList);
            };
          },
        },
      ],
    };
  }
}
