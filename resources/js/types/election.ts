export type Election = {
    id: string;
    title: string;
    description: string;
    starts_at: string;
    ends_at: string;
    created_at: string;
    updated_at: string;
}

export type Candidate = {
    id: string;
    name: string;
    description: string;
    election_id: string;
    created_at: string;
    updated_at: string;
}
