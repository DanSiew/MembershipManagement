import { Type } from '@angular/core';

export class ComponentItem {
  constructor(
    public component: Type<any>,
    public componentData: any) { }
  
}
