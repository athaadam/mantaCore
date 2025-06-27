<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable
{
    use HasFactory;

    protected $primaryKey = 'userID';
    protected $fillable = ['companyID','username','password','role'];
    protected $hidden   = ['password','remember_token'];

    /* casts agar password auto-hash (Laravel 10) */
    protected $casts = ['password' => 'hashed'];

    public function company()   { return $this->belongsTo(Company::class, 'companyID'); }
    public function invoices()  { return $this->hasMany(Invoice::class, 'userID'); }
    public function purchases() { return $this->hasMany(Purchase::class,'userID'); }
}


