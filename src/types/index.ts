export interface Component {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  preview?: string;
  code: string;
}

export interface ComponentCategory {
  id: string;
  name: string;
  description: string;
  components: Component[];
}

export interface SearchResult {
  component: Component;
  score: number;
}
