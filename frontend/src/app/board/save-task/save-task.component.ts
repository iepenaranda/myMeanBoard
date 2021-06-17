import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.css']
})
export class SaveTaskComponent implements OnInit {
  public taskData: any;
  public errorMessage: string;

  constructor() {
    this.taskData = {};
    this.errorMessage = '';
  }
  ngOnInit(): void {
  }

  saveTask(){
    if (!this.taskData.name || !this.taskData.description) {
      console.log('Error: Incomplete data.');
      this.errorMessage = 'Error: Incomplete data.';
      this.closeAlert();
      this.taskData = {};
    } else {
      console.log('Data recived.');
      this.errorMessage = 'Data recived.'
      this.closeAlert();
      this.taskData = {};
    }
  }

  closeAlert() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  closeX() {
    this.errorMessage = '';
  }
}
