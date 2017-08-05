import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BlogService {

	

	domain = "http://localhost:8080"; // Assuming the development domain is on port 8080
	

  constructor(
  	private http: Http
  	) { }

  newList(list){
  	return this.http.post(this.domain + '/newList', list).map(res => res.json()); 
  	//assuming this route exists in the backend
  }

  getLists(){
  	 return this.http.get(this.domain + '/list').map(res => res.json()); 
  }

}
