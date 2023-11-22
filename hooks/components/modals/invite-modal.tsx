'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useModal } from '@/hooks/use-modal-store';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Check, Copy, RefreshCcw } from 'lucide-react';
import { useOrigin } from '@/hooks/use-origin';
import { useState } from 'react';

export const InviteModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const origin = useOrigin();
  const isModalOpen = isOpen && type === 'invite';
  const { server } = data;
  const inviteUrl = `${origin}/invite/${server?.id}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='p-0 overflow-hidden text-black bg-white'>
        <DialogHeader className='px-6 pt-8'>
          <DialogTitle className='text-2xl font-bold text-center'>
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className='p-6'>
          <Label className='mb-2 text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
            Invite Link
          </Label>
          <div className='flex items-center mt-2 gap-x-2'>
            <input
              className='w-full text-black border-0 bg-zinc-300 focus-visible:ring-0 focus-visible:ring-offset-0'
              value={inviteUrl}
            />
            <Button size='icon' onClick={onCopy}>
              {copied ? (
                <Check className='w-4 h-4' />
              ) : (
                <Copy className='w-4 h-4' />
              )}
            </Button>
          </div>
          <Button variant='link' className='mt-4 text-xs text-zinc-500'>
            Generate a new link
            <RefreshCcw className='w-4 h-4 ml-2 ' />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
