<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

#[Fillable(['author_id', 'title', 'description', 'starts_at', 'ends_at'])]
class Election extends Model
{
    use HasUuids;

    protected function casts(): array
    {
        return [
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
        ];
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id', 'id');
    }

    public function candidates(): HasMany
    {
        return $this->hasMany(Candidate::class, 'election_id');
    }

    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class, 'election_id');
    }
}
