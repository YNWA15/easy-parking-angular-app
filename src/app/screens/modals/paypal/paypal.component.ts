import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { render } from 'creditcardpayments/creditCardPayments'
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnDestroy, AfterViewInit {
  @Input() amaunt!: number;
  @Input() isInEditMode: boolean = false;;
  @Output() onApprove = new EventEmitter();
  loading = true;
  constructor(private reservationService: ReservationService, private route: Router) {
   // setTimeout(() => {
      // console.log('amaunt', this.amaunt != null ? this.amaunt: 7)
      // this.loading = false;
      // let a = this.amaunt!;
      // render({
      //   id: "#myPaypalButtons",
      //   currency: "BGN",
      //   value:(( this.amaunt != null) ? this.amaunt!.toString(): '7'),
      //   onApprove: (details) => {
      //     console.log("DET", details)
      //     this.successfullTransaction();
      //   },
      // })
  //  }, 1000)
  }
  ngAfterViewInit(): void {
    // console.log('amaunt', this.amaunt != null ? this.amaunt: 7)
    this.loading = false;
    let a = this.amaunt!;
    render({
      id: "#myPaypalButtons",
      currency: "BGN",
      value:(( this.amaunt != null) ? this.amaunt!.toString(): '7'),
      onApprove: (details) => {
        // console.log("DET", details)
        this.successfullTransaction();
      },
    })
  }
  ngOnDestroy(): void {
    // console.log('DESTROY')
  }
  successfullTransaction() {
    this.onApprove.emit();
    if(!this.isInEditMode){
      this.route.navigate(['/welcome']);
    } 
  }
}