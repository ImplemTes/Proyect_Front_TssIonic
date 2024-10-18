import { RolesService } from 'src/app/services/roles.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.page.html',
  styleUrls: ['./roles.page.scss'],
})
export class RolesPage implements OnInit {
  rolForm: FormGroup;
  public selectedPageTitle: string = 'Roles';
  roles: any = [];
  selectidRol: any = null;
  isModalOpenEliminar: boolean = false;
  isModalOpen: boolean = false;
  isModalOpenEditar: boolean = false;

  // Paginación
  p: number = 1; // Página actual
  itemsPerPage: number = 8; // Elementos por página

  constructor(
    private rolService: RolesService,
    private fb: FormBuilder
  ) {
    this.rolForm = this.fb.group({
      nombre_rol: ['', Validators.required],
      estado_rol: [1],
    });
  }

  ngOnInit() {
    this.listaroles();
  }

  listaroles(): void {
    this.rolService.listarR().subscribe(
      (resp: any) => {
        this.roles = resp;
      },
      (error) => {
        console.error('Error al mostrar los roles', error);
      }
    );
  }

  // Método para saber si un campo es inválido y fue tocado
  openModalRegistrar(): void {
    this.isModalOpen = true;
  }

  openModalEliminar(rol: any = null): void {
    this.isModalOpenEliminar = true;
    this.selectidRol = rol;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.isModalOpenEditar = false;
    this.isModalOpenEliminar = false;
    this.selectidRol = null;
    this.rolForm.reset({ // reset pero con predetermin de lo contrario son null
      nombre_rol: '',
      estado_rol: 1,
    });
  }

  //Para ver si un campo fue tocado para la list
  isFieldInvalid(field: string): boolean {
    const control = this.rolForm.get(field);
    return !!control && control.invalid && control.touched;
  }

  createRol(): void {
    if (this.rolForm.valid) {
      this.rolService.create(this.rolForm.value).subscribe(
        (resp: any) => {
          this.listaroles();
          this.closeModal();
        },
        (error) => {
          console.error('Error al crear el rol', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }


  openModalEditar(role: any = null): void {
    this.isModalOpenEditar = true;
    this.selectidRol = role;
    // Usamos patchValue para cargar los datos
    this.rolForm.patchValue({
      idrol: role.idrol,
      nombre_rol: role.nombre_rol,
      estado_rol: role.estado_rol ? '1' : '0', // Convertimos booleano a cadena
    });
  }



  editarrol(): void {
    if (this.rolForm.valid) {
      this.rolService.edit(this.selectidRol.idrol, this.rolForm.value).subscribe(
        (resp: any) => {
          const index = this.roles.findIndex((role: any) => role.idrol === this.selectidRol.idrol);
          if (index !== -1) {
            this.roles[index] = { ...this.roles[index], ...this.rolForm.value };
          }
          this.closeModal();
        },
        (error) => {
          console.error('Error al actualizar el rol', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }


  deleteRol(id: number): void {
    this.rolService.delete(id).subscribe(() => {
      this.roles = this.roles.filter((role: any) => role.idrol !== id);
      this.listaroles();
      this.closeModal();
    });
  }
}