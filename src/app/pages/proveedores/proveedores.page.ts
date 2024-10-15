import { Component, OnInit } from '@angular/core';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.page.html',
  styleUrls: ['./proveedores.page.scss'],
})
export class ProveedoresPage implements OnInit {
  proveedorForm: FormGroup;
  public selectedPageTitle: string = 'Proveedores';
  proveedores: any = [];
  selectedProveedor: any = null;
  isModalOpenEliminar: boolean = false;
  isModalOpen: boolean = false;
  isModalOpenEditar: boolean = false;

    // Paginación
    p: number = 1; // Página actual
    itemsPerPage: number = 8; // Elementos por página
  constructor(
    private proveedorService: ProveedorService,
    private fb: FormBuilder
  ) {
    this.proveedorForm = this.fb.group({
      apellidos: ['', Validators.required],
      nombres: ['', Validators.required],
      dni: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      celular: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      nombre_proveedor: ['', Validators.required],
      ruc: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      estado: [1],
    });
  }

  ngOnInit() {
    this.listarproveedores();
  }
  listarproveedores(): void {
    this.proveedorService.list().subscribe(
      (resp: any) => {
        this.proveedores = resp;
      },
      (error) => {
        console.error('Error al mostrar los proveedores', error);
      }
    );
  }
  // Método para saber si un campo es inválido y fue tocado
  openModalRegistrar(): void {
    this.isModalOpen = true;
  }

  openModalEliminar(cliente: any = null): void {
    this.isModalOpenEliminar = true;
    this.selectedProveedor = cliente;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.isModalOpenEditar = false;
    this.isModalOpenEliminar = false;
    this.selectedProveedor = null;
    this.proveedorForm.reset({ // reset pero con predetermin de lo contrario son null
      apellidos: '',
      nombres: '',
      dni: '',
      celular: '',
      nombre_proveedor: '',
      ruc: '',
      estado: 1,
    });
  }

  //Para ver si un campo fue tocado para la list
  isFieldInvalid(field: string): boolean {
    const control = this.proveedorForm.get(field);
    return !!control && control.invalid && control.touched;
  }

  onlyNumber(event: KeyboardEvent) {
    const char = String.fromCharCode(event.keyCode);
    if (!/^[0-9]*$/.test(char)) {
      event.preventDefault();
    }
  }

  createProveedor(): void {
    if (this.proveedorForm.valid) {
      this.proveedorService.create(this.proveedorForm.value).subscribe(
        (resp: any) => {
          this.listarproveedores();
          this.closeModal();
        },
        (error) => {
          console.error('Error al crear el proveedor', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }


  openModalEditar(prove: any = null): void {
    this.isModalOpenEditar = true;
    this.selectedProveedor = prove;
    // Usamos patchValue para cargar los datos
    this.proveedorForm.patchValue({
      idusuario: prove.idcliente,
      apellidos: prove.apellidos,
      nombres: prove.nombres,
      dni: prove.dni,
      celular: prove.celular,
      nombre_proveedor: prove.nombre_proveedor,
      ruc: prove.ruc,
      estado: prove.estado ? '1' : '0', // Convertimos booleano a cadena
    });
  }

  editarproveedor(): void {
    if (this.proveedorForm.valid) {
      this.proveedorService.updateProveedor(this.selectedProveedor.idproveedor, this.proveedorForm.value).subscribe(
        (resp: any) => {
          const index = this.proveedores.findIndex((prove: any) => prove.idproveedor === this.selectedProveedor.idproveedor);
          if (index !== -1) {
            this.proveedores[index] = { ...this.proveedores[index], ...this.proveedorForm.value };
          }
          this.closeModal();
        },
        (error) => {
          console.error('Error al actualizar el proveedor', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }

  deleteProveedor(id: number): void {
    this.proveedorService.deleteProveedor(id).subscribe(() => {
      this.proveedores = this.proveedores.filter((prove: any) => prove.idproveedor !== id);
      this.listarproveedores();
      this.closeModal();
    });
  }

}
