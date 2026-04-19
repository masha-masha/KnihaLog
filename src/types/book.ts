export type BookStatus = "planned" | "reading" | "finished";

export interface Quote {
    id: string;
    text: string;
    page?: string;
    dateAdded: string;
}

export interface Book {
    id: string;
    title: string;
    author: string;
    status: BookStatus;
    rating: number;
    language: string;
    quotes: Quote[];
    notes: string;
}