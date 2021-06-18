import { Component, OnInit } from '@angular/core';
import { BoardService } from "../../services/board.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.css']
})
export class SaveTaskComponent implements OnInit {
  public taskData: any;
  public errorMessage: string;

  constructor(private boardService: BoardService, private router: Router) {
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
    } else {
      this.boardService.saveTask(this.taskData).subscribe(
        (res: any) => {
          console.log(res);
          this.taskData = {};
          this.router.navigate(['/listTask']);
        },
        (err) => {
          console.log(err);
          this.errorMessage = err.error;
          this.closeAlert();
        }
      )
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
