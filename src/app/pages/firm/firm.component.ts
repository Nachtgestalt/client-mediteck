import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';
import {pairwise, switchMap, takeUntil} from 'rxjs/operators';
import {UserService} from '../../services/user/user.service';
import Swal from 'sweetalert2';
import {FirmService} from '../../services/firm/firm.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-firm',
  templateUrl: './firm.component.html',
  styleUrls: ['./firm.component.css']
})
export class FirmComponent implements AfterViewInit {

  @ViewChild('canvas') public canvas: ElementRef;
  @Input() public width = 500;
  @Input() public height = 200;
  @Output() acceptTerminus: EventEmitter<any>;

  form: FormGroup;
  private cx: CanvasRenderingContext2D;
  private user: any;
  public show = true;
  canvasEl: HTMLCanvasElement;

  constructor(
    private _firm: FirmService,
    private _userService: UserService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.form = new FormGroup(
      {
        accept: new FormControl('', [Validators.required]),
      }
    );
    this.acceptTerminus = new EventEmitter<any>();
  }

  public ngAfterViewInit() {
    this.canvasEl = this.canvas.nativeElement;
    this.cx = this.canvasEl.getContext('2d');
    this.canvasEl.width = this.width;
    this.canvasEl.height = this.height;
    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';
    this.captureEvents();
  }

  private captureEvents() {
    // this will capture all mousedown events from the canvas element
    fromEvent(this.canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(this.canvasEl, 'mousemove')
            .pipe(
              // we'll stop (and unsubscribe) once the user releases the mouse
              // this will trigger a 'mouseup' event
              takeUntil(fromEvent(this.canvasEl, 'mouseup')),
              // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
              takeUntil(fromEvent(this.canvasEl, 'mouseleave')),
              // pairwise lets us get the previous value to draw a line from
              // the previous point to the current point
              pairwise()
            );
        })
      )
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = this.canvasEl.getBoundingClientRect();

        // previous and current position with the offset
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };

        // this method we'll implement soon to do the actual drawing
        this.drawOnCanvas(prevPos, currentPos);
      });
  }

  private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
    if (!this.cx) {
      return;
    }

    this.cx.beginPath();

    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y); // from
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
  }

  clearCanvas() {
    this.cx.clearRect(0, 0, this.width, this.height);
  }

  submit() {
    Swal.fire({
      title: 'Confirmación',
      text: '¿Está seguro de guardar esta firma?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Swal.showLoading();
        this._firm.setFirm(this.canvasEl.toDataURL(), this.user.id).subscribe(
          response => {
            this._userService.getDataUser(localStorage.getItem('username'))
              .subscribe(
                (res: any) => {
                  const usuario = res.Usuario;
                  const menu = res.Menu;
                  const idSuscripcion = res.Suscripcion.id;
                  this._userService.setInStorage(usuario, menu, idSuscripcion);
                  Swal.close();
                  Swal.fire({
                    icon: 'success',
                    title: 'Operación Éxitosa',
                    text: 'Se aceptaron los términos y condiciones satisfactoriamente'
                  });
                  this.acceptTerminus.emit(false);
                },
                error1 => {
                  console.log('error1 --> ', error1);
                  Swal.close();
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El servicio no está disponible en este momento'
                  });
                }
              );
          },
          error => {
            console.log('error --> ', error);
            Swal.close();
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'El servicio no está disponible en este momento'
            });
          }
        );
      }
    });
  }
}
