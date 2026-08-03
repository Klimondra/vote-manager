<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Election;
use Inertia\Inertia;

class ElectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Election::all();
        return Inertia::render('voting/landing-page', [
            'elections' => Election::all(),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Election $election)
    {
        return Inertia::render('voting/vote-detail', [
            'election' => $election->load('candidates'),
        ]);
    }
}
