<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>MantaCore Account Management</title>
  <link rel="stylesheet" href="{{asset('css/page.css')}}" />
  <link rel="stylesheet" href="{{asset('css/accountManage.css')}}" />
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="logo">
        <img src="{{asset('images/logo.png')}}" alt="MantaCore" />
      </div>
      <ul>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/sales">Sales Report</a></li>
        <li><a href="/purchase-approval">Purchase Approval</a></li>
        <li><a href="/inventory">Inventory</a></li>
        <li class="active"><a href="/account-manage">Account Management</a></li>
        <li><a href="/profile">Profile</a></li>
      </ul>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <h1>Account Management</h1>

      <!-- Add/Edit Account -->
      <div class="add-account-section">
        <div class="form-header">
          <h2 id="formTitle">Add New Account</h2>
          <button id="cancelEdit" class="cancel-btn" style="display: none;">Cancel Edit</button>
        </div>
        <form id="accountForm" class="account-form">
          <input type="text" id="fullName" placeholder="Full Name" required />
          <input type="email" id="email" placeholder="Email" required />
          <input type="text" id="username" placeholder="Username" required />
          <select id="role" required>
            <option value="">Select Role</option>
            <option value="cashier">Cashier</option>
            <option value="inventory_manager">Inventory Manager</option>
            <option value="admin">Admin</option>
          </select>
          <input type="password" id="password" placeholder="Password" required />
          <button type="submit" id="submitBtn">Add Account</button>
        </form>
      </div>

      <!-- Account Table -->
      <div class="account-table-section">
        <h2>Account List</h2>
        <table class="account-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="accountTableBody">
            <!-- Dummy data inserted via JS -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
<script>
  const dummyAccounts = [
    { name: "Alice Johnson", username: "alicej", role: "Admin", status: "Active" },
    { name: "Bob Smith", username: "bobcashier", role: "Cashier", status: "Active" },
    { name: "Carol Lee", username: "carolinventory", role: "Inventory Manager", status: "Inactive" }
  ];

  let editIndex = -1;

  function renderAccounts() {
    const tbody = document.getElementById("accountTableBody");
    tbody.innerHTML = "";
    dummyAccounts.forEach((acc, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${acc.name}</td>
        <td>${acc.username}</td>
        <td>
          <select class="role-select" data-index="${index}">
            <option value="Admin" ${acc.role === "Admin" ? "selected" : ""}>Admin</option>
            <option value="Cashier" ${acc.role === "Cashier" ? "selected" : ""}>Cashier</option>
            <option value="Inventory Manager" ${acc.role === "Inventory Manager" ? "selected" : ""}>Inventory Manager</option>
          </select>
        </td>
        <td class="${acc.status === 'Active' ? 'status-active' : 'status-inactive'}">${acc.status}</td>
        <td>
          <button class="edit-btn" onclick="editAccount(${index})">Edit</button>
          <button class="delete-btn" onclick="deleteAccount(${index})">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    });

    // Tambahkan event listener untuk select role
    document.querySelectorAll('.role-select').forEach(select => {
      select.addEventListener('change', function() {
        const idx = this.getAttribute('data-index');
        dummyAccounts[idx].role = this.value;
        renderAccounts(); // Refresh table to reflect changes
      });
    });
  }

  function deleteAccount(index) {
    dummyAccounts.splice(index, 1);
    renderAccounts();
  }

  function editAccount(index) {
    const acc = dummyAccounts[index];
    document.getElementById("fullName").value = acc.name;
    document.getElementById("email").value = acc.email || "";
    document.getElementById("username").value = acc.username;
    document.getElementById("role").value = acc.role.toLowerCase().replace(" ", "_");
    document.getElementById("password").value = "";
    document.getElementById("formTitle").textContent = "Edit Account";
    document.getElementById("submitBtn").textContent = "Save Changes";
    document.getElementById("cancelEdit").style.display = "inline-block";
    editIndex = index;
  }

  document.getElementById("accountForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const role = document.getElementById("role").value.replace("_", " ");
    const status = "Active";

    if (editIndex === -1) {
      dummyAccounts.push({ name, username, role: role.charAt(0).toUpperCase() + role.slice(1), status });
    } else {
      dummyAccounts[editIndex] = { name, username, role: role.charAt(0).toUpperCase() + role.slice(1), status };
      editIndex = -1;
      document.getElementById("formTitle").textContent = "Add New Account";
      document.getElementById("submitBtn").textContent = "Add Account";
      document.getElementById("cancelEdit").style.display = "none";
    }

    e.target.reset();
    renderAccounts();
  });

  document.getElementById("cancelEdit").addEventListener("click", function () {
    editIndex = -1;
    document.getElementById("accountForm").reset();
    document.getElementById("formTitle").textContent = "Add New Account";
    document.getElementById("submitBtn").textContent = "Add Account";
    this.style.display = "none";
  });

  window.onload = renderAccounts;
</script>
<script>
  document.querySelectorAll('.sidebar ul li').forEach(function(li) {
    li.addEventListener('click', function(e) {
      const link = li.querySelector('a');
      if (link) {
        // Hindari double navigation jika klik langsung pada <a>
        if (e.target !== link) {
          window.location.href = link.getAttribute('href');
        }
      }
    });
  });
</script>
</body>
</html>
