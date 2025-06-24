<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>MantaCore Auth</title>
  <link rel="stylesheet" href="{{ asset('css/index.css') }}" />
</head>
<body>
  <div class="container">
    <div class="left-panel">
      <h1>Empowering Your<br>Business Workflow</h1>
      <div class="brand">
        <img src="{{ asset('images/logo.png') }}" alt="MantaCore Logo" />
      </div>
    </div>

    <div class="right-panel">
      <div class="form-wrapper" id="formWrapper">
        <!-- LOGIN FORM -->
        <div class="form-box" id="loginForm">
          <h2>Sign In</h2>
          @if(session('error'))
            <p style="color:red;">{{ session('error') }}</p>
          @endif
          <form method="POST" action="/login">
            @csrf
            <input type="text" name="username" placeholder="Username" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
          <a href="#" class="forgot">Forgot password?</a>
          <p class="switch">Doesn’t have an account? <a href="#" id="showRegister">Create now</a></p>
        </div>

        <!-- REGISTER FORM -->
        <div class="form-box" id="registerForm" style="display: none;">
          <h2>Register</h2>
          @if(session('register_error'))
            <p style="color:red;">{{ session('register_error') }}</p>
          @endif
          <form method="POST" action="/register">
            @csrf
            <input type="text" name="username" placeholder="Username" required />
            <input type="password" name="password" placeholder="Password" required />
            <input type="password" name="password_confirmation" placeholder="Confirmation Password" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="text" name="company" placeholder="Company Name" />
            <button type="submit">Register</button>
          </form>
          <p class="switch">Already have an account? <a href="#" id="showLogin">Login here</a></p>
        </div>
      </div>
    </div>
  </div>

  <script>
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    showRegister?.addEventListener('click', function(e) {
      e.preventDefault();
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
    });

    showLogin?.addEventListener('click', function(e) {
      e.preventDefault();
      registerForm.style.display = 'none';
      loginForm.style.display = 'block';
    });
  </script>
</body>
</html>