export interface Profile {
    id_worker: number;
    fullName: string;
    pfpFileName: string; // image path
    gallery: string[]; // array de galeria
    rating: string;
    totalReviews: number;
    skills: string[]; // array de skills
    score: string;
}