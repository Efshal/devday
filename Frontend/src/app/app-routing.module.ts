import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShirtPageComponent } from './shirt-page/shirt-page.component';
import { PredictComponent } from './predict/predict.component';
import { CameraComponent } from './camera/camera.component';
import { ImageComponent } from './image/image.component';
import { TryRoomComponent } from './try-room/try-room.component';
const routes: Routes = [
  { path: 'detail', component: ShirtPageComponent },
  { path: 'predict', component: PredictComponent },
  { path: 'measure', component: CameraComponent },
  { path: 'image', component: ImageComponent },
  { path: 'try-room', component: TryRoomComponent },
  { path: '**', redirectTo: '/detail', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
