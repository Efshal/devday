import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('secondSection', { static: true })
  secondSection!: ElementRef<HTMLDivElement>;
  @ViewChild('menu', { static: true }) menu!: ElementRef<HTMLDivElement>;
  @ViewChild('menuSecond', { static: true })
  menuSecond!: ElementRef<HTMLDivElement>;
  @ViewChild('imageFirst', { static: true })
  imageFirst!: ElementRef<HTMLDivElement>;
  @ViewChild('imageSecond', { static: true })
  imageSecond!: ElementRef<HTMLDivElement>;
  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    this.initialAnimations();
    this.initScrollAnimations();
  }

  initScrollAnimations(): void {
    gsap.to(this.imageFirst.nativeElement, {
      scrollTrigger: {
        trigger: this.imageFirst.nativeElement,
        scrub: true,

        start: '110% center',
      } as gsap.plugins.ScrollTriggerInstanceVars,
      duration: 1.1,
      scale: 1.2,
      height: 250,
    });
    gsap.to(this.imageSecond.nativeElement, {
      scrollTrigger: {
        trigger: this.imageSecond.nativeElement,
        scrub: true,
        start: '80% center',
      } as gsap.plugins.ScrollTriggerInstanceVars,
      duration: 1.1,
      scale: 1.2,
      height: 380,
    });

    gsap.to(this.document.querySelector('.heading-1'), {
      scrollTrigger: {
        trigger: this.document.querySelector('.heading-1'),
        scrub: true,
        start: '150% center',
      } as gsap.plugins.ScrollTriggerInstanceVars,
      color: '#fff',
      duration: 1.5,
    });
    gsap.to(this.document.querySelector('.paragraph'), {
      scrollTrigger: {
        trigger: this.document.querySelector('.paragraph'),
        scrub: true,
        start: '150% center',
      } as gsap.plugins.ScrollTriggerInstanceVars,
      color: '#fff',
      duration: 1.5,
    });
    gsap.to(this.document.querySelector('.btn'), {
      scrollTrigger: {
        trigger: this.document.querySelector('.btn'),
        scrub: true,
        start: '150% center',
      } as gsap.plugins.ScrollTriggerInstanceVars,
      color: '#fff',
      duration: 1.5,
    });

    gsap.from(this.document.querySelector('#about'), {
      scrollTrigger: {
        trigger: this.document.querySelector('#about'),
        scrub: true,
        toggleClass: 'active',
        start: 'top center',
      } as gsap.plugins.ScrollTriggerInstanceVars,
      duration: 1.5,
      y: 40,
      opacity: 0,
    });
    gsap.from(this.document.querySelector('#buy'), {
      scrollTrigger: {
        trigger: this.document.querySelector('#buy'),
        scrub: true,
        toggleClass: 'active',
        start: 'top center',
      } as gsap.plugins.ScrollTriggerInstanceVars,
      duration: 1.5,
      y: 40,
      opacity: 0,
    });
    gsap.from(this.document.querySelector('.box'), {
      scrollTrigger: {
        trigger: this.document.querySelector('.box'),
        scrub: true,
        toggleClass: 'active',
        start: '-10% center',
      } as gsap.plugins.ScrollTriggerInstanceVars,
      duration: 1.5,
      width: 0,
      opacity: 0,
    });
    gsap.from(this.document.querySelector('.info-1__visual img'), {
      scrollTrigger: {
        trigger: this.document.querySelector('.info-1__visual img'),
        scrub: true,
        toggleClass: 'active',
        start: '-60% bottom',
      } as gsap.plugins.ScrollTriggerInstanceVars,
      duration: 1.5,
      height: 0,
      scale: '1.3',
      opacity: 0,
    });

    gsap.from(this.document.querySelector('.quote'), {
      scrollTrigger: {
        trigger: this.document.querySelector('.quote'),
        scrub: true,
        toggleClass: 'active',
        start: '-60% bottom',
      } as gsap.plugins.ScrollTriggerInstanceVars,
      duration: 1.5,
      opacity: 0,
    });
    gsap.from(this.document.querySelector('.info-1__text .heading-3'), {
      scrollTrigger: {
        trigger: this.document.querySelector('.info-1__text .heading-3'),
        scrub: true,
        toggleClass: 'active',
        start: '-60% bottom',
      } as gsap.plugins.ScrollTriggerInstanceVars,
      duration: 1.5,
      y: 40,
      opacity: 0,
    });
    gsap.from(this.document.querySelector('.info-1__text .paragraph'), {
      scrollTrigger: {
        trigger: this.document.querySelector('.info-1__text .paragraph'),
        scrub: true,
        toggleClass: 'active',
        start: '-60% bottom',
      } as gsap.plugins.ScrollTriggerInstanceVars,
      duration: 1.5,
      y: 40,
      opacity: 0,
    });
    gsap.from(this.document.querySelector('.info-1__text .btn--learn'), {
      scrollTrigger: {
        trigger: this.document.querySelector('.info-1__text .btn--learn'),
        scrub: true,
        toggleClass: 'active',
        start: '-60% bottom',
      } as gsap.plugins.ScrollTriggerInstanceVars,
      duration: 1.5,
      y: 40,
      opacity: 0,
    });
  }

  initialAnimations(): void {
    gsap.from(this.menu.nativeElement.childNodes, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      stagger: 0.2,
      delay: 0.5,
    });
    gsap.from(this.menuSecond.nativeElement.childNodes, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      stagger: 0.2,
      delay: 0.8,
    });
    gsap.from(this.imageFirst.nativeElement, {
      duration: 0.7,
      opacity: 0,
      y: -30,
      delay: 0.5,
    });
    gsap.from(this.imageSecond.nativeElement, {
      duration: 0.7,
      opacity: 0,
      y: -30,
      delay: 0.6,
    });
    gsap.from(this.document.querySelector('.heading-1'), {
      duration: 0.7,
      opacity: 0,
      y: -30,
      delay: 0.6,
    });
    gsap.from(this.document.querySelector('.paragraph'), {
      duration: 0.7,
      opacity: 0,
      y: -30,
      delay: 0.7,
    });
    gsap.from(this.document.querySelector('.btn'), {
      duration: 0.7,
      opacity: 0,
      y: -30,
      delay: 0.8,
    });
  }
}

