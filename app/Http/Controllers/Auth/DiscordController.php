<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class DiscordController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('discord')->redirect();
    }

    public function callback() {
        $discord_user = Socialite::driver('discord')->user();

        $user = User::updateOrCreate(['discord_id' => $discord_user->getId()], [
            'username' => $discord_user->getNickname() ?? $discord_user->getName(),
            'avatar' => $discord_user->getAvatar(),
            'email' => $discord_user->getEmail(),
        ]);

        Auth::login($user, true);

        return redirect()->intended('/dashboard');
    }
}
