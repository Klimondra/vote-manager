<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Candidate;
use App\Services\ElectionService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    public function __construct(
        protected ElectionService $electionService
    ) {}

    /**
     * Handle the incoming request to vote for a candidate.
     */
    public function __invoke(Request $request, Candidate $candidate): RedirectResponse
    {
        $this->electionService->castVote($candidate, $request->user());

        return redirect()->back()->with('success', 'Váš hlas byl úspěšně zaznamenán.');
    }
}
