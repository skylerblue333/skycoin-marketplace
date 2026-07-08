import { invokeLLM } from '../_core/llm';

export class AdvancedAIBrain {
  private models = {
    // Reasoning & Analysis
    reasoning: 'gpt-5-reasoning',
    deepAnalysis: 'claude-opus',
    
    // Speed & Efficiency
    fast: 'gpt-4o-mini',
    ultraFast: 'mixtral-8x7b-32768',
    
    // Specialized
    security: 'gpt-4-turbo',
    threat: 'claude-3-5-sonnet',
    code: 'gpt-4-turbo',
    
    // Multimodal
    vision: 'gemini-2-flash',
  };

  async solve(problem: string): Promise<any> {
    if (this.isSecurityThreat(problem)) {
      return this.analyzeWithModel(this.models.security, problem);
    }
    if (this.requiresDeepReasoning(problem)) {
      return this.analyzeWithModel(this.models.reasoning, problem);
    }
    if (this.needsSpeed(problem)) {
      return this.analyzeWithModel(this.models.fast, problem);
    }
    return this.analyzeWithModel(this.models.deepAnalysis, problem);
  }

  private isSecurityThreat(problem: string): boolean {
    return /security|threat|attack|vulnerability|breach|exploit/.test(problem.toLowerCase());
  }

  private requiresDeepReasoning(problem: string): boolean {
    return problem.length > 500 || /complex|analyze|explain|why|how/.test(problem.toLowerCase());
  }

  private needsSpeed(problem: string): boolean {
    return problem.length < 100;
  }

  async analyzeWithModel(model: string, prompt: string) {
    return invokeLLM({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.1,
      max_tokens: 4096
    });
  }

  async detectThreats(data: string) {
    return this.analyzeWithModel(this.models.threat, `Analyze for security threats: ${data}`);
  }

  async generateCode(spec: string) {
    return this.analyzeWithModel(this.models.code, `Generate code for: ${spec}`);
  }

  async deepAnalyze(problem: string) {
    return this.analyzeWithModel(this.models.deepAnalysis, problem);
  }

  async quickAnalysis(query: string) {
    return this.analyzeWithModel(this.models.fast, query);
  }
}
