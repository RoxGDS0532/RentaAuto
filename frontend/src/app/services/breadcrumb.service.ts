import { Injectable } from '@angular/core';
import { NavigationEnd,ActivatedRouteSnapshot, Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter,map } from 'rxjs/operators';
interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbs$ = this.breadcrumbs.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.createBreadcrumbs(this.router.routerState.snapshot.root))
    ).subscribe(breadcrumbs => this.breadcrumbs.next(breadcrumbs));
  }

  private createBreadcrumbs(route: ActivatedRouteSnapshot, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    if (route.routeConfig && route.routeConfig.data) {
      const path = route.routeConfig.path || '';
      url += `/${path}`;
      breadcrumbs.push({ label: route.routeConfig.data['breadcrumb'], url });
    }

    if (route.firstChild) {
      return this.createBreadcrumbs(route.firstChild, url, breadcrumbs);
    }
    
    return breadcrumbs;
  }
  
}
