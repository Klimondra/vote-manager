<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateElectionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return
            auth()->check()
            && auth()->user()->can('manage-elections');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        $electionRules = [
            'title' => ['required', 'string', 'min:4', 'max:128'],
            'description' => ['nullable', 'string'],
            'starts_at' => ['required', 'date'],
            'ends_at' => ['required', 'date', 'after_or_equal:starts_at'],
            'candidates' => ['nullable', 'array'],
        ];

        $candidateRules = StoreCandidateRequest::getCandidateRules('candidates.*.');

        return array_merge($electionRules, $candidateRules);
    }
}
