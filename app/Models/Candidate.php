<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['election_id', 'name', 'description'])]
class Candidate extends Model
{
    use HasUuids;

    public function election(): BelongsTo
    {
        return $this->belongsTo(Election::class, 'election_id', 'id');
    }

    public function votes(): HasMany {
        return $this->hasMany(Vote::class, 'candidate_id', 'id');
    }
}