//   constructor(private readonly router: Router) {}
//   size() {
//     console.log('ok');
//     this.router.navigateByUrl('predict');
//     console.log('okk');
//   }
//   measure() {
//     console.log('ok');
//     this.router.navigateByUrl('detail');
//   }
//   tryon() {
//     console.log('ok');
//     this.router.navigateByUrl('detail');
//   }
//   // @ViewChild('myNameElem')
//   // myNameElem: any;
//   // title = 'cameraApp';
//   // webcamImage: WebcamImage | undefined;
//   // Known_distance = 76.2;
//   // Known_width = 14.3;
//   // handleImage(webcamImage: WebcamImage) {
//   //   this.webcamImage = webcamImage;
//   //   // this.loadAndPredict();
//   // }
//   // Focal_Length_Finder(
//   //   measured_distance: any,
//   //   real_width: any,
//   //   width_in_rf_image: any
//   // ) {
//   //   const focal_length = (width_in_rf_image * measured_distance) / real_width;
//   //   return focal_length;
//   // }
//   // Distance_finder(
//   //   Focal_Length: any,
//   //   real_face_width: any,
//   //   face_width_in_frame: any
//   // ) {
//   //   const distance = (real_face_width * Focal_Length) / face_width_in_frame;

//   //   return distance;
//   // }
//   // async loadAndPredict() {
//   //   const img: any = document.getElementById('image');
//   //   const ref_image: any = document.getElementById('refImage');

//   //   console.log('asd', img);
//   //   const detectorConfig = {
//   //     modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
//   //   };
//   //   const detector = await poseDetection.createDetector(
//   //     poseDetection.SupportedModels.MoveNet,
//   //     detectorConfig
//   //   );
//   //   const poses = await detector.estimatePoses(img);
//   //   console.log(poses);
//   //   const poses2 = await detector.estimatePoses(ref_image);
//   //   const face_width_in_frame: any =
//   //     poses[0].keypoints[1].x - poses[0].keypoints[2].x;

//   //   const ref_image_face_width: any =
//   //     poses2[0].keypoints[1].x - poses2[0].keypoints[2].x;
//   //   const Focal_length_found = this.Focal_Length_Finder(
//   //     this.Known_distance,
//   //     this.Known_width,
//   //     ref_image_face_width
//   //   );

//   //   const Distance = this.Distance_finder(
//   //     Focal_length_found,
//   //     this.Known_width,
//   //     face_width_in_frame
//   //   );

//   //   console.log(Distance);

//   //   const shirtLength = poses[0].keypoints[12].y - poses[0].keypoints[6].y;
//   //   const myX = Distance / 21.5;
//   //   console.log(myX);
//   //   console.log('shirt length predicted: ', (shirtLength / 37.79) * myX);
//   // }
// }
