import { ChartOptions } from 'chart.js';
import {Router} from "@angular/router";
import { Component } from '@angular/core';

import {AuthService} from "../core/services/auth.service";
import {TokenService} from "../core/services/token.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
// export class DashboardComponent implements OnInit {
export class DashboardComponent {

  pieChartOptions: ChartOptions<'doughnut'> = {responsive: false,};
  pieChartLabels : string[] = [];
  pieChartDatasets : any;
  pieChartLegend = true;
  pieChartPlugins = [];
  dataPieChart: number[] = [];

  barChartOptions: ChartOptions<'bar'> = {responsive: false,};
  barChartLabels : string[] = [];
  barChartDatasets : any;
  barChartLegend = true;
  barChartPlugins = [];
  dataBarChart: number[] = [];
  dataUser: any;

  constructor(
    public authService: AuthService,
    public token: TokenService,
    public router: Router,
  ) {
    // if have token then redirect to login
    if (!this.token.getToken()){
      this.router.navigate(['login']);
    }

    this.authService.dashboard().subscribe((data: any) => {
      const { tableUsers, chartDonut, chartBar } = data;

      this.dataUser = tableUsers;
      if (chartDonut) chartDonut.map((val:any) => this.pushPieChart(val));
      if (chartBar) chartBar.map((val:any) => this.pushPieChartbar(val));
    });

  }
  ngOnInit() {}

  pushPieChart(data:any){
    this.pieChartLabels.push(data.name);
    this.dataPieChart.push(data.value);
    this.pieChartDatasets = [{ data:this.dataPieChart}];
  }

  pushPieChartbar(data:any){
    this.barChartLabels.push(data.name);
    this.dataBarChart.push(data.value);
    this.barChartDatasets = [{ data:this.dataBarChart, label: 'Chart Bar', backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
    ]}];
  }
}
