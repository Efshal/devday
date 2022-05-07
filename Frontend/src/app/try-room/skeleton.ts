import { Pose } from '@tensorflow-models/pose-detection';
import { getAngle, getDistance, getMiddle } from './vectors';

// Skeleton parts
let Body = '../../assets/arBody.png';

// Load the skeleton parts
const body = new Image();
body.src = Body;

export class Skeleton {
  constructor(private ctx: CanvasRenderingContext2D) {}

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
      console.log('hello', distance);
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
