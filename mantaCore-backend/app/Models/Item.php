<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Item extends Model
{
    use HasFactory;

    protected $primaryKey = 'itemID';
    public $incrementing = false; // <- WAJIB untuk string primary key
    protected $keyType = 'string'; // <- WAJIB untuk string primary key

    protected $fillable = [
        'itemID',
        'companyID',
        'name',
        'itemPrice',
        'category',
        'type',
        'units',
        'stock',
    ];

    public function invoiceItems()  { return $this->hasMany(InvoiceItem::class,  'itemID'); }
    public function purchaseItems() { return $this->hasMany(PurchaseItem::class, 'itemID'); }
}
