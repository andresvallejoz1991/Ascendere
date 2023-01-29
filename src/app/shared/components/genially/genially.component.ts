import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'ascendere-genially',
  templateUrl: './genially.component.html',
  styles: [
  ]
})
export class GeniallyComponent {

  constructor(
    private readonly sanitizer: DomSanitizer,
  ) { }

  @Input('src')
  geniallySrc: string | null = null

  get src(): SafeResourceUrl {
    if (this.geniallySrc === null)
      throw new Error("Missing Property src");
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.geniallySrc);
  }
}
