### 实现《羊了个羊》小游戏（低配版）

前面有总结过一篇[《简易动物版的羊了个羊》](https://juejin.cn/post/7143933122415951903)的实现，今天参考了鱼皮大佬的[鱼了个鱼](https://github.com/liyupi/yulegeyu),我好奇研究了一下他的源码实现，并结合自己的理解，也用react + antd实现了一版，在实现的过程中，我只是简单修改了一下核心逻辑和游戏配置，然后借助于[reactivue](https://github.com/antfu/reactivue)这个库将vue的composition API用到了这里。

游戏的核心逻辑我也大致理了一遍，只是做了一些小改动就拿过来用了，里面也有源码实现的注释，所以不用多讲，主要在于核心UI的构建，这里可以大致讲一下。

在这里我也用到了之前文章[手写一个mini版本的React状态管理工具](https://juejin.cn/post/7145439056007004167)来用作游戏参数的状态管理，因此关于这里的实现也没有必要多做细讲。接下来，我们就来看它在这里的使用。如下所示:

```tsx
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
```

首先导入createModel方法还有react的useState方法以及游戏参数的默认配置，接着定义一个hooks用作createModel的参数，返回游戏的配置以及更新配置函数以及还原最初初始配置的方法，即updateConfig和reset方法，这里其实也没有多大的难度，主要可能在于类型的定义。

我们来看接口的定义，也在全局type.d.ts文件下，如下所示:

```ts
/**
 * 块类型
 */
interface BlockType {
  id: number;
  x: number;
  y: number;
  level: number;
  type: string;
  // 0 - 正常, 1 - 已点击, 2 - 已消除
  status: 0 | 1 | 2;
  // 压住的其他块
  higherThanBlocks: BlockType[];
  // 被哪些块压住（为空表示可点击）
  lowerThanBlocks: BlockType[];
}

/**
 * 每个格子单元类型
 */
interface BlockUnitType {
  // 放到当前格子里的块（层级越高下标越大）
  blocks: BlockType[];
}
 
/**
 * 游戏配置类型
 */
interface GameConfigType {
  // 槽容量
  slotNum: number;
  // 需要多少个一样块的才能合成
  composeNum: number;
  // 素材类别数
  materialTypeNum: number;
  // 每层块数（大致）
  levelBlockNum: number;
  // 边界收缩步长
  borderStep: number;
  // 总层数（最小为 2）
  levelNum: number;
  // 随机区块数（数组长度代表随机区数量，值表示每个随机区生产多少块）
  randomBlocks: number[];
  // 素材列表
  materialList: Record<string,string> [];
  // 最上层块数（已废弃）
  // topBlockNum: 40,
  // 最下层块数最小值（已废弃）
  // minBottomBlockNum: 20,
}

/**
 * 技能类型
 */
interface SkillType {
  name: string;
  desc: string;
  icon: string;
  action: function;
}
```

接口的定义大同小异，也只是在原版的基础上稍微做了一点修改。


定义好状态之后，我们在App.tsx中导入使用，App.tsx中代码如下:

```tsx
import styled from '@emotion/styled';
import { BASE_IMAGE_URL } from './core/gameConfig';
import Router from './router/router';
import GameConfigStore from './store/store';

const StyleApp = styled.div({
    background:`url(${BASE_IMAGE_URL}1.jpg)no-repeat center/cover`,
    padding:'16px 16px 50px',
    minHeight:'100vh',
    backgroundSize:"100% 100%",
    width:"100%"
});

const StyleContent = styled.div`
    max-width:480px;
    margin: 0 auto;
`

const App = () => {
   const { Provider } = GameConfigStore;
   return (
     <StyleApp>
        <Provider>
            <StyleContent>
                <Router />
            </StyleContent>
        </Provider>
     </StyleApp>
   )
}

export default App
```

可以看到，我们通过对象结构的方式在App组件中取得Provider组件，将Provider组件包裹中间的路由组件，事实上Provider组件还可以传入一个默认参数的值，在这里我们并没有传入。

这个组件其实主要考察了2个知识点，第一个就是styled-component,这里用到的是[@emotion/styled](https://github.com/emotion-js/emotion)这个库，有关语法的使用可以详细看[官方文档](https://emotion.sh/docs/introduction)。

第二个知识点就是路由的使用，我们来看Router.tsx的代码，如下:

```tsx
import React from 'react';
import { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import Load from '../components/Loader';

const lazy = (component: <T>() => Promise<{ default: React.ComponentType<T> }>) => {
    const LazyComponent = React.lazy(component);
    return (
        <React.Suspense fallback={<Load></Load>} >
            <LazyComponent></LazyComponent>
        </React.Suspense>
    )
}
const routes:RouteObject [] = [
    {
        path:"/",
        element:lazy(() => import('../views/IndexPage'))
    },
    {
        path:"/config",
        element:lazy(() => import('../views/ConfigPage'))
    },
    {
        path:"/game",
        element:lazy(() => import('../views/GamePage'))
    }
]

export default () => useRoutes(routes)
```

路由里面，其实也就是用到了懒加载lazy函数，以及Suspense组件，然后通过useRoutes方法导出一个路由组件使用，这样就可以像Vue那样通过配置路由的方式来使用路由。

这里有一个load组件的实现，我们来看它的源码,如下所示:

```tsx
import styled from '@emotion/styled';
import { Spin } from 'antd';

const StyleLoad = styled.div({
    display:'flex',
    minHeight:'100vh',
    justifyContent:'center',
    alignItems:"center"
});

export interface LoadProps {
    message?: string
}
const Load = (props: Partial<LoadProps>) => {
    const { message = 'loading....' } = props;
    return (
        <StyleLoad>
            <Spin tip={message}></Spin>
        </StyleLoad>
    )
}
export default Load;
```

其实也很简单，就是添加了一个message的props配置，然后使用antd的Spin组件。

接下来就是核心的三个页面，分别是首页，选择游戏模式，以及自定义游戏配置和游戏页面，这个我们后面再看，这里我们来看一下有一个hooks函数，也就是强制更新的hooks函数useForceUpdate,如下:

```ts
import { useReducer } from 'react';

function useForceUpdate() {
  const [, dispatch] = useReducer(() => Object.create(null), {});
  return dispatch;
}

export default useForceUpdate;
```

其实也就是利用useReducer函数强制更新组件，这里为什么要用这个hook函数呢？答案其实就在game.ts里面，我们来看game.ts里面:

```ts

import _ from "lodash";
import { createSetup } from 'reactivue'
import GameConfigStore from "../store/store";

const useGame = () => {
    const { config: { gameConfig } } = GameConfigStore.useModel();
    const setup = createSetup(() => {
      // 核心游戏逻辑，参考源码注释
    });
    return setup();
};

export default useGame;
```

可以看到这里，我们通过导出一个useGame函数，就可以在游戏页面里使用这些核心的游戏逻辑接口，但是我们游戏里面的核心逻辑是使用的Vue的响应式数据对象，尽管vue帮我们更新了数据，可是react并不知道数据是否更新，所以这里就采用useForceUpdate函数来更新数据，虽然这并不是一种好的更新数据的方式。

> 如果有更好的更新视图和数据的方式，还望大佬指点迷津。

至于游戏配置文件也没什么好解释的，可以自己看一下源码。

接下来，我们来看组件的实现，这里有几个公共组件About.tsx,Footer.tsx,Win.tsx以及Title.tsx的实现，其中可能也就Win.tsx中的爱心组件和Title.tsx组件的实现可以说一下，我们先来看Title.tsx的实现。如下:

```tsx
import { ElementType, ReactNode } from "react";

export interface TitleProps extends Record<string,any>{
    children: ReactNode
    level: number | string
}

const levelList = [1,2,3,4,5,6];

const Title = (props: Partial<TitleProps>) => {
    const { level,children,...rest } = props;
    const Component = (level && levelList.includes(+level) ? `h${level}` : 'h1') as ElementType;

    return (
        <Component {...rest}>{ children }</Component>
    )
}

export default Title;
```

这里值得说一下的就是将Component断言成ElementType元素，从逻辑上似乎有些说不通，因为本身Component就是一个字符串，可是字符串在react当中也可以算作是一个元素组件，所以也就断言成ElementType也就理所当然没问题啦。

然后就是Heart组件的实现，实际上也就是利用css画一个爱心，如下所示:

```tsx
const StyleHeart = styled.div({
    width: 25,
    height: 25,
    background:"#e63f0c",
    position: 'relative',
    margin: '1em auto',
    transform:'rotate(45deg)',
    animation:'scale 2s linear infinite',
    '@keyframes scale':{
        '0%':{
            transform:'scale(1) rotate(45deg)'
        },
        '100%':{
            transform:"scale(1.2) rotate(45deg)"
        }
    },
    '&::before,&::after':{
        content:'""',
        width:'100%',
        height:'100%',
        borderRadius:'50%',
        position:'absolute',
        background:"#e63f0c",
    },
    '&::before':{
        left:'-15px',
        top: 0
    },
    '&::after':{
        top:'-15px',
        left: 0
    }
});
```

这是emotion的语法。

接下来就是对三个页面的详解，首先我们来看首页，代码如下:

```tsx

import styled from '@emotion/styled';
import Title from '../components/Title';
import { Button } from 'antd';
import About from '../components/About';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { easyGameConfig, hardGameConfig, lunaticGameConfig, middleGameConfig, skyGameConfig, yangGameConfig } from '../core/gameConfig';
import GameConfigStore from '../store/store';

const StyleIndexPage = styled.div({
     textAlign:'center'
});

const StyleTitle =  styled(Title)({

});

const StyleDescription = styled.div`
    margin-bottom: 16px;
    color: rgba(0,0,0,.8);
`;

const StyleButton = styled(Button)({
    marginBottom: 16
})

const ButtonList = [
    {
        text:"简单模式",
        config:easyGameConfig
    },
    {
        text:"中等模式",
        config:middleGameConfig
    },
    {
        text:"困难模式",
        config:hardGameConfig
    },
    {
        text:"地狱模式",
        config:lunaticGameConfig
    },
    {
        text:"天狱模式",
        config:skyGameConfig
    },
    {
        text:"羊了个羊模式",
        config:yangGameConfig
    },
    {
        text:"自定义",
        config:null
    }
]
const IndexPage = () => {
    const navigate = useNavigate();
    const { config:{ customGameConfig },updateConfig } = GameConfigStore.useModel();
    const toGame = (config:GameConfigType | null) => {
        if(config){
            updateConfig({ gameConfig: config,customGameConfig });
            navigate('/game');
        }else{
            navigate('/config');
        }
    }
    return (
        <StyleIndexPage>
            <StyleTitle level={2}>羊了个羊(美女版)</StyleTitle>
            <StyleDescription>低配版羊了个羊小游戏，仅供消遣</StyleDescription>
            {
                ButtonList.map((item,index: number) => (
                    <StyleButton block onClick={() => toGame(item.config)} key={`${item.text}-${index}`}>{ item.text }</StyleButton>
                ))
            }
            <About />
            <Footer />
        </StyleIndexPage>
    )
}

export default IndexPage;
```

其实也比较好理解，就是渲染一个按钮列表，然后给按钮列表添加导航跳转，将游戏的配置传过去，而核心当然是用到我们定义的状态来传递。

useNavigate方法也就是react-router-dom提供的API，也没什么好说的，我们继续来看ConfigPage.tsx，本质上这个页面就是一个表单页面，所以也没什么好说的。代码如下:

```tsx
import styled from '@emotion/styled'
import Title from '../components/Title'
import { Button, Form, InputNumber, Select, Image, Tooltip } from 'antd'
import { useNavigate } from 'react-router-dom'
import { materialList } from '../core/gameConfig'
import { useEffect, useState } from 'react'
import GameConfigStore from '../store/store'
const StyleConfigPage = styled.div`
    padding: 5px;
`

const { Item } = Form
const { Option } = Select
const StyleTitle = styled(Title)({
    '&::before,&::after': {
        clear: 'both',
        display: 'block',
        content: '""'
    }
})
const StyleButton = styled(Button)({
    float: 'right'
})

const StyleInputNumber = styled(InputNumber)({
    'width': "100%"
})

const StyleFooterButton = styled(Button)({
    marginBottom: 16
})
const ConfigPage = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const { config: { customGameConfig },reset,updateConfig } = GameConfigStore.useModel()
    const setFormConfig = (config: GameConfigType) => {
        const { materialList: configMaterialList, ...rest } = config
        return {
            ...rest, 
            materialNum: configMaterialList.map(item => item.value),
            randomAreaNum: 2,
            randomBlockNum: 8,
        }
    }
    const [customFormConfig,setCustomFormConfig] = useState(setFormConfig(customGameConfig))
    useEffect(() => {
        setCustomFormConfig(setFormConfig(customGameConfig))
    },[customGameConfig])
    const goBack = () => {
        navigate(-1);
    }
    const onFinishHandler = () => {
        const config = form.getFieldsValue(true);
        config.materialList = config.materialNum.map((key: string) => materialList.find(item => item.value === key));
        delete config.materialNum;
        updateConfig({
            gameConfig: config,
            customGameConfig: config
        });
        navigate('/game');
    }
    return (
        <StyleConfigPage>
            <StyleTitle level={2}>
                自定义难度
                <StyleButton onClick={goBack}>返回</StyleButton>
            </StyleTitle>
            <Form
                autoComplete="off"
                label-align="left"
                labelCol={{ span: 4 }}
                onFinish={onFinishHandler}
                form={form}
                initialValues={customFormConfig}
            >
                <Item label="槽容量" name="slotNum">
                    <StyleInputNumber />
                </Item>
                <Item label="合成数" name="composeNum">
                    <StyleInputNumber />
                </Item>
                <Item label="素材类别数" name="materialTypeNum">
                    <StyleInputNumber />
                </Item>
                <Item label="素材列表" name="materialNum">
                    <Select mode='multiple'>
                        {
                            materialList.map((item, index) => (
                                <Option key={`${item.value}-${index}`} value={item.value}>
                                    <Tooltip title={item.label} placement="leftTop">
                                        <Image src={item.value} width={40} height={40}></Image>
                                    </Tooltip>
                                </Option>
                            ))
                        }
                    </Select>
                </Item>
                <Item label="总层数" name="levelNum">
                    <StyleInputNumber />
                </Item>
                <Item label="每层块数" name="levelBlockNum">
                    <StyleInputNumber />
                </Item>
                <Item label="边界收缩" name="borderStep">
                    <StyleInputNumber />
                </Item>
                <Item label="随机区数" name="randomAreaNum">
                    <StyleInputNumber />
                </Item>
                <Item label="随机区块数" name="randomBlockNum">
                    <StyleInputNumber />
                </Item>
                <Item>
                    <StyleFooterButton htmlType='submit' block>开始</StyleFooterButton>
                    <StyleFooterButton block onClick={() => form.resetFields()}>重置</StyleFooterButton>
                    <Button danger block onClick={reset}>还原初始配置</Button>
                </Item>
            </Form>
        </StyleConfigPage>
    )
}

export default ConfigPage
```

antd提供了useForm方法可以将表单数据很好的管理在一个状态中，我们也就不用为每个表单元素绑定value和change事件了。

接下来就是游戏核心页面，如下:

```tsx
import styled from "@emotion/styled";
import { Row, Button, Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Win from "../components/Win";
import useGame from "../core/game";
import { AUDIO_URL } from "../core/gameConfig";
import useForceUpdate from "../hooks/useForceUpdate";

const StyleGamePage = styled.div({
  padding: 5,
});

const StyleBackButton = styled(Button)({
  marginBottom: 8,
});

const StyleLevelBoard = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? "block" : "none")};
  position: relative;
`;

const StyleBlock = styled.div({
  width: 42,
  height: 42,
  border: "1px solid #eee",
  display: "inline-block",
  verticalAlign: "top",
  background: "#fff",
  cursor: "pointer",
  "& .image ": {
    width: "100%",
    height: "100%",
    border: "none",
    objectFit: "cover",
  },
  "&.disabled": {
    background: "rgba(0,0,0,.85)",
    cursor: "not-allowed",
    "& .image": {
      display: "none",
    },
  },
});

const StyleLevelBlock = styled(StyleBlock)`
  position: absolute;
`;

const StyleRandomBoard = styled(Row)({
  marginTop: 8,
});

const StyleRandomArea = styled.div({
  marginTop: 8,
});

const StyleSlotBoard = styled(Row)({
  border: "10px solid #2396ef",
  margin: "16px auto",
  width: "fit-content",
});

const StyleSkillBoard = styled.div({
  textAlign: "center",
});
const skillList = [
  {
    method: "doRevert",
    text: "撤回",
  },
  {
    method: "doRemove",
    text: "移出",
  },
  {
    method: "doShuffle",
    text: "洗牌",
  },
  {
    method: "doBroke",
    text: "破坏",
  },
  {
    method: "doHolyLight",
    text: "圣光",
  },
  {
    method: "doSeeRandom",
    text: "透视",
  },
];
const GamePage = () => {
  const navigate = useNavigate();
  const forceUpdate = useForceUpdate();
  const onBack = () => navigate(-1);
  const [isPlayed, setIsPlayed] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const {
    clearBlockNum,
    totalBlockNum,
    gameStatus,
    levelBlocksVal,
    doClickBlock,
    isHolyLight,
    widthUnit,
    heightUnit,
    randomBlocksVal,
    canSeeRandom,
    slotAreaVal,
    ...rest
  } = useGame();
  useEffect(() => {
    if (!audio) {
      const audio = new Audio();
      audio.src = AUDIO_URL;
      setAudio(audio);
    }
    if (isPlayed) {
      audio?.play();
    } else {
      audio?.pause();
    }
  }, [isPlayed]);
  return (
    <StyleGamePage>
      <Row justify="space-between">
        <StyleBackButton onClick={onBack}>返回</StyleBackButton>
        <Button onClick={() => setIsPlayed(!isPlayed)}>
          {isPlayed ? "暂停" : "播放"}
        </Button>
        <Button>
          块数: {clearBlockNum} / {totalBlockNum}
        </Button>
      </Row>
      <Win isWin={gameStatus === 3}></Win>
      <Row justify="center">
        <StyleLevelBoard className="level-board" show={gameStatus > 0}>
          {levelBlocksVal?.map((block, index) => (
            <div key={`${block.id}-${index}`}>
              {block.status === 0 ? (
                <StyleLevelBlock
                  className={`${
                    !isHolyLight && block.lowerThanBlocks.length > 0
                      ? "disabled"
                      : ""
                  }`}
                  data-id={block.id}
                  style={{
                    zIndex: 100 + block.level,
                    left: block.x * widthUnit + "px",
                    top: block.y * heightUnit + "px",
                  }}
                  onClick={() => {
                    doClickBlock(block);
                    forceUpdate();
                  }}
                >
                  <img className="image" src={block.type} alt={block.type} />
                </StyleLevelBlock>
              ) : null}
            </div>
          ))}
        </StyleLevelBoard>
      </Row>
      <StyleRandomBoard justify="space-between">
        {randomBlocksVal?.map((item, index) => (
          <StyleRandomArea key={`${item}-${index}`}>
            {item.length > 0 ? (
              <StyleBlock
                data-id={item[0].id}
                onClick={() => {
                  doClickBlock(item[0], index);
                  forceUpdate();
                }}
              >
                <img className="image" src={item[0].type} alt={item[0].type} />
              </StyleBlock>
            ) : null}
            {item?.slice(1).map((randomBlock, index) => (
              <StyleBlock
                className="disabled"
                key={`${randomBlock.id}-${index}`}
              >
                <img
                  className="image"
                  src={randomBlock.type}
                  alt={randomBlock.type}
                  style={{
                    display: canSeeRandom ? "inline-block" : "none",
                  }}
                />
              </StyleBlock>
            ))}
          </StyleRandomArea>
        ))}
      </StyleRandomBoard>
      {
        <StyleSlotBoard>
          {slotAreaVal?.map((item, index) => (
            <StyleBlock key={`${item?.id}-${index}`}>
              <img src={item?.type} alt={item?.type} className="image" />
            </StyleBlock>
          ))}
        </StyleSlotBoard>
      }
      <StyleSkillBoard>
        <Space>
          {skillList.map((item, index) => (
            <Button
              size="small"
              key={item.method + "-" + index}
              onClick={() => {
                const methods = { ...rest };
                const handler = methods[item.method as keyof typeof methods];
                if (typeof handler === "function") {
                  handler();
                  forceUpdate();
                }
              }}
            >
              {item.text}
            </Button>
          ))}
        </Space>
      </StyleSkillBoard>
    </StyleGamePage>
  );
};

export default GamePage;
```

可以看到这个页面，我们恰好就用了forceUpdate方法，一个是在点击块的时候使用了，还要一个就是点击对应的圣光，撤销等按钮的时候也调用了这个方法强行更新视图。

这里也添加了一个音乐的播放配置，代码也很简单，就是监听一个播放状态，然后创建audio元素。可能比较不好理解的是这段代码:

```ts
const methods = { ...rest };
const handler = methods[item.method as keyof typeof methods];
if (typeof handler === "function") {
  handler();
  forceUpdate();
}
```

其实就是对应的字符串方法名从我们导出的useGame核心逻辑拿方法并调用而已。

到此为止，我们这个游戏就算是完成了，感谢鱼皮大佬的贡献，让我对这个游戏的原理实现有了更深刻的认识。

以下是源码和示例，

[游戏源码](https://github.com/eveningwater/my-web-projects/tree/master/react/60/)

[在线示例](https://www.eveningwater.com/my-web-projects/react/60/)