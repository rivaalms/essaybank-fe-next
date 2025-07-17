declare type Menu = {
   label: string
   to: string
   icon: string
}

declare type DataTableColumn = {
   field: string
   header?: string
   style?: string
   [key: string]: any
}