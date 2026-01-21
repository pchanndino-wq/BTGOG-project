
export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

export enum LoadingState {
  IDLE = 'IDLE',
  GENERATING_PROMPT = 'GENERATING_PROMPT',
  GENERATING_IMAGE = 'GENERATING_IMAGE',
  ERROR = 'ERROR'
}
