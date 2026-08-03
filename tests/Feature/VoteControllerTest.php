<?php

use App\Models\Candidate;
use App\Models\Election;
use App\Models\User;
use App\Models\Vote;
use Illuminate\Support\Carbon;

test('guests cannot vote and are redirected to login', function () {
    $author = User::factory()->create();
    $election = Election::create([
        'title' => 'Test Election',
        'description' => 'Description',
        'starts_at' => Carbon::now()->subDay(),
        'ends_at' => Carbon::now()->addDay(),
        'author_id' => $author->id,
    ]);

    $candidate = Candidate::create([
        'election_id' => $election->id,
        'name' => 'Candidate 1',
        'description' => 'Desc',
    ]);

    $response = $this->post(route('vote', $candidate->id));

    $response->assertRedirect(route('login'));
    expect(Vote::count())->toBe(0);
});

test('authenticated user can cast a vote in an active election', function () {
    $author = User::factory()->create();
    $voter = User::factory()->create();

    $election = Election::create([
        'title' => 'Test Election',
        'description' => 'Description',
        'starts_at' => Carbon::now()->subDay(),
        'ends_at' => Carbon::now()->addDay(),
        'author_id' => $author->id,
    ]);

    $candidate = Candidate::create([
        'election_id' => $election->id,
        'name' => 'Candidate 1',
        'description' => 'Desc',
    ]);

    $response = $this->actingAs($voter)->post(route('vote', $candidate->id));

    $response->assertRedirect();
    expect(Vote::where('election_id', $election->id)->where('voter_id', $voter->id)->count())->toBe(1);
});

test('authenticated user cannot vote twice in the same election', function () {
    $author = User::factory()->create();
    $voter = User::factory()->create();

    $election = Election::create([
        'title' => 'Test Election',
        'description' => 'Description',
        'starts_at' => Carbon::now()->subDay(),
        'ends_at' => Carbon::now()->addDay(),
        'author_id' => $author->id,
    ]);

    $candidate1 = Candidate::create([
        'election_id' => $election->id,
        'name' => 'Candidate 1',
        'description' => 'Desc 1',
    ]);

    $candidate2 = Candidate::create([
        'election_id' => $election->id,
        'name' => 'Candidate 2',
        'description' => 'Desc 2',
    ]);

    // First vote
    $this->actingAs($voter)->post(route('vote', $candidate1->id));

    // Second vote should fail validation
    $response = $this->actingAs($voter)->post(route('vote', $candidate2->id));

    $response->assertSessionHasErrors('candidate');
    expect(Vote::where('election_id', $election->id)->where('voter_id', $voter->id)->count())->toBe(1);
});

test('authenticated user cannot vote when election has ended', function () {
    $author = User::factory()->create();
    $voter = User::factory()->create();

    $election = Election::create([
        'title' => 'Ended Election',
        'description' => 'Description',
        'starts_at' => Carbon::now()->subDays(2),
        'ends_at' => Carbon::now()->subDay(),
        'author_id' => $author->id,
    ]);

    $candidate = Candidate::create([
        'election_id' => $election->id,
        'name' => 'Candidate 1',
        'description' => 'Desc',
    ]);

    $response = $this->actingAs($voter)->post(route('vote', $candidate->id));

    $response->assertSessionHasErrors('candidate');
    expect(Vote::count())->toBe(0);
});

test('election detail does not show candidate vote counts when election is active', function () {
    $author = User::factory()->create();

    $election = Election::create([
        'title' => 'Active Election',
        'description' => 'Description',
        'starts_at' => Carbon::now()->subDay(),
        'ends_at' => Carbon::now()->addDay(),
        'author_id' => $author->id,
    ]);

    $candidate = Candidate::create([
        'election_id' => $election->id,
        'name' => 'Candidate 1',
        'description' => 'Desc',
    ]);

    $response = $this->get(route('elections.show', $election->id));

    $response->assertOk();
    $pageElection = $response->inertiaPage()['props']['election'];
    expect($pageElection['candidates'][0]['votes_count'] ?? null)->toBeNull();
});

test('election detail includes candidate vote counts when election has ended', function () {
    $author = User::factory()->create();

    $election = Election::create([
        'title' => 'Ended Election',
        'description' => 'Description',
        'starts_at' => Carbon::now()->subDays(2),
        'ends_at' => Carbon::now()->subDay(),
        'author_id' => $author->id,
    ]);

    $candidate = Candidate::create([
        'election_id' => $election->id,
        'name' => 'Candidate 1',
        'description' => 'Desc',
    ]);

    $response = $this->get(route('elections.show', $election->id));

    $response->assertOk();
    $pageElection = $response->inertiaPage()['props']['election'];
    expect($pageElection['candidates'][0]['votes_count'])->toBe(0);
});
