<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Election;
use App\Services\ElectionService;
use Inertia\Inertia;
use Inertia\Response;

class ElectionController extends Controller
{
    public function __construct(
        protected ElectionService $electionService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('voting/landing-page', [
            'elections' => Election::all(),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Election $election): Response
    {
        $detailData = $this->electionService->getElectionDetail($election, auth()->user());

        return Inertia::render('voting/vote-detail', [
            'election' => $detailData['election'],
            'hasVoted' => $detailData['hasVoted'],
        ]);
    }
}
