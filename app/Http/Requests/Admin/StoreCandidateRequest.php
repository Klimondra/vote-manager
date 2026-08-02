<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCandidateRequest extends FormRequest
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
     * Candidate rules, that can be applied also while storing in election request.
     *
     * @param string $prefix
     * @return string[]
     */
    public static function getCandidateRules(string $prefix = ''): array
    {
        return [
            $prefix.'name' => 'required|string|max:128',
            $prefix.'description' => 'nullable|string',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return self::getCandidateRules();
    }
}
