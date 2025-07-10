<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Invoice extends Model
{
    use HasFactory;

    protected $primaryKey = 'invoiceID';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'invoiceID',
        'userID',
        'companyID',
        'costumerID',
        'date',
        'amount'
    ];

    public function user()     { return $this->belongsTo(User::class,     'userID'); }
    public function company()  { return $this->belongsTo(Company::class,  'companyID'); }
    public function costumer() { return $this->belongsTo(Costumer::class, 'costumerID'); }
    public function items()    { return $this->hasMany(InvoiceItem::class,'invoiceID'); }
}
