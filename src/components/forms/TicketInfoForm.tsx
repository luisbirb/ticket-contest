import React from 'react';
import { Ticket } from '../../types';
import { Button } from '../Button';
import { formatCurrency } from '../../utils/formatters';

interface TicketInfoFormProps {
  ticket: Ticket;
  onUpdate: (updates: Partial<Ticket>) => void;
  onNext: () => void;
}

export function TicketInfoForm({ ticket, onUpdate, onNext }: TicketInfoFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const isFormValid = () => {
    return (
      ticket.ticketNumber.trim() !== '' &&
      ticket.issueDate.trim() !== '' &&
      ticket.licensePlate.trim() !== '' &&
      ticket.violation.trim() !== '' &&
      ticket.location.trim() !== '' &&
      ticket.amount > 0
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-fadeIn">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Enter Your Ticket Information</h2>
      <p className="text-gray-600 mb-6">
        Please provide the details from your parking ticket. You can find this information on the physical ticket or citation notice.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ticketNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Ticket Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="ticketNumber"
                value={ticket.ticketNumber}
                onChange={(e) => onUpdate({ ticketNumber: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. TC-123456789"
                required
              />
            </div>
            
            <div>
              <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700 mb-1">
                Issue Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="issueDate"
                value={ticket.issueDate}
                onChange={(e) => onUpdate({ issueDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700 mb-1">
                License Plate <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="licensePlate"
                value={ticket.licensePlate}
                onChange={(e) => onUpdate({ licensePlate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. ABC123"
                required
              />
            </div>
            
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Fine Amount <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  id="amount"
                  value={ticket.amount || ''}
                  onChange={(e) => onUpdate({ amount: parseFloat(e.target.value) || 0 })}
                  className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              {ticket.amount > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  {formatCurrency(ticket.amount)}
                </p>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="violation" className="block text-sm font-medium text-gray-700 mb-1">
              Violation Type <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="violation"
              value={ticket.violation}
              onChange={(e) => onUpdate({ violation: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Expired Meter, No Parking Zone"
              required
            />
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="location"
              value={ticket.location}
              onChange={(e) => onUpdate({ location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 123 Main Street"
              required
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button 
            type="submit" 
            disabled={!isFormValid()}
          >
            Continue to Contest Reason
          </Button>
        </div>
      </form>
    </div>
  );
}