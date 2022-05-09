import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyserviceService } from '../myservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.scss'],
})
export class PredictComponent implements OnInit {
  selectedType: string | undefined;
  makeoffer: boolean | false = false;
  age: any = '';
  weight: any = '';
  gender: any = '';
  hipToWaistRatio: any = '';
  bodyType: any = '';
  height: any = '';
  result: string = '';
  size: any;
  constructor(
    private http: HttpClient,
    private myservice: MyserviceService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    console.log(this.gender);
  }

  async prediction() {
    console.log(
      this.age,
      this.weight,
      this.gender,
      this.hipToWaistRatio,
      this.bodyType
    );
    let body = {
      age: this.age,
      gender: this.gender,
      weight: this.weight,
      hipWaistRatio: this.hipToWaistRatio,
      bodyType: this.bodyType,
      height: this.height,
    };
    await this.http
      .post<any>(
        'https://powerful-tundra-12370.herokuapp.com/BodyMeasurements',
        body
      )
      .subscribe({
        next: (data) => {
          console.log('here at data');
          this.size = data['Tsize'];
          this.myservice.size = data;
          console.log(this.myservice.size);
          console.log(data);
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }
  goback() {
    this.router.navigateByUrl('detail');
  }
  show() {
    this.selectedType = 'initial';
  }
  nextgender() {
    this.selectedType = 'gender';
  }
  nextage() {
    this.selectedType = 'age';
  }
  nextweight() {
    this.selectedType = 'weight';
  }
  nextheight() {
    this.selectedType = 'height';
  }
  nextratio() {
    this.selectedType = 'ratio';
  }
  submit() {
    this.selectedType = '';
    this.selectedType = 'submit';
    console.log('done');
    this.prediction();
  }
  close() {
    this.selectedType = '';
  }
}
