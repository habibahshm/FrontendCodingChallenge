import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

	newList = false;
	loadingLists = false;
	form;
	messageClass;
	message;
	lists = [
     {id: 1, title: 'Chores', tasks: ['Do the dishes', 'clean the livingRoom']},
     {id: 2, title: 'Work', tasks: ['finish the challenge', 'deploy the app']}
    ];
    next =3;

  constructor(
  	private formBuilder: FormBuilder,
  	private blogService: BlogService
  	) { 
  	this.createNewListForm(); // Create new blog form on start up
   }

  createNewListForm(){
  	 this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        this.alphaNumericValidation
      ])]
    })
  }

  newListForm(){
  	this.newList = true;
  }


  onListSubmit(){
  	const list = {
  	  id: this.next,
      title: this.form.get('title').value, // Title field
      tasks: []
    }

    this.lists.push(list);

    this.next= this.next+1;

    // Clear form data after two seconds
    setTimeout(() => {
          this.newList = false; 
          this.message = false; 
          this.form.reset(); 
        }, 2000);

    //if there was a backend

    // this.blogService.newList(list).subscribe(data => { 
    //     if (!data.success) {
    //     this.messageClass = 'alert alert-danger'; 
    //     this.message = data.message; 
    //   } else {
    //     this.getAllLists();
    //     this.messageClass = 'alert alert-success'; 
    //     this.message = data.message; 
    //     }
        
    //     setTimeout(() => {
    //       this.newList = false; 
    //       this.message = false; 
    //       this.form.reset(); 
    //     }, 2000);

      
    // });
  }

  // Validation for title
  alphaNumericValidation(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/); // Regular expression to perform test
    // Check if test returns false or true
    if (regExp.test(controls.value)) {
      return null; // Return valid
    } else {
      return { 'alphaNumericValidation': true } // Return error in validation
    }
  }

  getAllLists(){
    //if backend existed
  	// this.blogService.getLists().subscribe(data => {
  	// 	this.lists = data.lists;
  	// });

  }

  goBack() {
    window.location.reload(); // Clear all variable states
  }


  ngOnInit() {
     this.getAllLists();
  }

}
