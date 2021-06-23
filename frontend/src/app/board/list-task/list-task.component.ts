import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css'],
})
export class ListTaskComponent implements OnInit {
  public taskData: any;
  public errorMessage: string;

  constructor(private board: BoardService) {
    this.taskData = {};
    this.errorMessage = '';
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

  updateTask(task: any, status: String) {}
  deleteTask(task: any) {}

  closeAlert() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  closeX() {
    this.errorMessage = '';
  }
}
