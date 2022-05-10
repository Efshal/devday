import { Component, AfterViewInit } from '@angular/core';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { Pose } from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';
// import { Skeleton } from './skeleton';
import { Router } from '@angular/router';
import { getAngle, getDistance, getMiddle } from './vectors';
let videoEl: any;
let index = 0;
let shirts = [
  '../../assets/shirt0.png',
  '../../assets/shirt1.png',
  '../../assets/shirt2.png',
  '../../assets/shirt3.png',
  '../../assets/shirt4.png',
];
let Body = shirts[index];
let body = new Image();
body.src = Body;
class Skeleton {
  constructor(private ctx: CanvasRenderingContext2D) {
    // let Body = this.tryRoom.Body;
  }

  private drawBody(pose: Pose) {
    const leftShoulder = pose.keypoints.find(
      (keypoint) => keypoint.name === 'left_shoulder'
    );
    const rightShoulder = pose.keypoints.find(
      (keypoint) => keypoint.name === 'right_shoulder'
    );
    const leftHip = pose.keypoints.find(
      (keypoint) => keypoint.name === 'left_hip'
    );
    const rightHip = pose.keypoints.find(
      (keypoint) => keypoint.name === 'right_hip'
    );

    if (!leftShoulder || !rightShoulder || !leftHip || !rightHip) {
      return;
    }

    const shoulderWidth = 517;
    const hipToShoulderHeight = 745;

    if (leftShoulder && rightShoulder && leftHip && rightHip) {
      const angle = getAngle(leftShoulder, rightShoulder);
      const distance = getDistance(leftShoulder, rightShoulder);
      const xScale = distance / shoulderWidth;
      const middleShoulder = getMiddle(leftShoulder, rightShoulder);
      const middleHip = getMiddle(leftHip!, rightHip!);
      const shoulderToHipDistance = getDistance(middleShoulder, middleHip);
      const yScale = shoulderToHipDistance / hipToShoulderHeight;

      this.drawImage({
        image: body,
        x: middleShoulder.x,
        y: middleShoulder.y,
        height: body.height * yScale,
        width: body.width * xScale,
        rotation: angle,
        offsetX: 0.5,
        offsetY: 0.1,
      });
    }
  }

  private drawImage(options: {
    image: HTMLImageElement;
    x: number;
    y: number;
    height: number;
    width: number;
    rotation: number;
    offsetX: number;
    offsetY: number;
  }): void {
    const { image, x, y, height, width, rotation, offsetX, offsetY } = options;
    // save the unrotated context of the canvas so we can restore it later
    this.ctx.save();

    // move to the center of the canvas
    this.ctx.translate(x, y);

    // rotate the canvas to the specified angle
    this.ctx.rotate(((180 + rotation) * Math.PI) / 180);

    // draw the image because ctx is rotated, the image will be rotated also
    this.ctx.drawImage(
      image,
      0 - width * offsetX,
      0 - height * offsetY,
      width,
      height
    );

    // restore the unrotated ctx
    this.ctx.restore();
  }

  public draw(pose: Pose) {
    // this.drawHead(pose);
    this.drawBody(pose);
    // this.drawLeftUpperArm(pose);
    // this.drawRightUpperArm(pose);
    // this.drawLeftForearm(pose);
    // this.drawRightForearm(pose);
    // this.drawLeftHand(pose);
    // this.drawRightHand(pose);
    // this.drawLeftThigh(pose);
    // this.drawRightThigh(pose);
    // this.drawLeftLowerLeg(pose);
    // this.drawRightLowerLeg(pose);
  }
}

@Component({
  selector: 'app-try-room',
  templateUrl: './try-room.component.html',
  styleUrls: ['./try-room.component.css'],
})
export class TryRoomComponent implements AfterViewInit {
  canvasEl: any;
  ctx: any;
  constructor(private readonly router: Router) {}

  ngAfterViewInit(): void {
    videoEl = document.querySelector<HTMLVideoElement>('video')!;
    this.canvasEl = document.querySelector<HTMLCanvasElement>('canvas')!;
    this.ctx = this.canvasEl.getContext('2d')!;
    this.start();
  }
  async initCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user',
        width: { ideal: 640 },
        height: { ideal: 480 },
      },
      audio: false,
    });

    let onVideoReady: (ready: boolean) => void;
    const videoReadyPromise = new Promise(
      (resolve) => (onVideoReady = resolve)
    );
    videoEl.onloadedmetadata = () => onVideoReady(true);

    videoEl.srcObject = stream;

    return videoReadyPromise;
  }

  async initPoseDetection() {
    const model = poseDetection.SupportedModels.BlazePose;
    const detector = await poseDetection.createDetector(model, {
      runtime: 'tfjs',
      modelType: 'lite',
      maxPoses: 1,
    } as poseDetection.BlazePoseTfjsModelConfig);

    return detector;
  }

  async start() {
    await this.initCamera();
    const detector = await this.initPoseDetection();
    const skeleton = new Skeleton(this.ctx);

    let render = async () => {
      const poses = await detector.estimatePoses(videoEl!, {
        maxPoses: 1,
        flipHorizontal: false,
        scoreThreshold: 0.4,
      });

      this.ctx.clearRect(0, 0, 640, 480);

      if (poses[0]) {
        skeleton.draw(poses[0]);
      }

      requestAnimationFrame(render);
    };

    render();
  }

  goBack() {
    this.router.navigateByUrl('detail');
  }

  changeLeft() {
    index -= 1;
    if (index == 5) {
      index = -1;
    }
    index = 4;
    Body = shirts[index];
    body = new Image();
    body.src = Body;
    this.start();
  }

  changeRight() {
    index += 1;
    if (index == 5) {
      index = 0;
    }
    Body = shirts[index];
    body = new Image();
    body.src = Body;
    this.start();
  }
}
