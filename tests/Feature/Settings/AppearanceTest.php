<?php

use App\Models\User;

test('appearance page can be rendered', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get(route('appearance.edit'));

    $response->assertOk();
});

test('settings root redirects to appearance page', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get('/settings');

    $response->assertRedirect(route('appearance.edit'));
});
