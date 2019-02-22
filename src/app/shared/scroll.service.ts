import { Injectable, ElementRef } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  scrollListener;
  smoothScrolling = false;
  activeSection: string;
  routableSections = [];
  changeActiveSectionObserver: Observer<string>;
  changeActiveSectionObservable: Observable<string> = new Observable(observer => {
    this.changeActiveSectionObserver = observer;
  })
  changeParallaxObserver: Observer<{ initialTop: number, background: string, id: string }>;
  changeParallaxObservable: Observable<{ initialTop: number, background: string, id: string }> = new Observable(observer => {
    this.changeParallaxObserver = observer;
  })
  activeParallax: string;
  headerHeight = 69;
  headerFixedObserver: Observer<boolean>;
  headerFixedObservable: Observable<boolean> = new Observable(observer => {
    this.headerFixedObserver = observer;
  });
  headerFixed = false;
  parallaxSections = [];

  listen() {
    const screenHeight: number = window.innerHeight;

    const routableSections = document.getElementsByClassName('routableSection');

    const parallaxSections = document.getElementsByClassName('parallax-section');

    for (let i = 0; i < routableSections.length; i++) {
      this.routableSections.push({
        section: routableSections[i],
        sectionName: routableSections[i].id,
      })
    }

    for (let i = 0; i < parallaxSections.length; i++) {
      this.parallaxSections.push({
        parallax: parallaxSections[i],
        parallaxName: parallaxSections[i].id,
      })
    }

    this.scrollListener = window.addEventListener('scroll', () => {

      const windowPosition = window.scrollY;

      if (windowPosition > (screenHeight - this.headerHeight) && !this.headerFixed) {
        this.headerFixed = true;
        this.headerFixedObserver.next(true);
      } else if (windowPosition < (screenHeight - this.headerHeight) && this.headerFixed) {
        this.headerFixed = false;
        this.headerFixedObserver.next(false);
      }

      const currentSection = this.getActiveSection(windowPosition, this.routableSections);

      if (currentSection !== this.activeSection) {
        this.activeSection = currentSection;
        this.changeActiveSectionObserver.next(currentSection);
      }

      const currentParallax = this.getActiveParallax(windowPosition, this.parallaxSections);

      if (currentParallax !== this.activeParallax) {
        this.activeParallax = currentParallax;

        this.changeParallaxObserver.next(
          {
            initialTop: currentParallax,
            background: 'uuk',
            id: 'uuk'
          }
        );
      }

    });
  }

  navigate(sectionName) {
    if (!this.smoothScrolling) {
      this.activeSection = sectionName;
      this.changeActiveSectionObserver.next(sectionName);
      this.smoothScrollTo(sectionName);
    }
  }

  getActiveSection(scrollPosition, sections): string {
    let activeSection: string;
    for (let i = 0; i < sections.length; i++) {
      if (scrollPosition < sections[i].section['offsetTop'] - this.headerHeight) {
        break;
      }
      activeSection = sections[i].sectionName;
    }
    return activeSection;
  }

  getActiveParallax(scrollPosition, sections) {
    let activeSection;
    for (let i = 0; i < sections.length; i++) {
      if (scrollPosition < sections[i].parallax['offsetTop'] - this.headerHeight) {
        break;
      }
      activeSection = sections[i];
    }
    return activeSection;
  }

  smoothScrollTo(sectionName) {
    this.smoothScrolling = true;
    const destination = this.routableSections.filter(sectionPositon => sectionPositon.sectionName === sectionName)[0].section['offsetTop'] - this.headerHeight;
    const initialWindowPosition = window.scrollY;
    const difference = Math.abs(initialWindowPosition - destination);
    if (difference < 50) {
      window.scrollTo(0, destination + 1);
      this.smoothScrolling = false;
      return;
    }
    let currentPosition = initialWindowPosition;
    if (initialWindowPosition - destination > 0) {
      const scrollInterval = setInterval(() => {
        currentPosition -= difference / 50;
        window.scrollTo(0, currentPosition);
        if (Math.abs(currentPosition - destination) < 20) {
          window.scrollTo(0, destination + 1);
          clearInterval(scrollInterval);
          this.smoothScrolling = false;
          return;
        }
      }, 10)
    } else {
      const scrollInterval = setInterval(() => {
        currentPosition += difference / 50;
        window.scrollTo(0, currentPosition);
        if (Math.abs(currentPosition - destination) < 20) {
          window.scrollTo(0, destination + 1);
          clearInterval(scrollInterval);
          this.smoothScrolling = false;
          return;
        }
      }, 10)
    }

    window.scrollTo(0, destination);
  }

  constructor() { }
}
