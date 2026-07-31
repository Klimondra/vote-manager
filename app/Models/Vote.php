<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vote extends Model
{
    use HasUuids;

    public function voter(): BelongsTo {
        return $this->belongsTo(User::class, 'voter_id', 'id');
    }

    public function candidate(): BelongsTo {
        return $this->belongsTo(Candidate::class, 'candidate_id', 'id');
    }

    public function election(): BelongsTo {
        return $this->belongsTo(Election::class, 'election_id', 'id');
    }
}
