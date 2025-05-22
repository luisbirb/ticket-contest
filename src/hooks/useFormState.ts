import { useState } from 'react';
import { AppState, FormStep, Ticket, Evidence, ContestReason, Message } from '../types';

const initialTicket: Ticket = {
  ticketNumber: '',
  issueDate: '',
  licensePlate: '',
  violation: '',
  location: '',
  amount: 0
};

const initialContactInfo = {
  name: '',
  email: '',
  phone: ''
};

const initialState: AppState = {
  currentStep: 'ticket-info',
  ticket: initialTicket,
  selectedReason: null,
  customReason: '',
  evidence: [],
  contactInfo: initialContactInfo,
  messages: [
    {
      id: 'welcome',
      type: 'system',
      content: "Hi! I'm here to help you contest your parking ticket. Let's start by gathering some information about the ticket. What's the ticket number?",
      timestamp: new Date()
    }
  ]
};

export function useFormState() {
  const [state, setState] = useState<AppState>(initialState);
  const [isProcessing, setIsProcessing] = useState(false);

  const addMessage = async (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: new Date()
    };

    setState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, newMessage]
    }));

    if (message.type === 'user') {
      setIsProcessing(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [...state.messages, newMessage],
            ticketInfo: state.ticket
          })
        });

        const data = await response.json();
        
        if (data.response) {
          setState(prevState => ({
            ...prevState,
            messages: [...prevState.messages, newMessage, {
              id: `msg-${Date.now()}`,
              type: 'assistant',
              content: data.response,
              timestamp: new Date()
            }]
          }));
        }
      } catch (error) {
        console.error('Error processing message:', error);
        setState(prevState => ({
          ...prevState,
          messages: [...prevState.messages, {
            id: `msg-${Date.now()}`,
            type: 'system',
            content: 'Sorry, I encountered an error processing your message. Please try again.',
            timestamp: new Date()
          }]
        }));
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const updateTicket = (updates: Partial<Ticket>) => {
    setState(prevState => ({
      ...prevState,
      ticket: {
        ...prevState.ticket,
        ...updates
      }
    }));

    // Add a message about the update
    const field = Object.keys(updates)[0];
    const value = Object.values(updates)[0];
    if (field && value) {
      addMessage({
        type: 'user',
        content: `${value}`,
        metadata: { field, value: String(value) }
      });

      // Add assistant response
      const nextField = getNextTicketField(field);
      if (nextField) {
        addMessage({
          type: 'assistant',
          content: getPromptForField(nextField),
          metadata: { field: nextField }
        });
      }
    }
  };

  const updateContactInfo = (updates: Partial<typeof initialContactInfo>) => {
    setState(prevState => ({
      ...prevState,
      contactInfo: {
        ...prevState.contactInfo,
        ...updates
      }
    }));
  };

  const setSelectedReason = (reason: ContestReason | null) => {
    setState(prevState => ({
      ...prevState,
      selectedReason: reason
    }));

    if (reason) {
      addMessage({
        type: 'user',
        content: `I want to contest this ticket because: ${reason.title}`,
        metadata: { field: 'contestReason', value: reason.id }
      });

      addMessage({
        type: 'assistant',
        content: "Great choice. Now, let's gather some evidence to support your case. You can upload photos or documents that help prove your point.",
        metadata: { field: 'evidence' }
      });
    }
  };

  const setCustomReason = (reason: string) => {
    setState(prevState => ({
      ...prevState,
      customReason: reason
    }));

    if (reason) {
      addMessage({
        type: 'user',
        content: reason,
        metadata: { field: 'customReason' }
      });
    }
  };

  const addEvidence = (evidence: Evidence) => {
    setState(prevState => ({
      ...prevState,
      evidence: [...prevState.evidence, evidence]
    }));

    addMessage({
      type: 'user',
      content: `Uploaded evidence: ${evidence.file?.name}`,
      metadata: { field: 'evidence', evidenceId: evidence.id }
    });

    if (evidence.description) {
      addMessage({
        type: 'user',
        content: `Description: ${evidence.description}`,
        metadata: { field: 'evidenceDescription', evidenceId: evidence.id }
      });
    }
  };

  const removeEvidence = (id: string) => {
    setState(prevState => ({
      ...prevState,
      evidence: prevState.evidence.filter(e => e.id !== id)
    }));

    addMessage({
      type: 'system',
      content: 'Evidence removed.',
      metadata: { field: 'evidenceRemoved', evidenceId: id }
    });
  };

  const updateEvidence = (id: string, updates: Partial<Evidence>) => {
    setState(prevState => ({
      ...prevState,
      evidence: prevState.evidence.map(e => 
        e.id === id ? { ...e, ...updates } : e
      )
    }));

    if (updates.description) {
      addMessage({
        type: 'user',
        content: `Updated evidence description: ${updates.description}`,
        metadata: { field: 'evidenceDescription', evidenceId: id }
      });
    }
  };

  const goToStep = (step: FormStep) => {
    setState(prevState => ({
      ...prevState,
      currentStep: step
    }));
  };

  const submitForm = async () => {
    addMessage({
      type: 'system',
      content: 'Submitting your contest...',
      metadata: { field: 'submitting' }
    });

    // In a real app, this would send data to a server
    return new Promise<string>(resolve => {
      setTimeout(() => {
        const submissionId = `TC-${Math.floor(Math.random() * 1000000)}`;
        setState(prevState => ({
          ...prevState,
          submissionId,
          currentStep: 'confirmation'
        }));

        addMessage({
          type: 'system',
          content: `Contest submitted successfully! Your submission ID is ${submissionId}`,
          metadata: { field: 'submitted', value: submissionId }
        });

        resolve(submissionId);
      }, 1500);
    });
  };

  const resetForm = () => {
    setState(initialState);
  };

  return {
    state,
    isProcessing,
    addMessage,
    updateTicket,
    updateContactInfo,
    setSelectedReason,
    setCustomReason,
    addEvidence,
    removeEvidence,
    updateEvidence,
    goToStep,
    submitForm,
    resetForm
  };
}

function getNextTicketField(currentField: string): string | null {
  const fieldOrder = ['ticketNumber', 'issueDate', 'licensePlate', 'violation', 'location', 'amount'];
  const currentIndex = fieldOrder.indexOf(currentField);
  return currentIndex < fieldOrder.length - 1 ? fieldOrder[currentIndex + 1] : null;
}

function getPromptForField(field: string): string {
  const prompts: Record<string, string> = {
    ticketNumber: "What's the ticket number?",
    issueDate: "When was the ticket issued?",
    licensePlate: "What's your license plate number?",
    violation: "What violation were you cited for?",
    location: "Where did this occur?",
    amount: "What's the fine amount?",
  };
  return prompts[field] || "What other information can you provide?";
}