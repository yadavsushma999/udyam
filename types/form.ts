// src/types/form.ts
export interface FormField {
    key: string;
    label?: string;
    type: string;
    placeholder?: string;
    maxlength?: number;
    minlength?: number;
    required?: boolean;
    validationMessage?: string;
}
