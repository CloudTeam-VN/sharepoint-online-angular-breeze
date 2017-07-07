import { Component, OnInit } from '@angular/core';
import { AdalService } from '../../services/adal-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'Cloud Team VN';
  userInfo: any;
  constructor(private adalSvc: AdalService) {

  }

  ngOnInit() {
    this.userInfo = this.adalSvc.userInfo();
  }

}
