import { Directive, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

@Directive({
  selector: '[comp-host]'
})
export class CompDirective {
  constructor(
    public viewContainerRef: ViewContainerRef,
    public componentFactoryResolver: ComponentFactoryResolver
  ) {  }
}
