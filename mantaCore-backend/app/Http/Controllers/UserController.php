<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        return response(User::all());
    }

    public function store(Request $request): Response
    {
        $data = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);
        return response($user, 201);
    }

    public function show(User $user): Response
    {
        return response($user);
    }

    public function update(Request $request, User $user): Response
    {
        $data = $request->validate([
            'name'     => 'sometimes|required|string|max:255',
            'email'    => 'sometimes|required|email|unique:users,email,' . $user->userID . ',userID',
            'password' => 'sometimes|required|string|min:6',
        ]);

        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }

        $user->update($data);
        return response($user);
    }

    public function destroy(User $user): Response
    {
        $user->delete();
        return response(null, 204);
    }
}