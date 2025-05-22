import React from 'react';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { useFormState } from './hooks/useFormState';
import { Button } from './components/Button';
import { FileText, Send } from 'lucide-react';

function App() {
  const {
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
    submitForm,
    resetForm
  } = useFormState();

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendMessage = (message: string) => {
    addMessage({
      type: 'user',
      content: message
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Contest Your Parking Ticket
            </h1>
            
            <ChatInterface
              messages={state.messages}
              onSendMessage={handleSendMessage}
              isProcessing={isProcessing}
            />
          </div>
          
          <div className="md:w-80">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Summary</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Ticket Info</h3>
                  <div className="mt-1 space-y-1">
                    {state.ticket.ticketNumber && (
                      <p className="text-sm">Ticket: {state.ticket.ticketNumber}</p>
                    )}
                    {state.ticket.amount > 0 && (
                      <p className="text-sm">Amount: ${state.ticket.amount}</p>
                    )}
                  </div>
                </div>
                
                {state.evidence.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">Evidence</h3>
                    <ul className="mt-1 space-y-1">
                      {state.evidence.map((item) => (
                        <li key={item.id} className="text-sm flex items-center">
                          <FileText size={14} className="mr-1" />
                          {item.file?.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {state.selectedReason && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">Contest Reason</h3>
                    <p className="text-sm mt-1">{state.selectedReason.title}</p>
                  </div>
                )}
              </div>
              
              {isSubmitting ? (
                <Button
                  variant="primary"
                  isLoading
                  fullWidth
                  className="mt-4"
                >
                  Submitting...
                </Button>
              ) : (
                <Button
                  variant="primary"
                  icon={<Send size={16} />}
                  fullWidth
                  className="mt-4"
                  onClick={handleSubmit}
                  disabled={!state.ticket.ticketNumber}
                >
                  Submit Contest
                </Button>
              )}
            </div>
            
            <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Tips</h3>
              <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                <li>Be clear and specific in your responses</li>
                <li>Upload supporting evidence when possible</li>
                <li>Double-check all information before submitting</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2025 TicketAppeal. This is a demo application. Not for actual ticket disputes.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;