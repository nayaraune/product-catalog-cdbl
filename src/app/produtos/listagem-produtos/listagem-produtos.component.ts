import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ProdutoService } from 'src/app/core/produto.service';
import { Produto } from 'src/app/shared/models/produto';
import { Alerta } from 'src/app/shared/models/alerta';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';



@Component({
  selector: 'cdb-listagem-produtos',
  templateUrl: './listagem-produtos.component.html',
  styleUrls: ['./listagem-produtos.component.scss']
})
export class ListagemProdutosComponent implements OnInit {
  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';
  
  
  ELEMENT_DATA : Produto[];
  displayedColumns: string[] = ['nome', 'preco','descricao','qtd', 'dtCadastro','tipo','actions'];
  dataSource = new MatTableDataSource<Produto>(this.ELEMENT_DATA);


  produto: Produto[] = [];
  filtrosListagem: FormGroup;
  tipo: Array<string>;
  id: number;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private produtoService: ProdutoService,
              private router: Router,
              public dialog: MatDialog,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;

    this.tipo = ['Orgânico', 'Não orgânico'];

    this.getAllReports();

    this.id = this.activatedRoute.snapshot.params['id'];
  }

  public getAllReports(){
    let resp = this.produtoService.productsList();
    resp.subscribe(report=>this.dataSource.data=report  as Produto[])
  }

  abrir(id: number): void {
    this.router.navigateByUrl('/produtos/' + id);
  }

  excluir(produtoId: number): void {
  const config = {
    data: {
      titulo: 'Você tem certeza que deseja excluir?',
      descricao: 'Caso você tenha certeza que deseja excluir, clique no botão OK',
      corBtnCancelar: 'primary',
      corBtnSucesso: 'warn',
      possuirBtnFechar: true
    } as Alerta
  };
  const dialogRef = this.dialog.open(AlertaComponent, config);
  dialogRef.afterClosed().subscribe((opcao: boolean) => {
    if (opcao) {
      this.produtoService.excluir(produtoId).subscribe({
        next: () => { 
            console.log('Deleted with success');
            this.getAllReports();
        },
        error: err => console.log('Error', err)
    })
    }
  });
}

 
}
