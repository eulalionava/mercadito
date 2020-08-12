import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//COMPONENTES
import { MainComponent } from './componentes/main/main.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';


//RUTAS
const appRoutes:Routes = [
    {path:'',component:LoginComponent},
    {path:'login',component:LoginComponent},
    {path:'main',component:MainComponent},
    {path:'registro',component:RegistroComponent},
    {path:'perfil/:idUser',component:PerfilComponent},


    {path:'**',component:LoginComponent}
];

export const appRoutingProviders:any[] = [];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes,{useHash:true});

