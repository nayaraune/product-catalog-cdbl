import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutosModule } from './produtos/produtos.module';
import { CadastroProdutosComponent } from './produtos/cadastro-produtos/cadastro-produtos.component';
import { ListagemProdutosComponent } from './produtos/listagem-produtos/listagem-produtos.component';

const routes: Routes = [

  {
      path: '',
      redirectTo: 'produtos',
      pathMatch: 'full'
  },
  {
    path: 'produtos',
    children: [
      {
        path: '',
        component: ListagemProdutosComponent
      },
      {
        path: 'cadastro',
        children: [
          {
            path: '',
            component: CadastroProdutosComponent
          },
          {
            path: ':id',
            component: CadastroProdutosComponent
          }
        ]
      }
    ]
  },
  { path: '**', redirectTo: 'produtos' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ProdutosModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
