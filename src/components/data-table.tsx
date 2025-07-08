import {DataType, EditingMode, SortingMode, Table} from "ka-table"
// import "ka-table/style.css"
import {Column} from "ka-table/models";
import {ICellTextProps} from "ka-table/props";
import {deleteRow} from "ka-table/actionCreators";
import {
    EllipsisVertical, LucideProps,
    Search,

} from "lucide-react";
import {cn} from "@/lib/utils.ts";
import {Input} from "@/components/ui/input.tsx";
import {ForwardRefExoticComponent, RefAttributes, useState} from "react";
import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "./ui/dropdown-menu";
import {Button} from "@/components/ui/button.tsx";

type tableData = Record<string, unknown>

type TableProps<T> = {
   title?: string
   rows: tableData []
   columns: Column []
   primaryKey : string
   isLoading?: boolean
   isFetching?: boolean
   actions?: TableActionButtonsProps<T>[]
}

type TableActionButtonsProps<R> = {
    icon? : ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
    label : string
    className?: string
    onClick: (cell :ICellTextProps<R>) => void
}

// const DeleteRow = ({dispatch, rowKeyValue}: ICellTextProps) => {
//     return (
//         <Trash
//             onClick={()=>{
//                 dispatch(deleteRow(rowKeyValue))
//             }}
//         >
//         </Trash>
//     );
// };

export default function DataTable({rows, columns, actions, primaryKey, title, isLoading, isFetching} : TableProps) {

    const [searchText, setSearchText] = useState('');

    return <div className={"flex flex-col gap-4 h-full max-h-screen w-full rounded bg-white"}>

        <div className={"flex items-center justify-between pr-2"}>
            <div className={"flex gap-2 items-center"}>
                <h1 className="text-lg font-Poppins_Semibold">{title}</h1>
                <div className={"flex items-center relative"}>
                    <Search strokeWidth={2} size={18} className={cn("absolute ml-3 stroke-stone-600")}/>
                    <Input className="mx-auto pl-8 w-48 border border-stone-400 text-stone-600 h-4 lg:w-72 m-1" placeholder="Search" type="search" name={searchText} onChange={(e)=>{
                        setSearchText(e.target.value);
                    }}></Input>
                </div>
            </div>

            <div className={"flex items-center bg-red-500"}>
                hello
            </div>

        </div>

        <div className={cn(`h-auto w-full overflow-auto rounded-md border border-stone-300`)}>
            <Table
                columns={ actions ? [...columns,
                    {
                        key: ':manage',
                        width: 40,
                        title: 'Menu',
                        dataType: DataType.Object,
                        isSortable: false,
                        isResizable: false,
                    }] : columns
                }
                data={rows}
                searchText={searchText}
                rowKeyField={primaryKey}
                sortingMode={SortingMode.Single}
                editingMode={EditingMode.None}
                loading={{enabled: isLoading || isFetching, text:"Loading..."}}
                childComponents={{
                    table: {
                        elementAttributes: () => ({
                            className: "min-w-full table-fixed border-separate border-spacing-0"
                        })
                    },
                    tableHead: {
                        elementAttributes: ()=>({
                            className:cn(`sticky top-0 z-5 bg-stone-100 h-10 border-b border-stone-300 text-gray-500 text-sm tracking-wide font-bold`),
                        })
                    },
                    headCell: {
                        elementAttributes: ()=> ({
                            className: cn("p-2 border-b border-stone-300 border-r text-left bg-stone-100 last:border-r-0"),
                        })
                    },

                    cell:{
                        elementAttributes: ()=>(
                            {
                                className:cn("px-4 py-2 text-sm border-b border-r border-stone-300 last:border-r-0"),
                            }
                        )
                    },
                    dataRow: {
                        elementAttributes: ()=>({
                            className:cn("hover:bg-stone-50 transition-colors duration-150 ease-in-out"),
                        })
                    },
                    cellText: {
                        content: (props)=>{
                                if(actions && props.column.key === ":manage") {
                                   return <div className={""}>
                                       {TableActionBtn<T>(actions, props)}
                                   </div>
                                }
                        }
                    },
                }}

            />
        </div>
    </div>

}


function TableActionBtn<T>(actions: TableActionButtonsProps<T>[], props: ICellTextProps<T>) {
      return <DropdownMenu>
          <DropdownMenuTrigger asChild>
               <Button className={"bg-transparent hover:bg-stone-transparent shadow-none"}>
                   <EllipsisVertical size={18} className={"text-stone-500"}></EllipsisVertical>
               </Button>
          </DropdownMenuTrigger>


                      <DropdownMenuContent className="relative right-2 lg:right-4">
                          {
                              actions.map((action, index) => {
                                  return (<DropdownMenuItem className={action.className}
                          key={index}
                          onClick={()=>action.onClick(props)}
                          >
                              {action.icon && <action.icon className="mr-2 size-4"></action.icon>}
                              <span>{action.label}</span>
                          </DropdownMenuItem>)

                          })
                          }
                      </DropdownMenuContent>

      </DropdownMenu>
}