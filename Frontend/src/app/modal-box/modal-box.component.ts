import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-box',
  templateUrl: './modal-box.component.html',
  styleUrls: ['./modal-box.component.scss'],
})
export class ModalBoxComponent implements OnInit {
  @Input() show: boolean | undefined;
  @Input() title: string | undefined;
  @Input() number: string | undefined;
  @Output() closed = new EventEmitter();
  modalCtrl: any;
  constructor() {}

  ngOnInit() {
    console.log(this.title);
    console.log(this.show);
  }
  close() {
    this.closed.emit();
  }
}
