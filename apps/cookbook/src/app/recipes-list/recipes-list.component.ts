import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RecipeService } from '../shared/recipes/recipe.service';
import { RecipeModel } from '@cookbook/models';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Subscription,
  debounceTime,
  map,
  merge,
  startWith,
  switchMap,
} from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { RecipeListQuery } from '../shared/recipes/recipe-list-query';
import { categoriesLabel } from '../components/ui/category-label';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss',
})
export class RecipesListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly recipeService: RecipeService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
  ) {}

  public categoriesLabel: { value: string; label: string }[] = [];
  private subscriptions: Subscription[] = [];

  public queryForm = this.fb.group({
    query: this.fb.control<string>(''),
    category: this.fb.control<string>(''),
    orderBy: this.fb.control<string>('updatedAt'),
    order: this.fb.control<string>('DESC'),
  });

  public recipes: RecipeModel[] = [];
  public loading = true;
  public pageIndex = 0;
  public pageSize = 12;
  public pageSizeOptions: number[] = [12, 25, 50, 100];

  public ngOnInit(): void {
    const routeSub = this.route.queryParams.subscribe((routeParams) => {
      this.pageIndex = routeParams['page'] || 0;
      this.pageSize = routeParams['limit'] || this.pageSizeOptions[0];
      this.queryForm.patchValue({
        orderBy: routeParams['orderBy'] || 'updatedAt',
        order: routeParams['order'] || 'DESC',
      });
    });
    this.subscriptions.push(routeSub);

    this.categoriesLabel = categoriesLabel;
  }

  public ngAfterViewInit(): void {
    const querySub = merge(
      this.paginator.page,
      this.queryForm.valueChanges.pipe(debounceTime(300))
      .pipe(
        startWith({}),
        map(
          () =>
            ({
              query: this.queryForm.get('query')?.value || '',
              category: this.queryForm.get('category')?.value || '',
              page: this.paginator.pageIndex,
              limit: this.paginator.pageSize,
              orderBy: this.queryForm.get('orderBy')?.value || '',
              order: this.queryForm.get('order')?.value || '',
            } as RecipeListQuery),
        ),

        switchMap((params) => {
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: params,
            replaceUrl: true,
          });
          return this.recipeService.list(params);
        }),
      )
      .subscribe(({ items, count }) => {
        this.loading = false;
        this.paginator.length = count;
        this.recipes = items;
      });
    this.subscriptions.push(querySub);
  }
}
