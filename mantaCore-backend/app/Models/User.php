<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $primaryKey = 'userID';

    // Tambahkan email dan phone_number ke fillable
    protected $fillable = [
        'companyID',
        'username',
        'email',
        'phone_number',
        'password',
        'role',
    ];

    // password & remember_token disembunyikan dalam response
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Auto-hash password jika menggunakan Laravel >=10
    protected $casts = [
        'password' => 'hashed',
    ];

    /* ────── RELATIONS ────── */
    public function company()   { return $this->belongsTo(Company::class, 'companyID'); }
    public function invoices()  { return $this->hasMany(Invoice::class, 'userID'); }
    public function purchases() { return $this->hasMany(Purchase::class,'userID'); }
}
