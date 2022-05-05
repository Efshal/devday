import {
  Component,
  VERSION,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { PixelInput } from '@tensorflow-models/pose-detection/dist/shared/calculators/interfaces/common_interfaces';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import { MyserviceService } from '../myservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  getimage: any | false = false;
  heightcm: any;
  shirtLengthcm: any;
  armLengthcm: any;
  pantLengthcm: any;
  chest: any;
  waist: any;
  hips: any;
  shoulder: any;
  collar: any;
  measure: boolean | false = false;
  webcamImage: WebcamImage | undefined;
  Known_distance = 76.2;
  Known_width = 14.3;
  size: any;
  constructor(
    private myservice: MyserviceService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.size = this.myservice.size;
    console.log(this.size);
    this.chest = this.size['chest'];
    this.waist = this.size['wasit'];
    this.hips = this.size['hip'];
    this.shoulder = this.size['shoulder'];
    this.collar = this.size['collar'];
  }

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    // this.loadAndPredict();
  }
  Focal_Length_Finder(
    measured_distance: any,
    real_width: any,
    width_in_rf_image: any
  ) {
    const focal_length = (width_in_rf_image * measured_distance) / real_width;
    return focal_length;
  }
  Distance_finder(
    Focal_Length: any,
    real_face_width: any,
    face_width_in_frame: any
  ) {
    const distance = (real_face_width * Focal_Length) / face_width_in_frame;

    return distance;
  }
  async loadAndPredict() {
    console.log('okokok', this.getimage);
    const img: any = document.getElementById('image');
    const ref_image: any = document.getElementById('refImage');

    console.log('asd', img);
    const detectorConfig = {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
    };
    console.log('check');
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      detectorConfig
    );
    console.log('check');
    const poses = await detector.estimatePoses(img);
    console.log('check');
    console.log(poses);
    console.log('check');
    const poses2 = await detector.estimatePoses(ref_image);
    const face_width_in_frame: any =
      poses[0].keypoints[1].x - poses[0].keypoints[2].x;

    const ref_image_face_width: any =
      poses2[0].keypoints[1].x - poses2[0].keypoints[2].x;
    const Focal_length_found = this.Focal_Length_Finder(
      this.Known_distance,
      this.Known_width,
      ref_image_face_width
    );
    console.log('check');
    const Distance = this.Distance_finder(
      Focal_length_found,
      this.Known_width,
      face_width_in_frame
    );
    console.log('check');
    console.log(Distance);
    const height = poses[0].keypoints[16].y - poses[0].keypoints[2].y;
    const shirtLength = poses[0].keypoints[12].y - poses[0].keypoints[6].y;
    const armLength = poses[0].keypoints[10].y - poses[0].keypoints[6].y;
    const pantLength = poses[0].keypoints[16].y - poses[0].keypoints[12].y;
    const myX = Distance / 21.5;
    this.heightcm = ((height / 37.795) * myX).toFixed(2);
    this.shirtLengthcm = ((shirtLength / 37.795) * myX).toFixed(2);
    this.armLengthcm = ((armLength / 37.795) * myX).toFixed(2);
    this.pantLengthcm = ((pantLength / 37.795) * myX).toFixed(2);
    this.chest = this.size['chest'];
    this.waist = this.size['wasit'];
    this.hips = this.size['hip'];
    this.shoulder = this.size['shoulder'];
    this.collar = this.size['collar'];
    console.log(myX);
    console.log('shirt length predicted: ', (shirtLength / 37.79) * myX);
    // this.bodymeasure();
    this.getimage = 'true';
  }
  bodymeasure() {
    console.log('here');
    this.measure = true;
  }
  goback() {
    this.router.navigateByUrl('detail');
  }

  submit() {
    this.getimage = 'false';
  }
}
