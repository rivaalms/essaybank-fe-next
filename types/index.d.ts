declare type Menu = {
   label: string
   to: string
   icon: string
   role: ("admin" | "reviewer")[]
}

declare type DataTableColumn = {
   field: string
   header?: string
   style?: string
   [key: string]: any
}