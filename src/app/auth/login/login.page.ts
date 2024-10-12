import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  proband: string = '';
  errorMessage: string = '';
  passwordType: string = 'password'; // Tipo de campo para contraseña
  passwordIcon: string = 'eye-off'; // Icono por defecto
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (resp: any) => {
            localStorage.setItem('token', resp.token);
            localStorage.setItem('email', resp.email);
            localStorage.setItem('rol', resp.rol);
            this.authService.updateStatusLoginService(true); // Actualiza el estado de inicio de sesión
            this.router.navigate(['/home']); // Redirige al usuario a la página principal
        },
        (error) => {
          console.error('Error en el login', error);
          this.errorMessage = 'Credenciales incorrectas. Vuelve a intentar';
        }
      );
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }

  }

  togglePasswordVisibility(): void {
    // Cambia entre mostrar y ocultar la contraseña
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off';
    }
  }


}
