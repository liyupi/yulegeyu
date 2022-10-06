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