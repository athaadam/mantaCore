<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AccountManage extends Controller
{
    //funtcion menambah user
    public function addUser(Request $request)
    {
        // Optional: Batasi hanya management yang bisa menambah user
        // if ($request->user()->role !== 'management') {
        //     return response()->json(['message' => 'Unauthorized'], 403);
        // }

        $data = $request->validate([
            'username'      => 'required|string|unique:users,username',
            'password'      => 'required|string|min:8|confirmed',
            'email'         => 'required|email|unique:users,email',
            'phone_number'  => 'required|string|max:20',
            'role'          => 'required|string|in:cashier,management', // role harus diisi
        ]);

        //ambil company id user yang sedang login
        $companyID = $request->user()->companyID;

        //buat user baru
        $user = User::create([
            'companyID'    => $companyID,
            'username'     => $data['username'],    
            'password'     => Hash::make($data['password']),
            'email'        => $data['email'],
            'phone_number' => $data['phone_number'],
            'role'         => $data['role'],
        ]);
        return response()->json([
            'message' => 'User created successfully',
            'user'    => $user,
        ], 201);
    }

    //function menghapus user
    public function deleteUser(Request $request, $userID)
    {
        // Optional: Batasi hanya management yang bisa menghapus user
        // if ($request->user()->role !== 'management') {
        //     return response()->json(['message' => 'Unauthorized'], 403);
        // }

        $user = User::find($userID);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        // Cek apakah user yang akan dihapus adalah user yang sedang login
        if ($user->id === $request->user()->id) { // gunakan id, bukan userID
            return response()->json(['message' => 'You cannot delete yourself'], 403);
        }
        // Cek apakah user yang akan dihapus adalah admin
        if ($user->role === 'admin') {
            return response()->json(['message' => 'You cannot delete an admin user'], 403);
        }
        // Hapus user
        $user->delete();
        return response()->json(['message' => 'User deleted successfully'], 200);
    }
}
