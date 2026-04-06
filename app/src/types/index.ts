
export type ApplicationStatus = 
| "saved"
| "applied"
| "interview"
| "offer"
| "rejected"
| "withdrawn";

export type InterviewType = 
| "phone_screen"
| "technical"
| "cultural"
| "final"
| "other";

export interface Contact {
    id: string;
    name: string;
    email?: string;
    role?: string;
}

export interface Interview {
    id: string;
    application_id: string;
    date: string;
    type: InterviewType;
    notes?: string;
    completed: boolean;
}

export interface Application {
    id: string;
    company: string;
    job_url?: string;
    status: ApplicationStatus;
    position: string;
    notes?: string;
    created_at: string;
    updated_at: string;
}