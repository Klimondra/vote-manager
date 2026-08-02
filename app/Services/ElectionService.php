<?php

namespace App\Services;

use App\Models\Election;
use Illuminate\Support\Facades\DB;

class ElectionService
{
    public function createElectionWithService(array $data) {
        return DB::transaction(function () use ($data) {
            $election = Election::create([
                'title' => $data['title'],
                'description' => $data['description'],
                'starts_at' => $data['starts_at'],
                'ends_at' => $data['ends_at'],
            ]);

            $election->candidates()->createMany($data['candidates']);

            return $election;
        });
    }
}
