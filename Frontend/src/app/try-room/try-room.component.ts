import { Component, AfterViewInit } from '@angular/core';
import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';
import { Skeleton } from './skeleton';

@Component({
  selector: 'app-try-room',
  templateUrl: './try-room.component.html',
  styleUrls: ['./try-room.component.css'],
})
export class TryRoomComponent implements AfterViewInit {
  videoEl: any;
  canvasEl: any;
  ctx: any;
  constructor() {}

  ngAfterViewInit(): void {
    this.videoEl = document.querySelector<HTMLVideoElement>('video')!;
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
    this.videoEl.onloadedmetadata = () => onVideoReady(true);

    this.videoEl.srcObject = stream;

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
      const poses = await detector.estimatePoses(this.videoEl!, {
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
}
