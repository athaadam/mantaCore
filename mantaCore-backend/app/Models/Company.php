<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Company extends Model
{
    use HasFactory;

    protected $primaryKey = 'companyID';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = ['companyName'];

    /* ────── RELATIONS ────── */
    public function users()     { return $this->hasMany(User::class,    'companyID'); }
    public function invoices()  { return $this->hasMany(Invoice::class, 'companyID'); }
    public function purchases() { return $this->hasMany(Purchase::class,'companyID'); }
}

