import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit} from '@angular/core';
import { authState, user } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public email: string = ""
  password: string = ""
  passwordConfirm:  string = ""
  sex: string = "Sexo"
  age: string = ""
  cp: string = "28986"
  sepomex: string = ""
  state: string = ""
  city: string = ""
  study: string = "Estudios"
  job: string = "Ocupacion"
  passwordmessage: string = ""
 

  constructor(private http: HttpClient, private db: Firestore, private auth: Auth) {

   }

  createRequestOption(){
    const headers = new HttpHeaders ({
     'Content-Type': 'application/json',
     'Apikey': '44e5c7f7f4af06352cc287e0e2240b6de1b953cd',
     
     });
    return headers
  }

  getAdress(){
    let option = this.createRequestOption()
    console.log("entro")

    return this.http.get<any>(this.sepomex,{ headers: option})
       .subscribe(resp=>{ 
         console.log(resp)
        this.state = resp.codigo_postal.estado
        this.city = resp.codigo_postal.municipio
        
        
       })
    
  }


  

  checkCp(){
    this.sepomex =  "https://sepomex.razektheone.com/codigo_postal?cp=" + this.cp
    this.getAdress()
    console.log(this.cp)
  }

  ls( event: any){
    this.cp = event.target.value
    if(event.target.value.length >= 5)
    {
      console.log("bien")
      this.cp = event.target.value
      this.checkCp()
    }
  }

  async sendForm(){
  
    console.log(this.sex)

    // if(this.password.length <= 7 || (this.password != this.passwordConfirm) || this.email == ""){
    //   return(alert("Datos Incompletos, revise correo y constraseña"))
    // }



    // await createUserWithEmailAndPassword(this.auth, this.email, this.password)
    // .then( async userCredential => {
    //   if(userCredential.user){
    //     await setDoc(doc(this.db,"costumer",this.email.slice(0,this.email.indexOf("@"))), {
    //       name: this.email.slice(0,this.email.indexOf("@")),
    //       email: this.email,
    //       age: this.age,
    //       sex: this.sex,
    //       cp: this.cp,
    //       state: this.state,
    //       city: this.city,
    //       study: this.study,
    //       job: this.job
    
    //     });
    //     //Redireccion a pagina de usuario
    //   }
    // })
    // .catch(error => {
    //   console.log(error.code)
    //   if(error.code == 'auth/email-already-in-use'){
    //     alert("Usuario ya registrado")
    //   }
    //   if(error.code == 'auth/weak-password'){
    //     alert("Contraseña Corta")
    //   }

    // })
    
  

    

  }

  checkPassword( event: any){
    if(this.password.length <=7 && this.password != "")
    {
      this.passwordmessage = "Contraseña muy corta"
    }
    else{
      this.passwordmessage = ""
      if(this.password != this.passwordConfirm)
      {
        this.passwordmessage = "Contraseñas no coinsiden"
      }
    }

    
    console.log(event.target.value)
    
  }

  ngOnInit(): void {
  }

}
