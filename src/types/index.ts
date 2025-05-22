export interface Ticket {
  ticketNumber: string;
  issueDate: string;
  licensePlate: string;
  violation: string;
  location: string;
  amount: number;
}

export interface ContestReason {
  id: string;
  title: string;
  description: string;
  successRate: string;
  template: string;
}

export interface Evidence {
  id: string;
  file: File | null;
  description: string;
  type: 'photo' | 'document' | 'other';
  url?: string;
}

export interface Message {
  id: string;
  type: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    field?: string;
    value?: string;
    evidenceId?: string;
  };
}

export type FormStep = 'ticket-info' | 'contest-reason' | 'evidence' | 'review' | 'confirmation';

export interface AppState {
  currentStep: FormStep;
  ticket: Ticket;
  selectedReason: ContestReason | null;
  customReason: string;
  evidence: Evidence[];
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  messages: Message[];
  submissionId?: string;
}