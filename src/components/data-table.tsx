import {DataType, EditingMode, SortingMode, Table} from "ka-table"
// import "ka-table/style.css"
import {Column} from "ka-table/models";
import {ICellTextProps} from "ka-table/props";
import {
    EllipsisVertical, LucideProps,
    Search,

} from "lucide-react";
import {cn} from "@/lib/utils.ts";
import {Input} from "@/components/ui/input.tsx";
import {ForwardRefExoticComponent, ReactNode, RefAttributes, useState} from "react";
import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "./ui/dropdown-menu";
import {Button} from "@/components/ui/button.tsx";
import PageLoader from "@/components/ui/page-loader.tsx";

type tableData = Record<string, unknown>

type TableProps = {
   title?: string
   rows: tableData []
   columns: Column []
   primaryKey : string
   isLoading?: boolean
   isFetching?: boolean
   actions?: TableActionButtonsProps []
   children?: ReactNode
}

type TableActionButtonsProps = {
    icon? : ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
    label : string
    className?: string
    onClick: (cell :ICellTextProps) => void
}


export default function DataTable({rows, columns, actions, primaryKey, title, isLoading, isFetching, children} : TableProps) {

    const [searchText, setSearchText] = useState('');

    return <div className={"flex flex-col gap-4 h-full max-h-screen w-full rounded bg-white"}>

        <div className={"flex gap-2 items-center justify-between flex-wrap lg:flex-nowrap"}>
            <div>  <h1 className="text-lg font-Poppins_Semibold lg:text-nowrap">{title}</h1></div>
            <div className={"flex gap-2 items-center flex-wrap w-full justify-between lg:justify-end"}>

                <div className={"flex items-center relative"}>
                    <Search strokeWidth={2} size={18} className={cn("absolute ml-3 stroke-stone-600")}/>
                    <Input className="mx-auto pl-8 w-48 border border-stone-400 text-stone-600 h-4 lg:w-72" placeholder="Search" type="search" name={searchText} onChange={(e)=>{
                        setSearchText(e.target.value);
                    }}></Input>
                </div>

                <div className={""}>
                    {children}
                </div>
            </div>


        </div>

        <div className={cn(`h-auto w-full overflow-auto rounded-md border border-stone-300`)}>
            <Table
                columns={ actions ? [...columns,
                    {
                        key: ':manage',
                        width: 30,
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
                loading={{enabled: isLoading || isFetching}}
                childComponents={{
                    table: {
                        elementAttributes: () => ({
                            // className: "min-w-full table-fixed border-separate border-spacing-0"
                            className: cn("border-separate border-spacing-0"),
                            style: {
                                minWidth: '100%',
                                // On small screens, force `max-content`
                                ['@media (max-width: 1024px)']: {
                                    minWidth: 'max-content',
                                },
                            }
                        })
                    },
                    tableHead: {
                        elementAttributes: ()=>({
                            className:cn(`sticky top-0 z-5 bg-stone-100 h-10 border-b border-stone-300 text-gray-500 text-sm tracking-wide font-bold`),
                        })
                    },
                    headCell: {
                        elementAttributes: ({column})=> ({
                            className: cn(`p-2 border-b border-stone-300 border-r text-left bg-stone-100 last:border-r-0 `, column.key === ':manage' && `sticky right-0 z-[2] bg-stone-100 border-l text-center max-w-${column.width} border-stone-300`),
                            style: {
                                minWidth: column.width ? `${column.width}px` : "auto",
                            }
                        })
                    },
                    cell:{
                        elementAttributes: ({column})=>(
                            {
                                className:cn(`px-4 py-2 text-sm border-b border-r border-stone-300 last:border-r-0 min-w-${column.width}`, column.key === ':manage' && 'sticky right-0 z-[2] bg-stone-100 border-l border-stone-300'),
                            }
                        )
                    },
                    dataRow: {
                        elementAttributes: ()=>({
                            className:cn("bg-white hover:bg-stone-50 transition-colors duration-150 ease-in-out"),
                        })
                    },

                    cellText: {
                        content: (props)=>{
                                if(actions && props.column.key === ":manage") {
                                   return <div className={`max-w-${props.column.width} text-center`}>
                                       {TableActionBtn(actions, props)}
                                   </div>
                                }
                        }
                    },
                    noDataRow: {
                        content: ()=>{
                            if(isFetching || isLoading){
                                return <div className={"flex gap-2 justify-center items-center py-2"}> <PageLoader/><span className="text-stone-500">fetching data</span> </div>
                            }
                            return <div className={"text-center text-stone-500  w-full py-2"}>No data available!</div>
                        }
                    },

                }}
            />
        </div>
    </div>

}


function TableActionBtn(actions: TableActionButtonsProps[], props: ICellTextProps) {
      return <DropdownMenu>
          <DropdownMenuTrigger asChild>
               <Button className={"bg-transparent hover:bg-stone-100 hover:rounded-full shadow-none"}>
                   <EllipsisVertical size={16} className={"text-stone-500"}></EllipsisVertical>
               </Button>
          </DropdownMenuTrigger>
                      <DropdownMenuContent className="relative right-2 lg:right-4">
                          {
                              actions.map((action, index) => {
                                  return (<DropdownMenuItem className={action.className}
                                  key={index}
                                  onClick={()=>action.onClick(props)}>
                              {action.icon && <action.icon className="mr-2 size-4"></action.icon>}
                              <span>{action.label}</span>
                          </DropdownMenuItem>) })}
                      </DropdownMenuContent>
      </DropdownMenu>
}