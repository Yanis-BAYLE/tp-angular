import { Service } from '@angular/core';

export type Task = {
  id: number;
  title: string;
  priority: 'haute' | 'moyenne' | 'basse';
  isCompleted: boolean;
};

@Service()
export class Books {
  tasks: Task[] = [
    { id: 1, title: 'Manger', priority: 'haute', isCompleted: false },
    { id: 2, title: 'Dormir', priority: 'basse', isCompleted: true },
    { id: 3, title: 'Boire', priority: 'moyenne', isCompleted: false },
    { id: 4, title: 'Marcher', priority: 'basse', isCompleted: true },
  ];

  completeTask(task: Task) {
    task.isCompleted = true;
  }
}
