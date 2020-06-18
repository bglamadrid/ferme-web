import { Injectable } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class GestionService {

  private isSidenavOpen: boolean = localStorage.getItem('ferme.sidenavOpen') === 'false' ? false : true;
  protected isSidenavOpenSource: Subject<boolean> = new BehaviorSubject(this.isSidenavOpen);

  public isSidenavOpen$: Observable<boolean> = this.isSidenavOpenSource.asObservable();
  public currentPageName$: Observable<string>;

  constructor(
    protected router: Router
  ) {
    this.currentPageName$ = this.router.events.pipe(
      filter((ev: RouterEvent) => ev instanceof NavigationEnd),
      map((ev: NavigationEnd) => ev.urlAfterRedirects)
    );
  }

  public switchSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
    localStorage.setItem('ferme.sidenavOpen', this.isSidenavOpen ? 'true' : 'false' );
    this.isSidenavOpenSource.next(this.isSidenavOpen);
  }
}
