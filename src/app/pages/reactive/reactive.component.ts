import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder, private validadores: ValidadoresService) {

    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListeners();
    
   }

  ngOnInit() {
  }

  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get apellidoNoValido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }

  get correoNoValido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }

  get distritoNoValido(){
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched
  }

  get ciudadNoValido(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched
  }

  get Password1NoValido(){
    return this.forma.get('password1').invalid && this.forma.get('password1').touched
  }

  get Password2NoValido(){
    const password1= this.forma.get('password1').value;
    const password2= this.forma.get('password2').value;
    return (password1=== password2)? false: true;
  }

  get usuarioNoValido(){
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched
  }
  
 

  crearFormulario(){
    this.forma= this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, this.validadores.noHerrera]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario: ['', , this.validadores.existeUsuario],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required],
      }),
      pasatiempos:this.fb.array([])

    }, {
      validators: this.validadores.passwordsIguales('password1', 'password2')
    });

  }

  cargarDataAlFormulario(){
    this.forma.reset({
      nombre: 'Cristobal',
      apellido: 'Lopez',
      correo: 'clopez@gmail.com',
      password1:'123',
      password2:'123',
      direccion: {
        distrito: 'Metropolitana',
        ciudad: 'Peñaflor'
      }

    });
  }

  agregarPasatiempo(){
    this.pasatiempos.push( this.fb.control('', Validators.required));
  }
  borrarPasatiempo(i:number){
    this.pasatiempos.removeAt(i);
  }

  guardar(){
    console.log(this.forma);

    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control=>{
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control=> control.markAsTouched());   
        }else{
          control.markAsTouched();            
        }
        
      });
      
    }
    this.forma.reset({
       nombre: 'Sin nombre'
    });
  }

  crearListeners(){
    // this.forma.valueChanges.subscribe(valor=>{
    //   console.log(valor);
    // });

    // this.forma.statusChanges.subscribe(status=> console.log({status}));

    this.forma.get('nombre').valueChanges.subscribe(console.log);
  }

}
