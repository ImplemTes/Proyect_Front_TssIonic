import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  usuarioform: FormGroup;
  errorMessage: string | null = null;
  constructor(
    private router: Router,
    private userService: UsuariosService,
    private authService: AuthService,
    private fb: FormBuilder

  ) {
    this.usuarioform = this.fb.group({
      apellidos: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      idrol: [4],
      estado: [1],
    });
  }

  onSubmit(): void {
    if (this.usuarioform.invalid) {
      this.usuarioform.markAllAsTouched();
      console.error('El formulario es inválido');
      return;
    }

    const formValue = this.usuarioform.value;

    this.userService.create(formValue).subscribe(
      (resp: any) => {
        console.log('Usuario creado exitosamente:', resp);
        this.authService.login({ email: formValue.email, password: formValue.password }).subscribe(
          (loginResp: any) => {
            localStorage.setItem('token', loginResp.token);
            localStorage.setItem('email', loginResp.email);
            localStorage.setItem('rol', loginResp.rol);
            this.authService.updateStatusLoginService(true);
            this.router.navigate(['/home']);

          },
          (error) => {
            console.error('Error al iniciar sesión:', error);
            this.errorMessage = 'Credenciales incorrectas.';
          }
        );
      },
      (createError: any) => {
        console.error('Error al crear usuario:', createError);
        this.errorMessage = createError.error.message || 'Error al crear el usuario.';
      }
    );
  }
}
