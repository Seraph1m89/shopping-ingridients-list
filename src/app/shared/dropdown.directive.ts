import { Directive, HostListener, TemplateRef, ViewContainerRef, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  
  @HostBinding('class.open') isShown = false;

  @HostListener('click') toggleOpen(eventData: Event) {
    this.isShown = !this.isShown;
  }

  constructor() { }

}
