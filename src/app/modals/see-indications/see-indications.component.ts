import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-see-indications',
  templateUrl: './see-indications.component.html',
  styleUrls: ['./see-indications.component.css']
})
export class SeeIndicationsComponent implements OnInit {
  @Input() indicaciones: any;
  @Input() medicamentos: any;

  private modalRef: NgbModalRef;

  constructor(private modalService: NgbModal){}

  open(content){
    this.modalRef = this.modalService.open(content);
  }

  ngOnInit() {}

}
