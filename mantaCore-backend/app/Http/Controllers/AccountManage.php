<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AccountManage extends Controller
{
    // ✅ Tambah user baru (khusus admin/management)
    public function addUser(Request $request)
    {
        // Optional: Batasi hanya admin/management yang boleh nambah user
        // if (!in_array($request->user()->role, ['admin', 'management'])) {
        //     return response()->json(['message' => 'Unauthorized'], 403);
        // }

        $data = $request->validate([
            'username'     => 'required|string|unique:users,username',
            'password'     => 'required|string|min:8|confirmed',
            'email'        => 'required|email|unique:users,email',
            'phone_number' => 'required|string|max:20',
            'role'         => 'required|string|in:cashier,management', // valid roles
        ]);

        // Ambil company ID dari user yang sedang login
        $companyID = $request->user()->companyID;

        // Buat user baru
        $user = User::create([
            'companyID'    => $companyID,
            'username'     => $data['username'],
            'password'     => Hash::make($data['password']),
            'email'        => $data['email'],
            'phone_number' => $data['phone_number'],
            'role'         => $data['role'],
            'status'       => 'active', // default status
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'user'    => $user,
        ], 201);
    }

    // ✅ Hapus user berdasarkan userID
    public function deleteUser(Request $request, $userID)
    {
        $user = User::where('userID', $userID)->first();
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Tidak boleh hapus diri sendiri
        if ($user->userID === $request->user()->userID) {
            return response()->json(['message' => 'You cannot delete yourself'], 403);
        }

        // Tidak boleh hapus admin
        if ($user->role === 'admin') {
            return response()->json(['message' => 'You cannot delete an admin user'], 403);
        }

        //ubah user status menjadi tidak aktif
        $user->status = 'inactive';
        $user->save();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }

    // ✅ Update user berdasarkan userID
    public function updateUser(Request $request, $userID)
    {
        $user = User::where('userID', $userID)->first();
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $data = $request->validate([
            'username'     => 'sometimes|string|unique:users,username,' . $user->userID . ',userID',
            'email'        => 'sometimes|email|unique:users,email,' . $user->userID . ',userID',
            'phone_number' => 'sometimes|string|max:20',
            'role'         => 'nullable|string|in:cashier,management',
            'status'       => 'sometimes|string|in:active,inactive', // Tambahkan validasi status
        ]);

        $user->update($data);

        return response()->json([
            'message' => 'User updated successfully',
            'user'    => $user,
        ]);
    }
}
