<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Costumer extends Model
{
    use HasFactory;

    protected $primaryKey = 'costumerID';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = ['username'];

    public function invoices() { return $this->hasMany(Invoice::class,'costumerID'); }
}

