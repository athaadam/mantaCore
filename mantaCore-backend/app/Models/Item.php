<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Item extends Model
{
    use HasFactory;

    protected $primaryKey = 'itemID';

    protected $fillable = [
        'name',
        'itemPrice',
        'category',
        'type',
        'units',
        'description',
        'stock', // ← tambahkan ini
    ];

    public function invoiceItems()  { return $this->hasMany(InvoiceItem::class,  'itemID'); }
    public function purchaseItems() { return $this->hasMany(PurchaseItem::class, 'itemID'); }
}
