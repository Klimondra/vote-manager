<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreElectionRequest;
use App\Models\Election;
use App\Services\ElectionService;
use Illuminate\Http\Request;

class ElectionController extends Controller
{
    public function __construct(protected ElectionService $electionService) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $elections = Election::all();
        // TODO: Return inertia view
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreElectionRequest $request)
    {
        $validated = $request->validated();

        $this->electionService->createElectionWithService($validated);

        // TODO: Dodělat route
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Election $election)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Election $election)
    {
        //
    }
}
