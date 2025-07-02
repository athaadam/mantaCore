<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    //edit profile
    public function editProfile(Request $request)
    {
        $user = $request->user();
        $data = $request->validate([
            'username'     => 'sometimes|string|unique:users,username,' . $user->id,
            'email'        => 'sometimes|email|unique:users,email,' . $user->id,
            'phone_number' => 'sometimes|string|max:20',
        ]);
        $user->update($data);
        return response()->json([
            'message' => 'Profile updated successfully',
            'user'    => $user,
        ]);
    }

    //ganti password
    public function changePassword(Request $request)
    {
        $user = $request->user();
        $data = $request->validate([
            'current_password' => 'required|string',
            'new_password'     => 'required|string|min:8|confirmed',
        ]);
        if (!\Hash::check($data['current_password'], $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 403);
        }
        $user->password = \Hash::make($data['new_password']);
        $user->save();
        return response()->json([
            'message' => 'Password changed successfully',
        ]);
    }

    //delete account
    public function deleteAccount(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'admin') {
            // Hapus semua data terkait company
            \DB::transaction(function () use ($user) {
                $companyID = $user->companyID;

                // Hapus semua invoice, purchase, item milik company
                \App\Models\Invoice::where('companyID', $companyID)->delete();
                \App\Models\Purchase::where('companyID', $companyID)->delete();
                \App\Models\Item::where('companyID', $companyID)->delete();

                // Hapus semua user di company
                \App\Models\User::where('companyID', $companyID)->delete();

                // Hapus company
                \App\Models\Company::where('id', $companyID)->delete();
            });

            return response()->json([
                'message' => 'Admin and all company data deleted successfully',
            ]);
            //otomatis logout user setelah hapus akun
            $request->user()->currentAccessToken()->delete();
        } else {
            // Hanya hapus akun user sendiri
            $user->delete();
            return response()->json([
                'message' => 'Account deleted successfully',
            ]);
        }
    }

    //get all user data
    public function getAllUsers(Request $request)
    {
        $users = \App\Models\User::where('companyID', $request->user()->companyID)
            ->with('company')
            ->get();
        return response()->json($users);   
    }

    //get user by name
    public function getUserByName(Request $request, $username)
    {
        $user = \App\Models\User::where('username', $username)
            ->where('companyID', $request->user()->companyID)
            ->with('company')
            ->first();
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);  
        }
        return response()->json($user);
    }
}
