<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PurchaseItem extends Model
{
    use HasFactory;

    protected $primaryKey = 'purchaseItemID';
    protected $fillable = [
        'purchaseID','itemID','type','quantity','unitPrice','subTotal'
    ];

    public function purchase() { return $this->belongsTo(Purchase::class,'purchaseID'); }
    public function item()     { return $this->belongsTo(Item::class,    'itemID'); }
}

