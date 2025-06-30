<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Purchase extends Model
{
    use HasFactory;

    protected $primaryKey = 'purchaseID';
    protected $fillable = ['userID','companyID','status','date','amount'];

    public function user()    { return $this->belongsTo(User::class,    'userID'); }
    public function company() { return $this->belongsTo(Company::class, 'companyID'); }
    public function items()   { return $this->hasMany(PurchaseItem::class,'purchaseID'); }
}

