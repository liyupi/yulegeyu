import { createModel } from './createModel';
import { useState } from "react"
import { defaultGameConfig } from '../core/gameConfig';
export interface ConfigType {
    gameConfig: GameConfigType
    customGameConfig: GameConfigType
}
const useConfig =  () => {
    const [config,setConfig] = useState<ConfigType>({
        gameConfig:{
            ...defaultGameConfig
        },
        customGameConfig:{
            ...defaultGameConfig
        }
    })
    const updateConfig = (config:ConfigType) => {
        setConfig(config)
    }
    // 重置为初始值
    const reset = () => setConfig({ gameConfig:{ ...defaultGameConfig },customGameConfig:{ ...defaultGameConfig } })
    return {
        config,
        updateConfig,
        reset
    }
}

const GameConfigStore = createModel(useConfig);
export default GameConfigStore;