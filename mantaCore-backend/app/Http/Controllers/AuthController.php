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

        if (empty($credentials['username'])) {
            return response()->json(['message' => 'Username is required'], 422);
        }

        if (empty($credentials['password'])) {
            return response()->json(['message' => 'Password is required'], 422);
        }

        $user = User::where('username', $credentials['username'])->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if (!Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Incorrect password'], 401);
        }

        // If user status is not active
        if ($user->status !== 'active') {
            return response()->json(['message' => 'User is not active'], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token'   => $token,
            'user'    => $user,
            'role'    => $user->role,
        ]);
    }

    // 📝 Register pakai username + company
    public function register(Request $request)
    {
        $fields = ['username', 'password', 'password_confirmation', 'company', 'email', 'phone_number'];
        foreach ($fields as $field) {
            if (empty($request->$field)) {
                return response()->json(['message' => ucfirst(str_replace('_', ' ', $field)) . ' is required'], 422);
            }
        }

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

        // Generate unique companyID (3 uppercase letters from company name)
        $companyName = preg_replace('/[^A-Za-z]/', '', $data['company']); // only letters
        $companyID = strtoupper(substr($companyName, 0, 3));
        if (strlen($companyID) < 3) {
            $companyID = str_pad($companyID, 3, 'X'); // pad if less than 3 chars
        }

        // Cek jika companyID sudah ada, tambahkan angka sampai unik
        $originalCompanyID = $companyID;
        $counter = 1;
        while (Company::where('companyID', $companyID)->exists()) {
            $companyID = $originalCompanyID . $counter;
            $counter++;
        }

        // Cek apakah company name sudah ada
        $existingCompany = Company::where('companyName', $data['company'])->first();
        if ($existingCompany) {
            return response()->json([
                'message' => 'Company name already exists'
            ], 409);
        }

        // Buat waktu langganan 30 hari dari sekarang
        $now = now();
        $subscriptionUntil = $now->copy()->addDays(30);

        //buat company code unik menggunakan companyName
        $companyCode = strtoupper(substr(preg_replace('/[^A-Za-z]/', '', $data['company']), 0, 3)) . '' . $companyID;
        // Cek apakah company code sudah ada,jika sudah ada generate kode baru
        $originalCompanyCode = $companyCode;
        $counter = 1;
        while (Company::where('companyCode', $companyCode)->exists()) {
            $companyCode = $originalCompanyCode . $counter;
            $counter++;
        }

        // Buat company baru
        $company = Company::create([
            'companyID'          => $companyID,
            'companyName'        => $data['company'],
            'companyCode'        => $companyCode, // Kode unik untuk perusahaan
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
