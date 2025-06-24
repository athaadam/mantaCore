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

        //cek apakah company sudah ada
        $existingCompany = null;
        if ($request->filled('company')) {
            $existingCompany = DB::table('company')
                ->where('companyName', $request->company)
                ->first();
            //jika sudah ada kirim esan error
            if ($existingCompany) {
                return back()->with('error', 'Company sudah terdaftar');
            }
        }

        // cek apakah company name ada spasi
        if (strpos($request->company, ' ') !== false) {
            return back()->with('error', 'Company name tidak boleh mengandung spasi');
        }

        // cek aakah company name mengandung karakter khusus
        if (!preg_match('/^[a-zA-Z0-9]+$/', $request->company)) {
            return back()->with('error', 'Company name hanya boleh mengandung huruf dan angka');
        }
        // Simpan company baru jika ada
        $companyID = null;
        if ($request->filled('company')) {
            $companyID = DB::table
            ('company')->insertGetId([
                'companyName' => $request->company,
                'created_at' => now(),
                'updated_at' => now()
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
