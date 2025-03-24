import { Component, AfterViewInit, NgZone, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import Swiper from 'swiper';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  isDarkMode = false;
toggleDarkMode() {
  this.isDarkMode = !this.isDarkMode;
}
projects = [
  {
    title: 'Mobile App for University Room Search',
    description: 'A cross-platform mobile application developed using Ionic and the MEAN Stack to help university students find and post available rooms. The app integrates external APIs such as Idealista for additional listings and Google Maps API from Google Cloud Platform (GCP) for location-based search and navigation.',
    technologies: ['Ionic', 'MEAN Stack', 'Google Maps API', 'Idealista API'],
    images: ['../../assets/appimg.png', '../../assets/img1.jpg', '../../assets/img2.jpg', '../../assets/img3.jpg'],
    githubLink: 'https://github.com/yourusername/task-manager'
  }
  ,
  {
    title: 'Multilingual Document Translator',
    description: 'A web-based platform that allows users to upload and translate documents into multiple languages using the MEAN stack.',
    images: ['../../assets/intrad1.png', '../../assets/inTrad2.png', '../../assets/inTrad3.png', '../../assets/inTrad4.png'],
    githubLink: 'https://github.com/yourusername/portfolio',
    technologies: ['MongoDB', 'Express.js', 'Angular', 'Node.js', 'REST API', 'Cloud Storage']
  },
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce website that allows users to search, browse, and purchase products, while an admin panel enables product and order management.',
    images: ['../../assets/E1.png', '../../assets/E2.png', '../../assets/E3.png'],
    githubLink: 'https://github.com/yourusername/ecommerce-platform',
    technologies: ['MongoDB', 'Express.js', 'Angular', 'Node.js', 'JWT Authentication', 'Stripe API', 'Admin Dashboard']
  },
  {
    title: 'Football Live Bot',
    description: 'A Telegram bot that provides real-time football match updates, team alerts, and goal notifications.',
    images: ['../../assets/S1.jpg', '../../assets/S2.jpg', '../../assets/S3.jpg', '../../assets/S4.jpg'],
    githubLink: 'https://github.com/yourusername/football-bot',
    technologies: ['Python', 'Telegram Bot API', 'Requests', 'RapidAPI - Live Football Data', 'SQLite', 'AsyncIO']
  }
];

swipers: Swiper[] = [];
private autoplaySubscriptions: Subscription[] = [];

constructor(private ngZone: NgZone) {}

ngAfterViewInit() {
  this.ngZone.runOutsideAngular(() => {
    setTimeout(() => {
      this.projects.forEach((_, index) => {
        const swiper = new Swiper(`.swiper-container-${index}`, {
          loop: true,
          navigation: {
            nextEl: `.swiper-container-${index} .swiper-button-next`,
            prevEl: `.swiper-container-${index} .swiper-button-prev`,
          },
        });

        this.swipers[index] = swiper;


        const autoplayInterval = 5000;
        const autoplaySubscription = interval(autoplayInterval).subscribe(() => {
          if (swiper) {
            swiper.slideNext();
          }
        });
        this.autoplaySubscriptions[index] = autoplaySubscription;
      });
    }, 0);
  });
}

ngOnDestroy() {
  this.swipers.forEach(swiper => swiper.destroy());
  this.autoplaySubscriptions.forEach(subscription => subscription.unsubscribe());
}

onMouseEnter(index: number) {
  if (this.autoplaySubscriptions[index]) {
    this.autoplaySubscriptions[index].unsubscribe();
  }
}

onMouseLeave(index: number) {
  const swiper = this.swipers[index];
  if (swiper) {
    const autoplayInterval = 5000;
    const autoplaySubscription = interval(autoplayInterval).subscribe(() => {
      swiper.slideNext();
    });
    this.autoplaySubscriptions[index] = autoplaySubscription;
  }
}

onNextClick(index: number) {
  if (this.swipers[index]) {
    this.swipers[index].slideNext();
  }
}


onPrevClick(index: number) {
  if (this.swipers[index]) {
    this.swipers[index].slidePrev();
  }
}

}

