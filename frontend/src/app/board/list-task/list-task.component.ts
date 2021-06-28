import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css'],
})
export class ListTaskComponent implements OnInit {
  public taskData: any;
  public errorMessage: string;
  public successMessage: string;

  constructor(private board: BoardService, public auth: AuthService) {
    this.taskData = {};
    this.errorMessage = '';
    this.successMessage = '';
  }

  ngOnInit(): void {
    this.board.listTask().subscribe(
      (res) => {
        console.log(res);
        this.taskData = res.board;
      },
      (err) => {
        console.log(err);
        this.errorMessage = err.error;
        this.closeAlert();
      }
    );
  }

  updateTask(task: any, status: String) {
    const oldStatus = task.status;
    task.status = status;
    this.board.updateTask(task).subscribe(
      (res) => {
        console.log(res.message);
      },
      (err) => {
        console.log(err);
        this.errorMessage = err.error;
        task.staus = oldStatus;
        this.closeAlert();
      }
    );
  }
  deleteTask(task: any) {
    this.board.deleteTask(task).subscribe(
      (res) => {
        const i = this.taskData.indexOf(task);
        if (i >= 0) {
          this.taskData.splice(i, 1);
          this.successMessage = res.message;
          this.closeAlert();
        }
      },
      (err) => {
        console.log(err);
        this.errorMessage = err.error;
        this.closeAlert();
      }
    );
  }

  closeAlert() {
    setTimeout(() => {
      this.errorMessage = '';
      this.successMessage = '';
    }, 3000);
  }

  closeX() {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
