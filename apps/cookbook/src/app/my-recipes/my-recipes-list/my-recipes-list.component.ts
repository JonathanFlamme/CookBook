import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RecipeService } from '../../shared/recipes/recipe.service';
import { RecipeModel } from '@cookbook/models';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import {
  Observable,
  Subscription,
  debounceTime,
  map,
  merge,
  startWith,
  switchMap,
} from 'rxjs';
import { categoriesLabel } from '../../shared/ui/category-label';
import { RecipeListQuery } from '../../shared/recipes/recipe-list-query';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { RecipesFilterBottomSheetComponent } from '../../shared/recipes/recipes-filter-bottom-sheet/recipes-filter-bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-my-recipes-list',

  templateUrl: './my-recipes-list.component.html',
  styleUrl: './my-recipes-list.component.scss',
})
export class MyRecipesListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly recipeService: RecipeService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly bottomSheet: MatBottomSheet,
  ) {}

  public categoriesLabel: { value: string; label: string }[] = [];
  private subscriptions: Subscription[] = [];

  public queryForm = this.fb.group({
    query: this.fb.control<string>(''),
  });

  public filterForm = this.fb.group({
    category: this.fb.control<string>(''),
    orderBy: this.fb.control<string>('updatedAt'),
    order: this.fb.control<string>('DESC'),
  });

  // isLargeScreen = 1280px
  public isLargeScreen$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Large)
    .pipe(map((result) => !result.matches));

  public recipes: RecipeModel[] = [];
  public loading = true;
  public pageIndex = 0;
  public pageSize = 12;
  public pageSizeOptions: number[] = [12, 25, 50, 100];
  public filtersCount: number = 0;

  public ngOnInit(): void {
    const routeSub = this.route.queryParams.subscribe((routeParams) => {
      this.pageIndex = routeParams['page'] || 0;
      this.pageSize = routeParams['limit'] || this.pageSizeOptions[0];
      this.queryForm.patchValue({
        query: routeParams['query'] || '',
      });
      this.filterForm.patchValue({
        category: routeParams['category'] || '',
        orderBy: routeParams['orderBy'] || 'updatedAt',
        order: routeParams['order'] || 'DESC',
      });
    });
    this.subscriptions.push(routeSub);

    this.categoriesLabel = categoriesLabel;
  }

  public ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Recettes par page';

    const querySub = merge(
      this.paginator.page,
      this.queryForm.valueChanges.pipe(debounceTime(300)),
      this.filterForm.valueChanges,
    )
      .pipe(
        startWith({}),
        map(
          () =>
            ({
              query: this.queryForm.get('query')?.value || '',
              category: this.filterForm.get('category')?.value || '',
              page: this.paginator.pageIndex,
              limit: this.paginator.pageSize,
              orderBy: this.filterForm.get('orderBy')?.value || '',
              order: this.filterForm.get('order')?.value || '',
            } as RecipeListQuery),
        ),

        switchMap((params) => {
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: params,
            replaceUrl: true,
          });
          return this.recipeService.listByUserId(params);
        }),
      )
      .subscribe(({ items, count }) => {
        this.loading = false;
        this.paginator.length = count;
        this.recipes = items;
      });
    this.subscriptions.push(querySub);
  }

  public openFilter(): void {
    const bottomSheetRef = this.bottomSheet.open(
      RecipesFilterBottomSheetComponent,
      {
        data: {
          order: this.filterForm.value.order,
          orderBy: this.filterForm.value.orderBy,
        },
      },
    );
    bottomSheetRef.afterDismissed().subscribe((filterDataForm) => {
      if (filterDataForm) {
        this.filterForm.patchValue(filterDataForm);
        this.filtersCount = this.getFiltersCount(filterDataForm);
      }
    });
  }

  public getFiltersCount(filterDataForm: {
    orderBy: string;
    order: string;
    [key: string]: string;
  }): number {
    const defaultValues: { [key: string]: string } = {
      orderBy: 'updatedAt',
      order: 'DESC',
    };
    return Object.keys(this.filterForm.value).reduce((count, key) => {
      if (filterDataForm[key] !== defaultValues[key]) {
        return count + 1;
      }
      return count;
    }, 0);
  }
}
