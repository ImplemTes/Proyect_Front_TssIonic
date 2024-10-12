import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  clienteForm: FormGroup;
  public selectedPageTitle: string = 'Clientes';
  clientes: any = [];
  selectedCliente: any = null;
  isModalOpenEliminar: boolean = false;
  isModalOpen: boolean = false;
  isModalOpenEditar: boolean = false;


  // Paginación
  p: number = 1; // Página actual
  itemsPerPage: number = 8; // Elementos por página



  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder
  ) {
    this.clienteForm = this.fb.group({
      apellidos: ['', Validators.required],
      nombres: ['', Validators.required],
      dni: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      celular: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      preferencias: [''],
      estado: [1],
    });
  }

  ngOnInit() {
    this.listarclientes();
  }

  listarclientes(): void {
    this.clienteService.list().subscribe(
      (resp: any) => {
        this.clientes = resp;
      },
      (error) => {
        console.error('Error al mostrar los clientes', error);
      }
    );
  }

  // Método para saber si un campo es inválido y fue tocado
  openModalRegistrar(): void {
    this.isModalOpen = true;
  }

  openModalEliminar(cliente: any = null): void {
    this.isModalOpenEliminar = true;
    this.selectedCliente = cliente;
  }
  closeModal(): void {
    this.isModalOpen = false;
    this.isModalOpenEditar = false;
    this.isModalOpenEliminar = false;
    this.selectedCliente = null;
    this.clienteForm.reset({ // reset pero con predetermin de lo contrario son null
      apellidos: '',
      nombres: '',
      dni: '',
      celular: '',
      preferencias: '',
      estado: 1,
    });
  }

  createCliente(): void {
    if (this.clienteForm.valid) {
      this.clienteService.create(this.clienteForm.value).subscribe(
        (resp: any) => {
          this.listarclientes();
          this.closeModal();
        },
        (error) => {
          console.error('Error al crear el cliente', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }

  //Para ver si un campo fue tocado para la list
  isFieldInvalid(field: string): boolean {
    const control = this.clienteForm.get(field);
    return !!control && control.invalid && control.touched;
  }


  onlyNumber(event: KeyboardEvent) {
    const char = String.fromCharCode(event.keyCode);
    if (!/^[0-9]*$/.test(char)) {
      event.preventDefault();
    }
  }

  openModalEditar(cliente: any = null): void {
    this.isModalOpenEditar = true;
    this.selectedCliente = cliente;
    // Usamos patchValue para cargar los datos
    this.clienteForm.patchValue({
      idusuario: cliente.idcliente,
      apellidos: cliente.apellidos,
      nombres: cliente.nombres,
      dni: cliente.dni,
      celular: cliente.celular,
      preferencias: cliente.preferencias,
      estado: cliente.estado ? '1' : '0', // Convertimos booleano a cadena
    });
  }

  editarcliente(): void {
    if (this.clienteForm.valid) {
      this.clienteService.updateCliente(this.selectedCliente.idcliente, this.clienteForm.value).subscribe(
        (resp: any) => {
          const index = this.clientes.findIndex((clien: any) => clien.idcliente === this.selectedCliente.idcliente);
          if (index !== -1) {
            this.clientes[index] = { ...this.clientes[index], ...this.clienteForm.value };
          }
          this.closeModal();
        },
        (error) => {
          console.error('Error al actualizar el cliente', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }


  deleteCliente(id: number): void {
    this.clienteService.deleteCliente(id).subscribe(() => {
      this.clientes = this.clientes.filter((clien: any) => clien.idcliente !== id);
      this.listarclientes();
      this.closeModal();
    });
  }



  //ionic g page clientes
  //ionic g service services/usuarios








}
