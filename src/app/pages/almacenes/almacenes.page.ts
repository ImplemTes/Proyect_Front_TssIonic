import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlmacenService } from 'src/app/services/almacen.service';
@Component({
  selector: 'app-almacenes',
  templateUrl: './almacenes.page.html',
  styleUrls: ['./almacenes.page.scss'],
})
export class AlmacenesPage implements OnInit {
  almacenForm: FormGroup;
  public selectedPageTitle: string = 'Almacenes';
  almacenes: any = [];
  selectedAlmacen: any = null;
  isModalOpenEliminar: boolean = false;
  isModalOpen: boolean = false;
  isModalOpenEditar: boolean = false;

  // Paginación
  p: number = 1; // Página actual
  itemsPerPage: number = 8; // Elementos por página
  constructor(
    private almacenService: AlmacenService,
    private fb: FormBuilder
  ) {
    this.almacenForm = this.fb.group({
      nombre_almacen: ['', Validators.required],
      ubicacion_almacen: ['', Validators.required],
      descripcion_almacen: [''],
      estado_almacen: [1],
    });
  }

  ngOnInit() {
    this.listaralmacenes();
  }

  listaralmacenes(): void {
    this.almacenService.list().subscribe(
      (resp: any) => {
        this.almacenes = resp;
      },
      (error) => {
        console.error('Error al mostrar los almacenes', error);
      }
    );
  }

  openModalRegistrar(): void {
    this.isModalOpen = true;
  }

  openModalEliminar(almacen: any = null): void {
    this.isModalOpenEliminar = true;
    this.selectedAlmacen = almacen;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.isModalOpenEditar = false;
    this.isModalOpenEliminar = false;
    this.selectedAlmacen = null;
    this.almacenForm.reset({ // reset pero con predetermin de lo contrario son null
      nombre_almacen: '',
      ubicacion_almacen: '',
      descripcion_almacen: '',
      estado_almacen: 1,
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.almacenForm.get(field);
    return !!control && control.invalid && control.touched;
  }

  onlyNumber(event: KeyboardEvent) {
    const char = String.fromCharCode(event.keyCode);
    if (!/^[0-9]*$/.test(char)) {
      event.preventDefault();
    }
  }

  createAlmacen(): void {
    if (this.almacenForm.valid) {
      this.almacenService.create(this.almacenForm.value).subscribe(
        (resp: any) => {
          this.listaralmacenes();
          this.closeModal();
        },
        (error) => {
          console.error('Error al crea el almacen', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }

  openModalEditar(alma: any = null): void {
    this.isModalOpenEditar = true;
    this.selectedAlmacen = alma;
    // Usamos patchValue para cargar los datos
    this.almacenForm.patchValue({
      idalmacen: alma.idalmacen,
      nombre_almacen: alma.nombre_almacen,
      ubicacion_almacen: alma.ubicacion_almacen,
      descripcion_almacen: alma.descripcion_almacen,
      estado_almacen: alma.estado_almacen ? '1' : '0', // Convertimos booleano a cadena
    });
  }

  editarAlmacen(): void {
    if (this.almacenForm.valid) {
      this.almacenService.updateAlmacen(this.selectedAlmacen.idalmacen, this.almacenForm.value).subscribe(
        (resp: any) => {
          const index = this.almacenes.findIndex((alma: any) => alma.idalmacen === this.selectedAlmacen.idalmacen);
          if (index !== -1) {
            this.almacenes[index] = { ...this.almacenes[index], ...this.almacenForm.value };
          }
          this.closeModal();
        },
        (error) => {
          console.error('Error al actualizar el almacen', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }

  deleteAlmacen(identrada: number): void {
    this.almacenService.deleteAlmacen(identrada).subscribe(() => {
      this.almacenes = this.almacenes.filter((prove: any) => prove.idalmacen !== identrada);
      this.listaralmacenes();
      this.closeModal();
    });
  }

}
