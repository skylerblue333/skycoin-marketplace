export interface Task {
  type: string;
  complexity: 'low' | 'medium' | 'high';
  requiresReasoning: boolean;
  requiresSpeed: boolean;
  requiresVision: boolean;
}

export class IntelligentRouter {
  selectModel(task: Task): string {
    if (task.requiresReasoning && task.complexity === 'high') {
      return 'gpt-5-reasoning';
    }
    if (task.requiresSpeed && task.complexity === 'low') {
      return 'gpt-4o-mini';
    }
    if (task.type === 'security') {
      return 'gpt-4-turbo';
    }
    if (task.type === 'code') {
      return 'gpt-4-turbo';
    }
    if (task.requiresVision) {
      return 'gemini-2-flash';
    }
    return 'claude-3-5-sonnet';
  }

  async routeTask(task: Task, prompt: string) {
    const model = this.selectModel(task);
    return { model, prompt, timestamp: Date.now() };
  }
}
