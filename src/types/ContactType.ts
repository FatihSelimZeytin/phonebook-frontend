export interface PhoneType {
    id: number;
    number: string;
    contactId: number;
    createdAt: string;
    updatedAt: string;
}

export interface ContactType {
    id: number;
    firstName: string;
    surname: string;
    company?: string | null;
    phones: PhoneType[];
    userId: number;
    status: boolean;
    createdAt: string;
    updatedAt: string;
}
