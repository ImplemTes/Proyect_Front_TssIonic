import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/services/roles.service';
import { UsuarioAcceso } from 'src/app/models/user.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  personas: any = [];
  roles: any = [];
  public selectedPageTitle: string = 'Usuarios';
  isModalOpen: boolean = false;
  selectedusuario: any = null;
  userForm: FormGroup;

    // Paginación
    p: number = 1; // Página actual
    itemsPerPage: number = 5; // Elementos por página
  constructor(
    public userService: UsuariosService,
    public rolService: RolesService,
    private fb: FormBuilder,
  ) {
    this.userForm = this.fb.group({
      idusuario: [''],
      idrol: [''], // Debe ser un número
      estado: ['']
    });
  }

  ngOnInit() {
    this.listUsers();
  }

  listUsers() {
    this.userService.list().subscribe((resp: any) => {
      this.personas = resp;
    },
      (error) => {
        console.error('Error al cargar los usuarios', error);
      }
    );
  }
  listRoles() {
    this.rolService.listarR().subscribe((resp: any) => {
      this.roles = resp;
    },
      (error) => {
        console.error('Error al cargar los roles', error);
      }
    );
  }
  closeModal() {
    this.isModalOpen = false;
    this.selectedusuario = null;
  }
  openModaleditUser(user: any = null): void {
    //tomar datos los usuarios
    this.listRoles();
    this.isModalOpen = true;
    this.selectedusuario = user;

    // Usamos patchValue para cargar los datos
    this.userForm.patchValue({
      idusuario: user.idusuario,
      idrol: user.idrol,
      estado: user.estado ? '1' : '0', // Convertimos booleano a cadena
    });
  }
  submitForm() {
    if (this.userForm.valid) {
      console.log('Valores del formulario:', this.userForm.value); // Agrega esta línea
      const useracc: UsuarioAcceso = {
        idusuario: this.userForm.value.idusuario,
        idrol: this.userForm.value.idrol,
        estado: this.userForm.value.estado
      };
      const userId = this.userForm.value.idusuario;

      this.userService.actualizar_acceso(userId, useracc).subscribe(
        response => {
          console.log('Usuario actualizado:', response);
          this.listUsers();
          this.closeModal();
        },
        (error) => {
          console.error('Error al actualizar el usuario', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }
}
