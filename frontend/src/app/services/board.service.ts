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
    return this.http.post(this.env + 'board/newTask', task)
  }

  listTask(){
    return this.http.get(this.env + 'board/listTasks')
  }
}
