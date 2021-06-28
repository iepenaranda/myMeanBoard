import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private env: string;

  constructor(private http: HttpClient) {
    this.env = environment.APP_URL;
  }

  saveTask(task: any){
    return this.http.post<any>(this.env + 'board/newTask', task)
  }

  saveTaskImg(task: any){
    return this.http.post<any>(this.env + 'board/newTaskImg', task)
  }

  listTask(){
    return this.http.get<any>(this.env + 'board/listTasks')
  }

  updateTask(board: any){
    return this.http.put<any>(this.env + 'board/editTask', board)
  }

  deleteTask(board: any){
    return this.http.delete<any>(this.env + 'board/deleteTask/' + board._id)
  }
}
