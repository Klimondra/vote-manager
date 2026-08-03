<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreElectionRequest;
use App\Http\Requests\Admin\UpdateElectionRequest;
use App\Models\Election;
use App\Services\ElectionService;
use Inertia\Inertia;

class ElectionController extends Controller
{
    public function __construct(protected ElectionService $electionService) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $elections = Election::all();

        return Inertia::render('admin/elections/overview-elections', [
            'elections' => $elections,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/elections/create-election');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreElectionRequest $request)
    {
        $validated = $request->validated();
        $validated['author_id'] = auth()->id();
        $this->electionService->createElectionWithService($validated);

        return redirect()->route('admin.elections.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Election $election)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Election $election)
    {
        $election->load('candidates');

        return Inertia::render('admin/elections/edit-election', [
            'election' => $election,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateElectionRequest $request, Election $election)
    {
        $validated = $request->validated();
        $this->electionService->updateElectionWithService($election, $validated);

        return redirect()->route('admin.elections.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Election $election)
    {
        $election->delete();

        return redirect()->route('admin.elections.index');
    }
}
