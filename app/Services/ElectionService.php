<?php

namespace App\Services;

use App\Models\Candidate;
use App\Models\Election;
use App\Models\User;
use App\Models\Vote;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ElectionService
{
    public function createElectionWithService(array $data)
    {
        return DB::transaction(function () use ($data) {
            $election = Election::create([
                'title' => $data['title'],
                'description' => $data['description'],
                'starts_at' => $data['starts_at'],
                'ends_at' => $data['ends_at'],
                'author_id' => $data['author_id'],
            ]);

            $election->candidates()->createMany($data['candidates']);

            return $election;
        });
    }

    public function updateElectionWithService(Election $election, array $data): Election
    {
        return DB::transaction(function () use ($election, $data) {
            $election->update([
                'title' => $data['title'],
                'description' => $data['description'] ?? null,
                'starts_at' => $data['starts_at'],
                'ends_at' => $data['ends_at'],
            ]);

            if (isset($data['candidates'])) {
                $election->candidates()->delete();
                if (! empty($data['candidates'])) {
                    $election->candidates()->createMany($data['candidates']);
                }
            }

            return $election;
        });
    }

    public function getElectionDetail(Election $election, ?User $user): array
    {
        $hasEnded = $election->ends_at ? $election->ends_at->isPast() : false;

        if ($hasEnded) {
            $election->load(['candidates' => function ($query) {
                $query->withCount('votes');
            }]);
        } else {
            $election->load('candidates');
        }

        $hasVoted = $user
            ? Vote::where('election_id', $election->id)->where('voter_id', $user->id)->exists()
            : false;

        return [
            'election' => $election,
            'hasVoted' => $hasVoted,
        ];
    }

    public function castVote(Candidate $candidate, User $user): Vote
    {
        $election = $candidate->election;

        if (! $election) {
            throw ValidationException::withMessages([
                'candidate' => 'Neplatné volby.',
            ]);
        }

        if ($election->ends_at && $election->ends_at->isPast()) {
            throw ValidationException::withMessages([
                'candidate' => 'Hlasování v těchto volbách již skončilo.',
            ]);
        }

        $alreadyVoted = Vote::where('election_id', $election->id)
            ->where('voter_id', $user->id)
            ->exists();

        if ($alreadyVoted) {
            throw ValidationException::withMessages([
                'candidate' => 'V těchto volbách jste již hlasoval(a).',
            ]);
        }

        return DB::transaction(function () use ($candidate, $election, $user) {
            return Vote::create([
                'candidate_id' => $candidate->id,
                'election_id' => $election->id,
                'voter_id' => $user->id,
            ]);
        });
    }
}
