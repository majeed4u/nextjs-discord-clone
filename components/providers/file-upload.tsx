'use client';
import { X } from 'lucide-react';
import Image from 'next/image';
import { UploadDropzone } from '@/lib/uploadthing';
import '@uploadthing/react/styles.css';

interface FileUploadProps {
  endpoint: 'serverImage' | 'messageFile';
  value: string;
  onChange: (url?: string) => void;
}

export default function FileUpload({
  endpoint,
  onChange,
  value,
}: FileUploadProps) {
  const fileType = value?.split('.').pop();
  if (value && fileType !== 'pdf') {
    return (
      <div className='relative w-32 h-32 '>
        <Image
          src={value}
          fill
          className='object-contain border-[.5px] border-gray-100 rounded-full '
          alt='Server Image '
        />
        <button
          className='absolute top-0 p-1 text-white rounded-full right-4 bg-rose-500 '
          onClick={() => onChange()}
        >
          <X size={16} />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        // Do something with the response
        onChange(res?.[0]?.url);

        console.log('Files: ', res);
        console.log('Upload Completed');
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        console.log(`ERROR! ${error.message}`);
      }}
    />
  );
}
