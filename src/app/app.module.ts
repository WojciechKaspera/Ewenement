import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { IntroComponent } from './intro/intro.component';
import { AboutComponent } from './about/about.component';
import { OfferComponent } from './offer/offer.component';
import { ReferencesComponent } from './references/references.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ParallaxDirective } from './shared/parallax.directive';
import { ParallaxComponent } from './parallax/parallax.component';
import { FooterComponent } from './footer/footer.component';

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
    ParallaxDirective,
    ParallaxComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
