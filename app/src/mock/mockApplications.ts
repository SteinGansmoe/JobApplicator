import { Application } from "../types";

export const mockApplications: Application[] = [
    {
        id: "1",
        company: "Gjensidige",
        job_url: "https://example.com/jobs/1",
        status: "saved",
        position: "Software Engineer",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "2",
        company: "Sopra Steria",
        job_url: "https://example.com/jobs/2",
        status: "applied",
        position: "Frontend Developer",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "3",
        company: "Intility",
        job_url: "https://example.com/jobs/3",
        status: "interview",
        position: "JR Software Engineer",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }
];