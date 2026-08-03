<?php

namespace App\Services;

use App\Models\Election;
use Illuminate\Support\Facades\DB;

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
}
