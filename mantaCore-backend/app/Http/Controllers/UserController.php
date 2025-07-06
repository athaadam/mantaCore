<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Invoice;
use App\Models\Item;
use App\Models\Purchase;
use App\Models\User;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\Costumer;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // 🔧 Edit profile
    public function editProfile(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'username'     => 'sometimes|string|unique:users,username,' . $user->userID . ',userID',
            'email'        => 'sometimes|email|unique:users,email,' . $user->userID . ',userID',
            'phone_number' => 'sometimes|string|max:20',
        ]);

        $user->update($data);

        return response()->json([
            'message' => 'Profile updated successfully',
            'user'    => $user,
        ]);
    }

    // 🔐 Ganti password
    public function changePassword(Request $request)
    {
        $user = $request->user();

        // Validasi input
        $data = $request->validate([
            'current_password' => 'required|string',
            'new_password'     => 'required|string|min:8|confirmed',
        ]);

        // Cek apakah password saat ini benar
        if (!Hash::check($data['current_password'], $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 403);
        }

        // Update password
        $user->password = Hash::make($data['new_password']);
        $user->save();

        return response()->json([
            'message' => 'Password changed successfully'
        ]);
    }

    public function deleteAccount(Request $request)
    {
        $user = $request->user();

        try {
            if ($user->role === 'admin') {
                DB::transaction(function () use ($user) {
                    $this->deleteCompanyData($user->companyID); // panggil helper di sini
                });

                $user->currentAccessToken()?->delete();

                return response()->json([
                    'message' => 'Admin and all company data deleted successfully'
                ]);
            }

            //ubah status user menjadi tidak aktif
            $user->status = 'inactive';
            $user->save();
            $user->currentAccessToken()?->delete();

            return response()->json([
                'message' => 'Account deleted successfully'
            ]);

        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Failed to delete account',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    // 👥 Ambil semua user dalam satu company
    public function getAllUsers(Request $request)
    {
        $users = User::where('companyID', $request->user()->companyID)
            ->with('company')
            //ambil user yang statusnya aktif
            ->where('status', 'active')
            ->get();

        return response()->json($users);
    }

    // 👤 Ambil user berdasarkan username
    public function getUserByName(Request $request, $username)
    {
        $user = User::where('username', $username)
            ->where('companyID', $request->user()->companyID)
            ->with('company')
            ->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }

    private function deleteCompanyData(int $companyID): void
    {
        Invoice::where('companyID', $companyID)->delete();
        Purchase::where('companyID', $companyID)->delete();
        Item::where('companyID', $companyID)->delete();
        User::where('companyID', $companyID)->delete();
        Company::where('companyID', $companyID)->delete();
        Costumer::where('companyID', $companyID)->delete();
    }

}
