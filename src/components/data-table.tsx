import {useEffect, useState} from "react";
import {
    ControlledPropsKeys, DispatchFunc, FilterFunc, FormatFunc, NoData, SearchFunc, SortFunc
} from "ka-table/types";
import {EditingMode, FilteringMode, ITableProps, kaReducer, SortingMode, Table} from "ka-table";
import InputField from "@/components/form/input-field.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Search} from "lucide-react";
import {cn} from "@/utils.ts";



export default function DataTable<TData>({loading, data, rowKeyField, columns, ...props}: CustomTableProps<TData> ) {

    const[tableProps, changeTableProps] = useState<ITableProps>({
        columns,
        data,
        rowKeyField,
        loading,
        ...props
    });

    const [searchText, setSearchText] = useState('');

    const dispatch: DispatchFunc = (action)=>{
        changeTableProps((prevState: ITableProps)=> kaReducer(prevState, action))
    }

    const colCount = columns.length;
    const colWidthPercent = colCount ? 100 / colCount : 100;
    const colWidthStyle = { width: `${colWidthPercent}%` };

    useEffect(() => {
        changeTableProps((prevState)=>({
            ...prevState,
            columns,
            data,
            rowKeyField,
            loading,
        }));
    }, [columns, data, rowKeyField, loading]);

    return  <div className={"overflow-auto flex flex-col gap-6"}>
        <div className={"relative flex items-center"}>
            <Search strokeWidth={2} size={18} className={cn("absolute ml-3 stroke-stone-600")}/>
            <Input className="mx-auto pl-8 w-48 border border-stone-400 text-stone-600 h-4 lg:w-64 m-1" placeholder="Search" type="search" name={searchText} onChange={(e)=>{
                setSearchText(e.currentTarget.value);
            }}></Input>
        </div>

        <Table
            {...tableProps}

            dispatch={dispatch}
            searchText={searchText}
            childComponents={{
                table: {
                    elementAttributes: () => ({
                        className: "table-auto border-collapse w-full text-sm bg-white",
                        style: { tableLayout: "fixed", borderSpacing: 0 },
                    }),
                },
                headRow: {
                    elementAttributes: () => ({
                        className: "border-y border-stone-300 bg-white text-left",
                    }),
                },
                headCell: {
                    elementAttributes: () => ({
                        className:
                            "px-4 py-2 border-b border-stone-300 font-Poppins_Semibold text-stone-500  tracking-wider",
                        style: colWidthStyle,
                    }),
                },
                dataRow: {
                    elementAttributes: ({ rowIndex }: any) => ({
                        className: "group hover:bg-stone-100 transition",
                    }),
                },
                cell: {
                    elementAttributes: () => ({
                        className:
                            "px-5 py-2 text-sm text-white text-left whitespace-wrap border-b border-stone-300 group-hover:bg-stone-100",
                        style: colWidthStyle,
                    }),
                },
                noDataRow: {
                    elementAttributes: () => ({
                        className: "text-center text-stone-500 py-6",
                    }),
                    content: () => "No records found.",
                },
            }}
        />
    </div>




}