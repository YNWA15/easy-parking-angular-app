import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-rules-for-using-the-app',
  templateUrl: './rules-for-using-the-app.component.html',
  styleUrls: ['./rules-for-using-the-app.component.scss'],
})
export class RulesForUsingTheAppComponent implements OnInit {
  constructor(
    public modalRef: MdbModalRef<RulesForUsingTheAppComponent>,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      let b = document.getElementsByClassName('modal-content')[document.getElementsByClassName('modal-content').length - 1] as HTMLElement;
      b.style.height = "90%";
      b.scrollTop = 0;
    }, 400)
  }
  close() {
    this.modalRef.close();
    this.activeModal.close();
  }
}
