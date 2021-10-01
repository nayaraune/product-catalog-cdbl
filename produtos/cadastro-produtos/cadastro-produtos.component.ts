import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Produto } from 'src/app/shared/models/produto';
import { ProdutoService } from 'src/app/core/produto.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';

@Component({
  selector: 'cdb-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.scss']
})
export class CadastroProdutosComponent implements OnInit {

  id: number;
  cadastro: FormGroup;
  tipo: Array<string>;

  constructor(public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.produtoService.visualizar(this.id)
        .subscribe((produto: Produto) => this.criarFormulario(produto));
    } else {
      this.criarFormulario(this.criarProdutoEmBranco());
    }

    this.tipo = ['Orgânico', 'Não Orgânico'];

  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }

    const produto = this.cadastro.getRawValue() as Produto;
    if (this.id) {
      produto.id = this.id;
    } else {
      this.salvar(produto);
    }
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private criarFormulario(produto: Produto): void {
    this.cadastro = this.fb.group({
      nome: [produto.nome, [Validators.required]],
      preco: [produto.preco, [Validators.required]],
      descricao: [produto.descricao, [Validators.required]],
      qtd: [produto.qtd, [Validators.required]],
      dtCadastro: [produto.dtCadastro, [Validators.required]],
      tipo: [produto.tipo, [Validators.required]]
    });
  }

  private criarProdutoEmBranco(): Produto {
    return {
      id: null,
      nome: null,
      preco: null,
      descricao: null,
      qtd: null,
      dtCadastro: null,
      tipo: null,
    } as Produto;
  }

  private salvar(produto: Produto): void {
    this.produtoService.salvar(produto).subscribe(() => {
      const config = {
        data: {
          btnSucesso: 'Ir para a listagem',
          btnCancelar: 'Cadastrar um novo produto',
          corBtnCancelar: 'accent',
          possuirBtnFechar: true
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if (opcao) {
          this.router.navigateByUrl('produtos');
        } else {
          this.reiniciarForm();
        }
      });
    },
      () => {
        const config = {
          data: {
            titulo: 'Erro ao salvar o registro!',
            descricao: 'Não conseguimos salvar seu registro, favor tentar novamente mais tarde',
            corBtnSucesso: 'warn',
            btnSucesso: 'Fechar'
          } as Alerta
        };
        this.dialog.open(AlertaComponent, config);
      });
  }


}
