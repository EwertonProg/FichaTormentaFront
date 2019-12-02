import {Inject, Injectable} from '@angular/core';
import {WINDOW} from '../window.providers';

@Injectable()
export class SampleService {

  constructor(@Inject(WINDOW) private window: Window) {
  }

  getOrigin(): string {
    return this.window.location.origin;
  }
}
