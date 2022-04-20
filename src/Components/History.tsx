import { Grid } from '@mui/material'
import { historyType } from 'helpers/localstorage'

const History = ({ history }: { history: historyType[] }) => {
  return (
    <Grid item className="history">
      <table>
        <thead>History:</thead>
        <tbody>
          {history.map((h: historyType, index: number) => {
            return (
              <tr key={index}>
                <td>{h.round}.</td>
                <td>{h.win ? 'win' : 'no points'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Grid>
  )
}

export default History
