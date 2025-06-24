<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $username = $request->input('username');
        $password = $request->input('password');

        // Cek ke database user
        $user = DB::table('user')
            ->where('username', $username)
            ->where('password', $password) // ⚠️ Harusnya pakai Hash::check di produksi
            ->first();

        if ($user) {
            // Simpan session
            Session::put('userID', $user->userID);
            Session::put('username', $user->username);
            Session::put('role', $user->role);

            return redirect('/dashboard');
        }

        return back()->with('error', 'Username atau Password salah');
    }

    public function register(Request $request)
    {
        $request->validate([
            'username' => 'required|unique:user,username',
            'password' => 'required|confirmed|min:4',
            'company' => 'nullable|string|max:100',
        ]);

        // Insert company jika diisi
        $companyID = null;
        if ($request->filled('company')) {
            $companyID = DB::table('company')->insertGetId([
                'companyName' => $request->company
            ]);
        }

        // Simpan user baru
        $userID = DB::table('user')->insertGetId([
            'username' => $request->username,
            'password' => $request->password, // ⚠️ Untuk produksi pakai Hash::make
            'companyID' => $companyID,
            'role' => 'admin'
        ]);

        // Auto login setelah register
        Session::put('userID', $userID);
        Session::put('username', $request->username);
        Session::put('role', 'admin');

        return redirect('/dashboard');
    }

    public function dashboard()
    {
        if (!Session::has('username')) {
            return redirect('/');
        }

        return view('dashboard', [
            'username' => Session::get('username'),
            'role' => Session::get('role')
        ]);
    }

    public function logout()
    {
        Session::flush();
        return redirect('/');
    }
}
