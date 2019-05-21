import getMinColumns from 'universal/modules/email/components/SummaryEmail/MeetingSummaryEmail/getMinColumns'
import unflattenIntoRows from 'universal/modules/email/components/SummaryEmail/MeetingSummaryEmail/unflattenIntoRows'
import React, {ReactElement} from 'react'

/*  Given an array of items, this unflattens them into the fewest # of columsn while still minimizing the number of columns
 *   Rows with remainders are spaced apart evently
 *   Easy enough to support variable rows, just need another unflatten predicate
 * */

const useEmailItemGrid = (items: ReadonlyArray<any>, maxColumns: number, minColumns?: number) => {
  const {cols, rowCount} = getMinColumns(maxColumns, items.length, minColumns)
  const rows = unflattenIntoRows(items, rowCount, cols)
  const width = Math.floor(100 / maxColumns)
  return (cb: (item) => ReactElement) => {
    return rows.map((row, idx) => {
      return (
        // if width changes here, make sure the images inside the table don't collapse
        <table key={idx} align='center' width='100%'>
          <tbody>
            <tr>
              {row.map((item, idx) => {
                return (
                  <td valign='top' key={idx} align='center' width={`${width}%`}>
                    <table width='100%'>
                      <tbody>{cb(item)}</tbody>
                    </table>
                  </td>
                )
              })}
            </tr>
          </tbody>
        </table>
      )
    })
  }
}

export default useEmailItemGrid