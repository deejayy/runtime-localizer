# Runtime Localizer

```
npm i @deejayy/runtime-localizer
```

Runtime localization was never been easier!

- single build
- keep translations in a plain simple JSON file
- have effective fallback values
- use anywhere (code, template)
- unlimited languages (event loadable from backend!)
- setting kept persistent in the localStorage (overrides LOCALE_ID upon initialization)
- loads before app starts

## Setup and usage

### 1. Add necessary packages and changes to your angular application

```
npm i @angular/localize
```

Add this line to the beginning of your `polyfill.ts`:

```ts
import '@angular/localize/init';
```

### 2. Create language token files (json format)

Put the messages file in your `/assets/` folder somewhere. E.g. `/assets/messages/messages.en-US.json` with the content:

```json
{
  "your-scope/example-token": "Corresponding text"
}
```

### 3. Add localizer module to `app.module.ts` `import` section

```ts
imports: [
  ...
  RuntimeLocalizerModule.forRoot([
    {
      lang: 'en-US',
      path: '/assets/messages/messages.en-US.json',
    },
    {
      lang: 'hu-HU',
      path: '/assets/messages/messages.hu-HU.json',
    },
  ]),
]
```

### 4. Place the language token in the template

```html
<div i18n="@@your-scope/example-token">This is the fallback content if language file not found or token is missing.</div>
```

... or in the code:

```ts
public buttonText: string = $localize`:@@button-text:Fallback button text`;
```

### 5. Change language, the module will keep it permanent

```html
<button i18n="@@app/button/set-language" (click)="setLang('hu-HU')">Set language to: hu-HU</button>
```

```ts
constructor(private runtimeLocalizerService: RuntimeLocalizerService) {}

public setLang(lang: string) {
  this.runtimeLocalizerService.saveLocale(lang, true);
}
```

The setting will be saved to the `localStorage` under the key `@deejayy/runtime-localizer/localeId` (you can refer it as `runtimeLocalizerStorageId` from the package).

The second parameter is whether the page should be reloaded by the localizer module (`true`) or you want to take care of yourself in your application (by default `false`).


## Further reading

Check official angular [localization guide](https://angular.io/guide/i18n-common-overview) for more info.

