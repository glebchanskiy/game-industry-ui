import { FunctionalComponent } from "preact";
import { Entity, camelCaseToWords } from "../utils";

export type TableHeadRowProps = {
    entity: Entity
    isAdmin?: boolean
}

export const TableHeadRow: FunctionalComponent<TableHeadRowProps> = ({ entity, isAdmin }) => {
    const names = Object.keys(entity).map(camelCaseToWords)

    console.log(names)
    return (
        <tr class='w-full table table-fixed'>
            {names.map(name => <th scope="col" class="px-6 py-3">
                {name}
            </th>)}

            {isAdmin && <th scope="col" class="px-6 py-3">
                <span class='block w-28 ml-auto'>
                    Action
                </span>

            </th>}

        </tr>
    )
}