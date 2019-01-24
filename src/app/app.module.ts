import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { AboutComponent } from './about/about.component';
import { OfferComponent } from './offer/offer.component';
import { ReferencesComponent } from './references/references.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ParallaxDirective } from './shared/parallax.directive';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: IntroComponent},
  {path: 'about', component: AboutComponent},
  {path: 'offer', component: OfferComponent},
  {path: 'references', component: ReferencesComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'contact', component: ContactComponent},
  {path: '**', component: NotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IntroComponent,
    AboutComponent,
    OfferComponent,
    ReferencesComponent,
    ProjectsComponent,
    ContactComponent,
    NotFoundComponent,
    ParallaxDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {useHash: true}),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
