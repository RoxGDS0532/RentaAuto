import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter,map } from 'rxjs/operators';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent implements OnDestroy {

  constructor(private router:Router) { 
    this.tituloSubs$ = this.getArgumentos().subscribe(({titulo})=>{
      this.titulo = titulo;
      document.title = `AdminLte - ${titulo}`;
    })
  }

  public titulo?: string;
  public tituloSubs$?: Subscription;
  ngOnDestroy(): void {
    this.tituloSubs$?.unsubscribe();
  }

  getArgumentos(){
    return this.router.events.pipe(
      filter((event:any)=> event instanceof ActivationEnd),
      filter((event:any)=> event.snapshot.firstChild === null),
      map((event:ActivationEnd)=> event.snapshot.data)
    );
  }
}