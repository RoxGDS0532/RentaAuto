import { Component, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ActivationEnd, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent implements OnDestroy {
  public titulo?: string;
  public tituloSubs$?: Subscription;
  public breadcrumbs: { titulo: string, url: string }[] = [];

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { 
    this.tituloSubs$ = this.getArgumentos().subscribe(({ titulo, breadcrumbs }) => {
      this.titulo = titulo;
      this.breadcrumbs = breadcrumbs.reverse();
      if (isPlatformBrowser(this.platformId)) {
        document.title = `AdminLte - ${titulo}`;
      }    });
  }

  ngOnDestroy(): void {
    this.tituloSubs$?.unsubscribe();
  }

  getArgumentos() {
    return this.router.events.pipe(
      filter((event: any) => event instanceof ActivationEnd),
      filter((event: any) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => {
        let breadcrumbs = this.getBreadcrumbs(event.snapshot).reverse();
        return { titulo: event.snapshot.data['titulo'], breadcrumbs };
      })
    );
  }

  private getBreadcrumbs(snapshot: any, url: string = '', breadcrumbs: { titulo: string, url: string }[] = []): { titulo: string, url: string }[] {
    if (snapshot.parent) {
      breadcrumbs = this.getBreadcrumbs(snapshot.parent, url, breadcrumbs);
    }
    const newUrl = `${url}/${snapshot.url.map((segment: any) => segment.path).join('/')}`;
    if (snapshot.data['titulo']) {
      breadcrumbs.push({ titulo: snapshot.data['titulo'], url: newUrl });
    }
    return breadcrumbs;
  }
}
