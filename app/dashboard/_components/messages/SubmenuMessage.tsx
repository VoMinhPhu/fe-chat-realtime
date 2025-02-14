'use client';

import { Button } from '@/components/ui/button';
import { EllipsisVertical } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface SubmenuProps {
  className?: string;
  options: string[];
  onOptionClick?: (option: string) => void;
}

const SubmenuMessage: React.FC<SubmenuProps> = ({ options, onOptionClick, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`text-black w-6 h-6 bg-white hover:bg-[#ccc] rounded-full p-1 mr-1 ${className} ${
          isOpen ? 'flex' : ''
        }`}
      >
        <EllipsisVertical />
      </Button>
      {isOpen && (
        <div className="flex flex-col items-start absolute z-10 top-full right-4 rounded-md shadow bg-white">
          {options.map((option, index) => (
            <p
              key={index}
              className="px-8 py-1 w-full text-sm rounded-md hover:bg-gray-100 cursor-pointer text-black"
              onClick={() => {
                setIsOpen(false);
                onOptionClick?.(option);
              }}
            >
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubmenuMessage;
