import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faUser, faBolt, faCar } from '@fortawesome/free-solid-svg-icons'

import type { ItemIconProps } from "./types"

const SIXT_COLOR = "#ff5f00"
const ICON_CLASS = "fa-lg"

export function ItemIcon({
    prop = "ItemIcon",
    itemType,
}: ItemIconProps) {
    let icon
    if (itemType === "area") {
        icon = <FontAwesomeIcon icon={faFlag} color={SIXT_COLOR} className={ICON_CLASS} />
    } else if (itemType === "user") {
        icon = <FontAwesomeIcon icon={faUser} color={SIXT_COLOR} className={ICON_CLASS} />
    } else if (itemType === "charger") {
        icon = <FontAwesomeIcon icon={faBolt} color={SIXT_COLOR} className={ICON_CLASS} />
    } else {
        icon = <FontAwesomeIcon icon={faCar} color={SIXT_COLOR} className={ICON_CLASS} />
    }
    return (
        <div className='flex content-center justify-center h-full m-2'>
            {icon}
        </div>
    )
}
