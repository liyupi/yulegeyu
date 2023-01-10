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
