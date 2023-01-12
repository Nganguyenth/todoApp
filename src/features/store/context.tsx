import { createContext} from 'react';
import { TaskState } from '../todo';
type CT = {
    state: TaskState[]
    dispatch: () => void
}[]
const Context = createContext<CT | any >(undefined);
export default Context;
