import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../shared/page-title.service';
import { ClienteService } from '../services/cliente.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';

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

  constructor(
    private pageTitleService: PageTitleService,
    private clienteService: ClienteService,
    private modalRegistroController: ModalController,
    private fb: FormBuilder
  ) {
    this.clienteForm = this.fb.group({
      apellidos: ['', Validators.required],
      nombres: ['', Validators.required],
      edad: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      dni: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      estado: [1]
    });
  }

  ngOnInit() {
    this.listarclientes();
  }

  listarclientes(): void {
    this.clienteService.getClientes().subscribe(
      (resp) => {
        this.clientes = resp.clientes;
      },
      (error) => {
        console.error('Error al mostrar los clientes', error);
      }
    );
  }

  openModalRegistrar(): void {
    this.isModalOpen = true;
    this.clienteForm.reset(); // Resetea el formulario al abrir el modal
  }

  openModalEliminar(cliente: any = null): void {
    this.isModalOpenEliminar = true;
    this.selectedCliente = cliente;
  }

  openModalEditar(cliente: any = null): void {
    this.isModalOpenEditar = true;
    this.selectedCliente = cliente;

    // Usamos patchValue para cargar los datos
    this.clienteForm.patchValue({
      apellidos: cliente.apellidos,
      nombres: cliente.nombres,
      edad: cliente.edad,
      dni: cliente.dni,
      estado: cliente.estado
    });
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.isModalOpenEditar = false;
    this.isModalOpenEliminar = false;
    this.selectedCliente = null;
  }

  createCliente(): void {
    if (this.clienteForm.valid) {
      this.clienteService.createCliente(this.clienteForm.value).subscribe(
        (resp: any) => {
          this.clientes.push(resp.cliente);
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

  deleteCliente(id: number): void {
    this.clienteService.deleteCliente(id).subscribe(() => {
      this.clientes = this.clientes.filter((clien: any) => clien.idcliente !== id);
      this.listarclientes();
      this.closeModal();
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
}
