<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // 🔐 Login pakai username
    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');

        $user = User::where('username', $credentials['username'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        //jika status user tidak aktif
        if ($user->status !== 'active') {
            return response()->json(['message' => 'User is not active'], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token'   => $token,
            'user'    => $user,
            'role'    => $user->role, // tambahkan ini
        ]);
    }

    // 📝 Register pakai username + company
    public function register(Request $request)
    {
        $data = $request->validate([
            'username'      => 'required|string|unique:users,username',
            'password'      => 'required|string|min:8|confirmed',
            'company'       => 'required|string|max:255',
            'email'         => 'required|email|unique:users,email',
            'phone_number'  => 'required|string|max:20',
        ]);

        //cek apakah user sudah ada
        $existingUser = User::where('username', $data['username'])->first();
        if ($existingUser) {
            return response()->json([
                'message' => 'Username already exists'
            ], 409);
        }

        // Cek apakah company sudah ada
        $existingCompany = Company::where('companyName', $data['company'])->first();
        if ($existingCompany) {
            return response()->json([
                'message' => 'Company name already exists'
            ], 409);
        }

        // Buat waktu langganan 30 hari dari sekarang
        $now = now();
        $subscriptionUntil = $now->copy()->addDays(30);

        // Buat company baru
        $company = Company::create([
            'companyName'        => $data['company'],
            'subscription_start' => $now,
            'subscription_until' => $subscriptionUntil,
        ]);

        // Buat user baru
        $user = User::create([
            'username'     => $data['username'],
            'password'     => bcrypt($data['password']),
            'email'        => $data['email'],
            'phone_number' => $data['phone_number'],
            'companyID'    => $company->companyID,
            'role'         => 'admin',
            'status'       => 'active', // default status
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful',
            'token'   => $token,
            'user'    => $user,
            'company' => $company,
        ]);
    }


    // 🗑️ Logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }
}
