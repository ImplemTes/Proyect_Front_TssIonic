import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AbastecimientoService } from 'src/app/services/abastecimiento.service';
import { ProductoService } from 'src/app/services/producto.service';
import { AlmacenService } from 'src/app/services/almacen.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
@Component({
  selector: 'app-abastecimiento',
  templateUrl: './abastecimiento.page.html',
  styleUrls: ['./abastecimiento.page.scss'],
})
export class AbastecimientoPage implements OnInit {
  detallleForm: FormGroup;
  public selectedPageTitle: string = 'Abastecimiento';
  detalles: any = [];
  productos: any = [];
  almacenes: any = [];
  proveedores: any = [];
  selectedDetallle: any = null;
  isModalOpenEliminar: boolean = false;
  isModalOpen: boolean = false;
  isModalOpenEditar: boolean = false;
  isMobileView: boolean = false;
  
  // Paginación
  p: number = 1; // Página actual
  itemsPerPage: number = 8; // Elementos por página

  fechaa: string = ''; // Declara la variable aquí
  constructor(
    private DetalleService: AbastecimientoService,
    private productoService: ProductoService,
    private almacenService: AlmacenService,
    private proveedorService: ProveedorService,
    private fb: FormBuilder) {
      
      const currentDate = this.formatDate(); // Formato YYYY-MM-DDTHH:mm:ss

      this.detallleForm = this.fb.group({
        idproveedor: [''],
        idalmacen: [''],
        idproducto: [''],
        cantidad_abastecimiento: ['', [Validators.required, Validators.min(1)]],
        estado: [1],
      });
  }

  ngOnInit() {

    this.listarproveedores();
    this.listaralmacenes();
    this.listarProductos();
    this.listardetalles();
    this.checkScreenSize();
  }

  formatDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }
  // Detectar cambios en el tamaño de pantalla
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }
  checkScreenSize() {
    this.isMobileView = window.innerWidth < 720;
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

  listarProductos(): void {
    this.productoService.list().subscribe(
      (resp: any) => {
        this.productos = resp;
      },
      (error) => {
        console.error('Error al mostrar los productos', error);
      }
    );
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



  listardetalles(): void {
    this.DetalleService.list().subscribe(
      (resp: any) => {
        this.detalles = resp;
      },
      (error) => {
        console.error('Error al mostrar los Detalles', error);
      }
    );
  }





  openModalRegistrar(): void {
    this.isModalOpen = true;
  }
  openModalEliminar(detalle: any = null): void {
    this.isModalOpenEliminar = true;
    this.selectedDetallle = detalle;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.isModalOpenEditar = false;
    this.isModalOpenEliminar = false;
    this.selectedDetallle = null;
    this.detallleForm.reset({ // reset pero con predetermin de lo contrario son null
      idproveedor: '',
      idalmacen: '',
      idproducto: '',
      cantidad_abastecimiento: '',
      estado: 1,
    });
  }

  //Verifica si un campo es inválido y ha sido tocado
  isFieldInvalid(field: string): boolean {
    const control = this.detallleForm.get(field);
    return !!control && control.invalid && control.touched;
  }

  //Permite solo números en un campo de entrada
  onlyNumber(event: KeyboardEvent) {
    const char = String.fromCharCode(event.keyCode);
    if (!/^[0-9]*$/.test(char)) {
      event.preventDefault();
    }
  }

  createDetalle(): void {
    if (this.detallleForm.valid) {
      this.DetalleService.create(this.detallleForm.value).subscribe(
        (resp: any) => {
          this.listardetalles();
          this.closeModal();
        },
        (error) => {
          console.error('Error al crea el detalle', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }

  deleteDetalle(identrada: number): void {
    this.DetalleService.delete(identrada).subscribe(() => {
      this.detalles = this.detalles.filter((abas: any) => abas.idabastecimiento !== identrada);
      this.listardetalles();
      this.closeModal();
    });
  }

  openModalEditar(detall: any = null): void {
    this.isModalOpenEditar = true;
    this.selectedDetallle = detall;
    // Usamos patchValue para cargar los datos
    this.detallleForm.patchValue({
      idproveedor: detall.idproveedor,
      idalmacen: detall.idalmacen,
      idproducto: detall.idproducto,
      cantidad_abastecimiento: detall.cantidad_abastecimiento,
      estado: detall.estado ? '1' : '0', // Convertimos booleano a cadena
    });
  }

  editarDetalle(): void {
    if (this.detallleForm.valid) {
      this.DetalleService.update(this.selectedDetallle.idabastecimiento, this.detallleForm.value).subscribe(
        (resp: any) => {
          const index = this.detalles.findIndex((detal: any) => detal.idabastecimiento === this.selectedDetallle.idabastecimiento);
          if (index !== -1) {
            this.detalles[index] = { ...this.detalles[index], ...this.detallleForm.value };
          }
          this.listardetalles();
          this.closeModal();
        },
        (error) => {
          console.error('Error al actualizar el detalle', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }
}
