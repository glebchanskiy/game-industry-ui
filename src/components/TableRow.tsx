import { FunctionalComponent } from "preact";
import { Entity } from "../utils";
import { useEffect, useState } from "preact/hooks";
import { EditIcon } from "../icons/EditIcon";
import { SaveIcon } from "../icons/SaveIcon";
import { CloseIcon } from "../icons/CloseIcon";
import { DeleteIcon } from "../icons/DeleteIcon";

export type TableRowProps = {
    isAdmin?: boolean
    entity: Entity
    onUpdate: (entity: Entity) => void
    onDelete: (entity: Entity) => void
}

export const TableRow: FunctionalComponent<TableRowProps> = ({ entity, onUpdate, onDelete, isAdmin }) => {

    const [editMode, setEditMode] = useState(false)
    const [editedEntity, setEditedEntity] = useState(entity)

    useEffect(() => {
        setEditedEntity(entity)
    }, [entity])

    const onFieldChange = (key: string, value: string) => {
        const temp = { ...editedEntity }
        temp[key] = value
        setEditedEntity(temp)
    }

    const onEditClick = () => {
        setEditMode(true)
    }

    const onSaveClick = () => {
        onUpdate(editedEntity)
        setEditMode(false)
    }

    const onCloseClick = () => {
        setEditedEntity(entity)
        setEditMode(false)
    }

    const onDeleteClick = () => {
        onDelete(editedEntity)
        setEditMode(false)
    }


    const fields = Object.entries(editedEntity)



    return (
        <tr class="group table table-fixed w-full bg-table border-b border-secondary hover:bg-secondary transition-this">
            {fields.map(field => <td class="px-6 py-4">
                {editMode ? <input disabled={field[0] === 'id'} style={{ width: (field[0].length + 2) + 'ch' }} class={`w-40 focus:!outline-none rounded-sm bg-back ${field[0] === 'id' ? 'disabled bg-table group-hover:bg-secondary' : ''} transition-this`} value={field[1]} onInput={(e) => onFieldChange(field[0], e.currentTarget.value)} /> : field[1]}
            </td>)}

            {isAdmin &&
                <td class="w-36 ml-auto flex px-6 py-4 gap-5">
                    {!editMode && <button onClick={onEditClick} class="font-medium text-primary hover:underline">Редактировать</button>}
                    {editMode && <button onClick={onCloseClick} class="font-medium text-primary hover:underline"><CloseIcon /></button>}
                    {editMode && <button onClick={onSaveClick} class="font-medium text-primary hover:underline"><SaveIcon /></button>}
                    {editMode && <button onClick={onDeleteClick} class="font-medium text-primary hover:underline"><DeleteIcon /></button>}
                </td>
            }
        </tr>
    )
}