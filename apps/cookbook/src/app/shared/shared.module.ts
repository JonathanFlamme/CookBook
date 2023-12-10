import { NgModule } from "@angular/core";
import { MaterialModule } from "./material/material.module";
import { FontAwesomeLibraryModule } from "./material/font-awesome.module";




@NgModule({
    imports: [MaterialModule,FontAwesomeLibraryModule],
    exports: [MaterialModule,FontAwesomeLibraryModule],
    declarations: [],
    providers: [],
})

export class SharedModule{}
