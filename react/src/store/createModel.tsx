// 导入类型
import type { ReactNode,ComponentType } from 'react';
import { createContext,useContext } from 'react';
const EMPTY:unique symbol = Symbol();
export interface ModelProviderProps<State = void> {
    initialState?: State
    children: ReactNode
}
export interface Model<Value,State = void> {
    Provider: ComponentType<ModelProviderProps<State>>
    useModel: () => Value
}
export const createModel = <Value,State = void>(useHook:(initialState?:State) => Value): Model<Value,State> => {
    //创建一个context
    const context = createContext<Value | typeof EMPTY>(EMPTY);
    // 定义Provider函数
    const Provider = (props:ModelProviderProps<State>) => {
        const { Provider:ModelProvider } = context;
        const { initialState,children } = props;
        const value = useHook(initialState);
        return (
            <ModelProvider value={value}>{children}</ModelProvider>
        )
    }
    // 定义useModel函数
    const useModel = ():Value => {
        const value = useContext(context);
        // 这里确定一下用户是否正确使用Provider
        if(value === EMPTY){
            //抛出异常，使用者并没有用Provider包裹组件
            throw new Error('Component must be wrapped with <Container.Provider>');
        }
        // 返回context
        return value;
    }
    return { Provider,useModel };
}