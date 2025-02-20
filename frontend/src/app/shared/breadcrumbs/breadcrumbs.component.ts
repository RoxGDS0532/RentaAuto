import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter,map } from 'rxjs/operators';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Breadcrumb {
  label: string;
  url: string;
}
@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent implements OnInit, OnDestroy{
  public breadcrumbs: Breadcrumb[] = [];
  private subscription!: Subscription;

  constructor(private router:Router , private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
        console.log('Solo rutas padre:', JSON.stringify(this.breadcrumbs, null, 2));
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    for (let child of children) {
      if (!child.snapshot.data['titulo']) {
        return this.createBreadcrumbs(child, url, breadcrumbs);
      }

      const routeURL = child.snapshot.url.map(segment => segment.path).join('/');
      const nextUrl = `${url}/${routeURL}`;

      breadcrumbs.push({ label: child.snapshot.data['titulo'], url: nextUrl });

      return this.createBreadcrumbs(child, nextUrl, breadcrumbs);
    }

    return breadcrumbs;
  }
}