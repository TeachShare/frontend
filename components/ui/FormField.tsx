import React from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  helpText?: string;
  error?: boolean;
  children: React.ReactNode;
}

export const FormField = ({ label, required, helpText, error, children }: FormFieldProps) => (
  <div className="space-y-2">
    <label className={`text-[11px] font-bold ${error ? 'text-rose-500' : 'text-zinc-500 dark:text-zinc-500'} uppercase tracking-widest flex items-center gap-1 transition-colors duration-300`}>
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    {children}
    {helpText && <p className={`text-[10px] ${error ? 'text-rose-500' : 'text-zinc-500 dark:text-zinc-600'} italic font-medium transition-colors duration-300`}>{helpText}</p>}
  </div>
);