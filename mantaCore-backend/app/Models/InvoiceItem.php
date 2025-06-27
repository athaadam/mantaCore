<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class InvoiceItem extends Model
{
    use HasFactory;

    protected $primaryKey = 'invoiceItemID';
    protected $fillable = [
        'invoiceID','itemID','type','quantity','unitPrice','subTotal'
    ];

    public function invoice() { return $this->belongsTo(Invoice::class,'invoiceID'); }
    public function item()    { return $this->belongsTo(Item::class,   'itemID'); }
}
