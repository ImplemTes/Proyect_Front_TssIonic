import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageTitleService {
  private titleSource = new BehaviorSubject<string>('Inicio');
  currentTitle = this.titleSource.asObservable();

  changeTitle(title: string) {
    this.titleSource.next(title);
  }
}