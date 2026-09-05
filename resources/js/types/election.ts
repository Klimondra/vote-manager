export type Election = {
    id: string;
    title: string;
    description: string | null;
    starts_at: string;
    ends_at: string;
    created_at: string;
    updated_at: string;
};

export type Candidate = {
    id: string;
    name: string;
    description: string | null;
    election_id: string;
    created_at: string;
    updated_at: string;
    votes_count?: number | null;
};

export type ElectionRich = Election & {
    candidates: Candidate[];
};
