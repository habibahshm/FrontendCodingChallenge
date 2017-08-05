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
	commentForm
	messageClass;
	message;
	newTask = [];
	lists = [
     {id: 1, title: 'Chores', tasks: [{id: 1, name:'Do the dishes'}, {id:2, name:'clean the livingRoom'}]},
     {id: 2, title: 'Work', tasks: [{id:1, name: 'finish the challenge'}, {id:2, name: 'deploy the app'}]}
    ];
    next =3;

  constructor(
  	private formBuilder: FormBuilder,
  	private blogService: BlogService
  	) { 
  	this.createNewListForm(); // Create new blog form on start up
  	this.createNewCommentForm();
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

  createNewCommentForm(){
  	this.commentForm = this.formBuilder.group({
  		task: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200)
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

    console.log(list);

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

  draftTask(id){
   this.newTask = [];
   this.newTask.push(id);
  }

  postTask(id){
  	const l = this.lists[id-1].tasks.length;
  	var taskId;
  	if(l === 0)
  		taskId = 1;
  	else
    	taskId = (this.lists[id-1].tasks[l-1].id) + 1;
    const newTask = {
    	id: taskId,
    	name: this.commentForm.get('task').value
    }
    this.lists[id-1].tasks.push(newTask);
    const index = this.newTask.indexOf(id); // Check the index of the blog post in the array
    this.newTask.splice(index, 1);
    this.commentForm.reset();
    //if backend existed
    //blogService.addTask(id, this.commentForm.get('task').value);
  }

 
  cancelSubmission(id) {
    const index = this.newTask.indexOf(id); // Check the index of the blog post in the array
    this.newTask.splice(index, 1); // Remove the id from the array to cancel post submission
    this.commentForm.reset(); // Reset  the form after cancellation
  }

  deleteTask(listID, taskID){
  	    setTimeout(() => {
  	       const index = this.lists[listID-1].tasks.findIndex(x => x.id == taskID);
  	       console.log(index);
           this.lists[listID-1].tasks.splice(index,1);
        }, 1000);

        //if backend exists
        //this.blogService.deleteTask(listID, taskID);
  }
  

  goBack() {
    window.location.reload(); // Clear all variable states
  }


  ngOnInit() {
     this.getAllLists();
  }

}
