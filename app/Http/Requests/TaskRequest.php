<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'is_completed' => ['required', 'boolean'],
            'order' => ['required', 'integer', 'min:1'],
        ];
    }

    /**
     * Get the validation attributes that apply to the request.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'title' => 'título',
            'is_completed' => 'completado',
            'order' => 'orden',
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'El :attribute es requerido.',
            'title.string' => 'El :attribute debe ser una cadena de texto.',
            'title.max' => 'El :attribute no puede ser mayor a :max caracteres.',
            'is_completed.required' => 'El :attribute es requerido.',
            'is_completed.boolean' => 'El :attribute debe ser un valor booleano.',
            'order.required' => 'El :attribute es requerido.',
            'order.integer' => 'El :attribute debe ser un número entero.',
            'order.min' => 'El :attribute no puede ser menor a :min.',
        ];
    }
}
