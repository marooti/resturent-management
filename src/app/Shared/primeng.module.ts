import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Primeng Modules
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CarouselModule } from 'primeng/carousel';
import { DataViewModule } from 'primeng/dataview';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RatingModule } from 'primeng/rating';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { ImageModule } from 'primeng/image';
import { StepsModule } from 'primeng/steps';
import { CheckboxModule } from 'primeng/checkbox';
import { GalleriaModule } from 'primeng/galleria';
import { ChipModule } from 'primeng/chip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, SharedModule } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { InputMaskModule } from 'primeng/inputmask';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MegaMenuModule } from 'primeng/megamenu';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { SkeletonModule } from 'primeng/skeleton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TimelineModule } from 'primeng/timeline';
import { ChipsModule } from 'primeng/chips';
import { MessageModule } from 'primeng/message';
import { SpeedDialModule } from 'primeng/speeddial';
import { MeterGroupModule } from 'primeng/metergroup';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    PanelModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    InputTextareaModule,
    TooltipModule,
    ConfirmPopupModule,
    CarouselModule,
    BreadcrumbModule,
    RatingModule,
    MenuModule,
    MenubarModule,
    SidebarModule,
    PanelMenuModule,
    BadgeModule,
    DividerModule,
    PaginatorModule,
    InputMaskModule,
    ColorPickerModule,
    MegaMenuModule,
    TabMenuModule,
    AccordionModule,
    SkeletonModule,
    SplitButtonModule,
    StepsModule,
    TimelineModule,
    ChipsModule,
    SpeedDialModule,
    MeterGroupModule
  ],
  exports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
    ImageModule,
    StepsModule,
    FileUploadModule,
    CalendarModule,
    InputTextareaModule,
    CheckboxModule,
    GalleriaModule,
    ChipModule,
    DropdownModule,
    SharedModule,
    ConfirmDialogModule,
    TooltipModule,
    DataViewModule,
    AvatarModule,
    AvatarGroupModule,
    InputSwitchModule,
    ConfirmPopupModule,
    CarouselModule,
    BreadcrumbModule,
    RatingModule,
    MenuModule,
    MenubarModule,
    SidebarModule,
    PanelMenuModule,
    BadgeModule,
    DividerModule,
    PaginatorModule,
    CardModule,
    ToastModule,
    InputMaskModule,
    ColorPickerModule,
    ProgressSpinnerModule,
    MegaMenuModule,
    TabMenuModule,
    TabViewModule,
    AccordionModule,
    SkeletonModule,
    SplitButtonModule,
    TimelineModule,
    PanelModule,
    MessageModule,
    ChipsModule,
    SpeedDialModule,
    MeterGroupModule,
    DialogModule
  ],
  providers: [
    ConfirmationService
  ]
})
export class PrimengModule { }
