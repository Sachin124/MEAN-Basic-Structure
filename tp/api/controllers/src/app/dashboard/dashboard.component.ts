import {
  Component,
  OnInit,
  AfterViewInit,
  HostListener
} from "@angular/core";
import {
  NotificationService
} from "../public service/notification.service";
import {
  DateTimeAdapter,
  OWL_DATE_TIME_FORMATS,
  OWL_DATE_TIME_LOCALE,
  OwlDateTimeComponent,
  OwlDateTimeFormats
} from 'ng-pick-datetime';
import {
  FormControl
} from '@angular/forms';
import {
  MomentDateTimeAdapter
} from 'ng-pick-datetime-moment';
import * as _moment from 'moment';
import {
  Moment
} from 'moment';
import {
  DatePipe
} from "@angular/common";
import { UpperAnimations } from "../animation/animation3";
const moment = (_moment as any).default ? (_moment as any).default : _moment;

export const MY_MOMENT_DATE_TIME_FORMATS: OwlDateTimeFormats = {
  parseInput: 'MM/YYYY',
  fullPickerInput: 'l LT',
  datePickerInput: 'MM/YYYY',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};
declare const $: any;

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  animations: [UpperAnimations],
  styles: [` 
  .chart {
    position: relative; height:40vh; width:80vw
  }`],
  providers: [
    // `MomentDateTimeAdapter` and `OWL_MOMENT_DATE_TIME_FORMATS` can be automatically provided by importing
    // `OwlMomentDateTimeModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateTimeAdapter,
      useClass: MomentDateTimeAdapter,
      deps: [OWL_DATE_TIME_LOCALE]
    },

    {
      provide: OWL_DATE_TIME_FORMATS,
      useValue: MY_MOMENT_DATE_TIME_FORMATS
    },
    DatePipe
  ],
  host: {
    '[@pageAnimations]': ''
  }

})
export class DashboardComponent implements OnInit, AfterViewInit {
  public dateTime = new FormControl(moment());
  rows: any = {};
  currentTime: string;

  // @HostListener('window:onload', [ '$event' ])
  // unloadHandler(event) {
  //   console.log(event);
  //   this.startTime()
  //   // localStorage.removeItem('currentUser');
  // }
  
  maxDate = new Date();

  // Pie
  public pieChartType: string = 'pie';
  public pieChartLabels: string[] = ['Pending', 'Completed', 'Running', 'UnAssigned'];
  public pieChartData: number[] = [0, 0, 0, 0];

  // CHART COLOR.
  pieChartColor: any = [{
    backgroundColor: ['rgba(255, 51, 15, 0.8)',
      'rgba(105, 180, 15, 0.8)',
      'rgba(131, 194, 244, 0.8)',
      'rgba(180, 0, 0, 0.8)',
      'rgba(255, 102, 0, 0.9)'
    ]
  }]

  public pieChartOptions: any = {
    responsive: true
  };
  loading: boolean;
  today: Date;

  constructor(private notificationService: NotificationService, private datePipe: DatePipe) {}
  public ngOnInit() {
    this.rows = '';
    var today = new Date();    
    this.getStatus(this.datePipe.transform(today, 'MM-yyyy'));
  }
  ngAfterViewInit() {}



  getStatus(date) {
    this.loading = true;

    this.notificationService.getDashboardDetails(date).subscribe(res => {
      if (res.status == true) {
        this.rows = res.data;
        this.pieChartData = [res.data.Pending, res.data.Completed, res.data.Running, res.data.UnAssigned];
        this.loading = false;
      }
    }, error => {
      this.loading = false;

      console.log(error);
    })
  }




  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.dateTime.value;
    ctrlValue.year(normalizedYear.year());
    this.dateTime.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: OwlDateTimeComponent < Moment > ) {
    const ctrlValue = this.dateTime.value;

    ctrlValue.month(normalizedMonth.month());
    this.dateTime.setValue(ctrlValue);

    let transformDate = this.datePipe.transform(this.dateTime.value._d, 'MM-yyyy');
    this.loading = true;

    datepicker.close();
    setTimeout(() => {
      this.getStatus(transformDate)
    }, 2000);
  }

  public chartClicked(e: any): void {}

  public chartHovered(e: any): void {}
}