import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {


  }

  form = new FormGroup({
    ida: new FormControl('', Validators.required),
    origen: new FormControl('', Validators.required),
    destino: new FormControl(''),
    salida: new FormControl(''),
    vuelta: new FormControl(''),
  });
  disableDestino = false;

  ngOnInit(): void {


    this.form.get("ida")?.valueChanges.subscribe(x => {

      if (x === "ida") {
        this.form.get('destino')?.disable()
        this.form.get('destino')?.setValue('')
        this.form.get('vuelta')?.setValue('')
        this.form.get('vuelta')?.disable()

      } else {
        this.form.get('destino')?.enable();
        this.form.get('vuelta')?.enable();
      }
      console.log('firstname value changed')
      console.log(x)
    })
  }

}
