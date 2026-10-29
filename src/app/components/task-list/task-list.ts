import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Books, Task } from '../../services/books';

@Component({
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    NgOptimizedImage,
  ],
  selector: 'app-task-list',
  styleUrl: './task-list.css',
  templateUrl: './task-list.html',
})
export class TaskList {
  private books = inject(Books);

  searchQuery: string = '';

  get filteredTasks() {
    const query = this.searchQuery.trim().toLowerCase();
    return this.books.tasks.filter((task) => task.title.toLowerCase().startsWith(query));
  }

  completeTask(task: Task) {
    this.books.completeTask(task);
  }
}
