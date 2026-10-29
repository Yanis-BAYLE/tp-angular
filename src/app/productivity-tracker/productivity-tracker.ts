import { Component, computed, signal, effect } from '@angular/core';

const DAILY_GOAL = 5;

@Component({
  imports: [],
  selector: 'app-productivity-tracker',
  styleUrl: './productivity-tracker.css',
  templateUrl: './productivity-tracker.html',
})
export class ProductivityTracker {
  completedTasks = signal(Number(localStorage.getItem('tasks')) || 0);
  progressPercentage = computed(() => (this.completedTasks() / DAILY_GOAL) * 100);

  goalReached = computed(() => this.completedTasks() >= DAILY_GOAL);

  message = computed(() => {
    if (this.completedTasks() === 0) {
      return 'Prêt à démarrer la journée ?';
    } else if (this.goalReached()) {
      return 'Félicitations, objectif atteint ! 🚀';
    } else {
      return 'Continuez comme ça, vous y êtes presque !';
    }
  });

  incrementTask(): void {
    this.completedTasks.update((n) => n + 1);
  }

  reset(): void {
    this.completedTasks.set(0);
  }

  constructor() {
    effect(() => {
      localStorage.setItem('tasks', this.completedTasks().toString());
      if (this.completedTasks() >= DAILY_GOAL) {
        window.alert('Bravo, vous avez fini votre journée !');
      }
    });
  }
}
