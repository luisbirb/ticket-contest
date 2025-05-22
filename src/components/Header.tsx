import { BookOpen, FileText, HelpCircle } from 'lucide-react';
import React from 'react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-blue-600 text-white p-2 rounded-md mr-3">
            <FileText size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">TicketAppeal</h1>
            <p className="text-sm text-gray-500">Contest your parking tickets with confidence</p>
          </div>
        </div>
        
        <nav className="flex space-x-1 sm:space-x-4">
          <a
            href="#guide"
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
          >
            <BookOpen size={18} className="mr-1.5" />
            <span>Guide</span>
          </a>
          <a
            href="#help"
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
          >
            <HelpCircle size={18} className="mr-1.5" />
            <span>Help</span>
          </a>
        </nav>
      </div>
    </header>
  );
}