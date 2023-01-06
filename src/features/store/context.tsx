import { createContext} from 'react'
import { TaskState } from '../Todo/'
type CT = {
    state: TaskState[]
    dispatch: () => void
}[]
const Context = createContext<CT | any >(undefined)
export default Context
