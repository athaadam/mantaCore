<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CompanyController extends Controller
{
    // GET /api/companies
    public function index(): Response { return response(Company::all()); }

    // POST /api/companies
    public function store(Request $request): Response {
        $data = $request->validate(['companyName' => 'required|string|max:255']);
        $company = Company::create($data);
        return response($company, 201);
    }

    // GET /api/companies/{company}
    public function show(Company $company): Response { return response($company); }

    // PUT/PATCH /api/companies/{company}
    public function update(Request $request, Company $company): Response {
        $data = $request->validate(['companyName' => 'sometimes|required|string|max:255']);
        $company->update($data);
        return response($company);
    }

    // DELETE /api/companies/{company}
    public function destroy(Company $company): Response {
        $company->delete();
        return response(null, 204);
    }
}